import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { AuditoriaService } from '../auditoria/auditoria.service';
import { UsuarioAutenticado } from '../common/guards/permissao.guard';
import { HashService } from '../hash/hash.service';
import { SupabaseService } from '../supabase/supabase.service';
import { AtualizarObraDto } from './dto/atualizar-obra.dto';
import { montarPayloadHash } from './obra-hash';

type Campo = 'titulo' | 'tecnica' | 'alturaCm' | 'larguraCm' | 'profundidadeCm' | 'dataCriacao';

const COLUNA: Record<Campo, string> = {
  titulo: 'titulo',
  tecnica: 'tecnica',
  alturaCm: 'altura_cm',
  larguraCm: 'largura_cm',
  profundidadeCm: 'profundidade_cm',
  dataCriacao: 'data_criacao',
};

const NUMERICOS: Campo[] = ['alturaCm', 'larguraCm', 'profundidadeCm'];

export interface ResultadoAtualizacao {
  id: string;
  protocolo: string | null;
  hashRegistro: string;
  status: string;
  camposAlterados: string[];
  atualizadoEm: string;
}

@Injectable()
export class ObrasEdicaoService {
  private readonly logger = new Logger(ObrasEdicaoService.name);

  constructor(
    private readonly supabase: SupabaseService,
    private readonly hash: HashService,
    private readonly auditoria: AuditoriaService,
  ) {}

  /**
   * AT-57 — PATCH /obras/:id.
   * 404 obra inexistente/excluída · 403 não é quem registrou · 400 sem campos ·
   * 409 novo hash já existe em outra obra (RN-005).
   * Recalcula o hash (D3) e grava o evento EDITAR como PENDENTE (AT-63).
   */
  async atualizar(
    id: string,
    dto: AtualizarObraDto,
    ator: UsuarioAutenticado,
  ): Promise<ResultadoAtualizacao> {
    const campos = (Object.keys(COLUNA) as Campo[]).filter((c) => dto[c] !== undefined);
    if (campos.length === 0) {
      throw new BadRequestException('Informe ao menos um campo para atualizar.');
    }

    const { data: obra, error } = await this.supabase.client
      .from('obra')
      .select('*')
      .eq('id', id)
      .is('excluida_em', null)
      .maybeSingle();

    if (error) {
      this.logger.error(`Falha ao buscar obra ${id}: ${error.message}`);
      throw new InternalServerErrorException('Falha ao consultar a obra.');
    }
    if (!obra) {
      throw new NotFoundException('Obra não encontrada.');
    }
    if (obra.registrado_por !== ator.id) {
      throw new ForbiddenException('Somente quem registrou a obra pode editá-la.');
    }

    // Só conta como alteração o que realmente mudou.
    const antes: Record<string, unknown> = {};
    const depois: Record<string, unknown> = {};
    for (const campo of campos) {
      const atual = obra[COLUNA[campo]];
      const novo = typeof dto[campo] === 'string' ? (dto[campo] as string).trim() : dto[campo];
      const igual = NUMERICOS.includes(campo) ? Number(atual) === Number(novo) : atual === novo;
      if (!igual) {
        antes[campo] = atual;
        depois[campo] = novo;
      }
    }
    const alterados = Object.keys(depois);

    if (alterados.length === 0) {
      return this.resultado(obra, []);
    }

    const { data: arquivos, error: erroArquivos } = await this.supabase.client
      .from('arquivo_obra')
      .select('hash_arquivo')
      .eq('obra_id', id);
    if (erroArquivos) {
      this.logger.error(`Falha ao buscar arquivos da obra ${id}: ${erroArquivos.message}`);
      throw new InternalServerErrorException('Falha ao consultar os arquivos da obra.');
    }

    const mesclada = (campo: Campo) =>
      campo in depois ? depois[campo] : obra[COLUNA[campo]];

    const novoHash = this.hash.gerarHashJson(
      montarPayloadHash(
        {
          titulo: mesclada('titulo') as string,
          artistaId: obra.artista_id ?? null,
          tecnica: mesclada('tecnica') as string,
          alturaCm: mesclada('alturaCm') as number,
          larguraCm: mesclada('larguraCm') as number,
          profundidadeCm: mesclada('profundidadeCm') as number,
          dataCriacao: mesclada('dataCriacao') as string,
          titularId: obra.titular_id,
        },
        (arquivos ?? []).map((a: { hash_arquivo: string }) => a.hash_arquivo),
      ),
    );

    const atualizadoEm = new Date().toISOString();
    const colunas: Record<string, unknown> = {
      hash_conteudo: novoHash,
      status: 'PENDENTE', // novo hash ainda não confirmado na (simulada) blockchain
      atualizado_em: atualizadoEm,
    };
    for (const campo of alterados) colunas[COLUNA[campo as Campo]] = depois[campo];
    if (typeof depois.dataCriacao === 'string') {
      colunas.ano_criacao = Number(depois.dataCriacao.slice(0, 4));
    }

    const { data: atualizada, error: erroUpdate } = await this.supabase.client
      .from('obra')
      .update(colunas)
      .eq('id', id)
      .is('excluida_em', null)
      .select('*')
      .maybeSingle();

    if (erroUpdate) {
      if (erroUpdate.code === '23505') {
        throw new ConflictException('Já existe uma obra registrada com estes mesmos dados (hash duplicado).');
      }
      this.logger.error(`Falha ao atualizar obra ${id}: ${erroUpdate.message}`);
      throw new InternalServerErrorException('Falha ao atualizar a obra.');
    }
    if (!atualizada) {
      throw new NotFoundException('Obra não encontrada.');
    }

    // AT-63: evento EDITAR (PENDENTE). Sem transação no supabase-js, desfaz a edição se o evento falhar.
    try {
      await this.auditoria.registrarEdicao(id, ator.id, novoHash, {
        camposAlterados: alterados,
        antes,
        depois,
        hashAnterior: obra.hash_conteudo,
      });
    } catch (e) {
      await this.reverter(obra);
      throw e;
    }

    return this.resultado(atualizada, alterados);
  }

  private async reverter(original: Record<string, any>): Promise<void> {
    const { error } = await this.supabase.client
      .from('obra')
      .update({
        titulo: original.titulo,
        tecnica: original.tecnica,
        altura_cm: original.altura_cm,
        largura_cm: original.largura_cm,
        profundidade_cm: original.profundidade_cm,
        data_criacao: original.data_criacao,
        ano_criacao: original.ano_criacao,
        hash_conteudo: original.hash_conteudo,
        status: original.status,
        atualizado_em: original.atualizado_em,
      })
      .eq('id', original.id);
    if (error) {
      this.logger.error(`Não foi possível reverter a obra ${original.id}: ${error.message}`);
    }
  }

  private resultado(obra: Record<string, any>, camposAlterados: string[]): ResultadoAtualizacao {
    return {
      id: obra.id,
      protocolo: obra.protocolo ?? null,
      hashRegistro: obra.hash_conteudo,
      status: obra.status ?? 'PENDENTE',
      camposAlterados,
      atualizadoEm: obra.atualizado_em,
    };
  }
}
