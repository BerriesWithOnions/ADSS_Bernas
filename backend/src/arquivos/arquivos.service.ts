import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { randomUUID } from 'node:crypto';

import { SupabaseService } from '../supabase/supabase.service';
import { HashService } from '../hash/hash.service';
import { validarArquivosObra } from './arquivos-regras';
import {
  ArquivoObraRegistro,
  ArquivoPreparado,
  ArquivoRecebido,
  CategoriaArquivo,
} from './arquivos.types';

const EXTENSAO_POR_MIME: Record<string, string> = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'application/pdf': 'pdf',
};

@Injectable()
export class ArquivosService {
  private readonly logger = new Logger(ArquivosService.name);
  private readonly bucket: string;

  constructor(
    private readonly supabase: SupabaseService,
    private readonly hashService: HashService,
    config: ConfigService,
  ) {
    this.bucket = config.get<string>('SUPABASE_BUCKET') ?? 'obras';
  }

  /**
   * AT-61 + AT-60: valida as regras e calcula o SHA-256 de cada arquivo.
   * Nao grava nada. Rode ANTES de calcular o hash da obra, porque o hash
   * do registro (RN-005) inclui os hashes dos arquivos.
   */
  prepararArquivos(
    imagens: ArquivoRecebido[] | undefined,
    prova: ArquivoRecebido | undefined,
  ): ArquivoPreparado[] {
    validarArquivosObra(imagens, prova);

    return [
      ...imagens!.map((f) => this.preparar(f, 'imagem')),
      this.preparar(prova!, 'comprovante_titularidade'),
    ];
  }

  // Hashes em ordem alfabetica: a ordem de envio nao pode mudar o hash da obra.
  hashesOrdenados(arquivos: ArquivoPreparado[]): string[] {
    return arquivos.map((a) => a.hashArquivo).sort();
  }

  /**
   * AT-59: envia os arquivos ao Supabase Storage e grava as linhas em
   * arquivo_obra. Se algo falhar no meio, remove do Storage o que ja subiu.
   */
  async anexarAObra(
    obraId: string,
    arquivos: ArquivoPreparado[],
  ): Promise<ArquivoObraRegistro[]> {
    const enviados: string[] = [];

    try {
      const linhas = [];

      for (const arquivo of arquivos) {
        const caminho = this.montarCaminho(obraId, arquivo);

        const { error } = await this.supabase.client.storage
          .from(this.bucket)
          .upload(caminho, arquivo.buffer, {
            contentType: arquivo.mimeType,
            upsert: false, // nunca sobrescreve um arquivo existente
          });

        if (error) {
          throw new Error(`Upload falhou (${caminho}): ${error.message}`);
        }

        enviados.push(caminho);

        linhas.push({
          obra_id: obraId,
          categoria: arquivo.categoria,
          bucket: this.bucket,
          caminho_storage: caminho,
          nome_original: arquivo.nomeOriginal,
          mime_type: arquivo.mimeType,
          tamanho_bytes: arquivo.tamanhoBytes,
          hash_arquivo: arquivo.hashArquivo,
        });
      }

      // Um unico insert: ou grava todas as linhas ou nenhuma.
      const { data, error } = await this.supabase.client
        .from('arquivo_obra')
        .insert(linhas)
        .select();

      if (error) {
        throw new Error(`Insert em arquivo_obra falhou: ${error.message}`);
      }

      return data as ArquivoObraRegistro[];
    } catch (erro) {
      this.logger.error((erro as Error).message);
      await this.removerDoStorage(enviados);

      throw new InternalServerErrorException(
        'Nao foi possivel armazenar os arquivos da obra.',
      );
    }
  }

  private preparar(
    arquivo: ArquivoRecebido,
    categoria: CategoriaArquivo,
  ): ArquivoPreparado {
    return {
      categoria,
      nomeOriginal: arquivo.originalname,
      mimeType: arquivo.mimetype,
      tamanhoBytes: arquivo.buffer.length,
      hashArquivo: this.hashService.gerarHashArquivo(arquivo.buffer),
      buffer: arquivo.buffer,
    };
  }

  // Caminho gerado por nos (UUID): o nome enviado pelo usuario nunca vira
  // caminho, evitando caracteres estranhos e colisoes. O nome original fica
  // salvo em arquivo_obra.nome_original.
  private montarCaminho(obraId: string, arquivo: ArquivoPreparado): string {
    const extensao = EXTENSAO_POR_MIME[arquivo.mimeType];
    return `${obraId}/${arquivo.categoria}/${randomUUID()}.${extensao}`;
  }

  private async removerDoStorage(caminhos: string[]): Promise<void> {
    if (caminhos.length === 0) {
      return;
    }

    const { error } = await this.supabase.client.storage
      .from(this.bucket)
      .remove(caminhos);

    if (error) {
      // Nao esconde o erro original; apenas registra que sobrou lixo.
      this.logger.error(
        `Falha ao limpar arquivos orfaos: ${caminhos.join(', ')}`,
      );
    }
  }
}
