import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';

import { SupabaseService } from '../supabase/supabase.service';
import {
  EventoAuditoria,
  RegistrarEventoInput,
} from './auditoria.types';

/**
 * AT-62 / RN-008 / RNF-002: trilha de auditoria SOMENTE INSERT.
 *
 * De proposito, esta classe tem um unico metodo de escrita. Nao existe
 * atualizar(), excluir() nem rota HTTP para eventos. O banco reforca isso
 * com triggers (database/migrations/20261123_at62_auditoria_imutavel.sql).
 */
@Injectable()
export class AuditoriaService {
  private readonly logger = new Logger(AuditoriaService.name);

  constructor(private readonly supabase: SupabaseService) {}

  async registrar(entrada: RegistrarEventoInput): Promise<EventoAuditoria> {
    const { data, error } = await this.supabase.client
      .from('evento_auditoria')
      .insert({
        obra_id: entrada.obraId,
        usuario_id: entrada.usuarioId,
        acao: entrada.acao,
        detalhes: entrada.detalhes ?? {},
      })
      .select()
      .single();

    if (error || !data) {
      this.logger.error(
        `Falha ao registrar auditoria (${entrada.acao} / obra ${entrada.obraId}): ${error?.message}`,
      );
      throw new InternalServerErrorException(
        'Nao foi possivel registrar o evento de auditoria.',
      );
    }

    return data as EventoAuditoria;
  }
}
