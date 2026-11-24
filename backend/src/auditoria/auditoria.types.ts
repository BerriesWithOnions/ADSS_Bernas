// Valores identicos ao CHECK de evento_auditoria.acao no schema.sql
export type AcaoAuditoria = 'REGISTRAR' | 'EDITAR' | 'EXCLUIR';

export interface RegistrarEventoInput {
  obraId: string;
  usuarioId: string;
  acao: AcaoAuditoria;
  detalhes?: Record<string, unknown>;
}

export interface EventoAuditoria {
  id: string;
  obra_id: string;
  usuario_id: string;
  acao: AcaoAuditoria;
  detalhes: Record<string, unknown>;
  criado_em: string;
}
