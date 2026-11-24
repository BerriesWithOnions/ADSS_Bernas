import {
  Inject,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { USUARIOS_LOOKUP } from '../common/guards/permissao.guard';
import type {
  UsuarioAutenticado,
  UsuariosLookup,
} from '../common/guards/permissao.guard';

// Compatível com Express.Multer.File, mas sem depender do multer.
export interface ArquivoEnviado {
  size: number;
  originalname?: string;
}

export interface DadosTitularidade {
  artistaId: string;
  titularId: string;
}

/**
 * AT-54 — Validação de titularidade (UC-03, fluxo de exceção "titularidade não comprovada").
 * Toda falha vira 422. A permissão do perfil (403) continua no PermissaoGuard.
 */
@Injectable()
export class TitularidadeService {
  constructor(
    @Inject(USUARIOS_LOOKUP) private readonly usuarios: UsuariosLookup,
  ) {}

  async validar(
    ator: UsuarioAutenticado,
    dados: DadosTitularidade,
    provas: ArquivoEnviado[] | undefined | null,
  ): Promise<void> {
    // 1. Prova de titularidade obrigatória (RF-002).
    const provasValidas = (provas ?? []).filter((p) => p && p.size > 0);
    if (provasValidas.length === 0) {
      throw new UnprocessableEntityException(
        'Titularidade não comprovada: envie a prova de titularidade.',
      );
    }

    // 2. Artista principal precisa existir e ter perfil ARTISTA (RN-011).
    const artista = await this.usuarios.buscarPorId(dados.artistaId);
    if (!artista || artista.perfil !== 'ARTISTA') {
      throw new UnprocessableEntityException(
        'Titularidade não comprovada: o artista informado não existe ou não possui perfil de artista.',
      );
    }

    // 3. Titular precisa existir.
    const titular = await this.usuarios.buscarPorId(dados.titularId);
    if (!titular) {
      throw new UnprocessableEntityException(
        'Titularidade não comprovada: o titular informado não existe.',
      );
    }

    // 4. Um artista só registra obra de própria autoria; a galeria registra em nome de um artista.
    if (ator.perfil === 'ARTISTA' && ator.id !== artista.id) {
      throw new UnprocessableEntityException(
        'Titularidade não comprovada: um artista só pode registrar obras de sua própria autoria.',
      );
    }
  }
}
