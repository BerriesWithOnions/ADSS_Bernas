import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';

export type AcaoAuditoria = 'REGISTRAR' | 'EDITAR' | 'EXCLUIR';
export type StatusEvento = 'PENDENTE' | 'CONFIRMADO';

export interface NovoEvento {
  obraId: string;
  usuarioId: string;
  acao: AcaoAuditoria;
  detalhes?: Record<string, unknown>;
  hashReferencia?: string | null;
}

export interface EventoAuditoria {
  id: string;
  obra_id: string;
  usuario_id: string;
  acao: AcaoAuditoria;
  status: StatusEvento;
  hash_referencia: string | null;
  detalhes: Record<string, unknown>;
  criado_em: string;
}

/**
 * RN-008 / RNF-002: a trilha é somente de inserção.
 * Este serviço NÃO expõe update nem delete de propósito.
 * AT-63: como a blockchain é simulada, todo evento é gravado como PENDENTE.
 */
@Injectable()
export class AuditoriaService {
  private readonly logger = new Logger(AuditoriaService.name);

  constructor(private readonly supabase: SupabaseService) {}

  async registrar(evento: NovoEvento): Promise<EventoAuditoria> {
    const { data, error } = await this.supabase.client
      .from('evento_auditoria')
      .insert({
        obra_id: evento.obraId,
        usuario_id: evento.usuarioId,
        acao: evento.acao,
        status: 'PENDENTE',
        hash_referencia: evento.hashReferencia ?? null,
        detalhes: evento.detalhes ?? {},
      })
      .select('*')
      .single();

    if (error || !data) {
      this.logger.error(
        `Falha ao gravar evento ${evento.acao} da obra ${evento.obraId}: ${error?.message}`,
      );
      throw new InternalServerErrorException(
        'Não foi possível registrar o evento de auditoria.',
      );
    }

    return data as EventoAuditoria;
  }

  // Atalhos para os três pontos de chamada do UC-03 (registrar, editar, excluir).
  registrarRegistro(
    obraId: string,
    usuarioId: string,
    hashReferencia: string,
    detalhes: Record<string, unknown> = {},
  ) {
    return this.registrar({ obraId, usuarioId, acao: 'REGISTRAR', hashReferencia, detalhes });
  }

  registrarEdicao(
    obraId: string,
    usuarioId: string,
    hashReferencia: string,
    detalhes: Record<string, unknown> = {},
  ) {
    return this.registrar({ obraId, usuarioId, acao: 'EDITAR', hashReferencia, detalhes });
  }

  registrarExclusao(
    obraId: string,
    usuarioId: string,
    hashReferencia?: string | null,
    detalhes: Record<string, unknown> = {},
  ) {
    return this.registrar({ obraId, usuarioId, acao: 'EXCLUIR', hashReferencia, detalhes });
  }
}
