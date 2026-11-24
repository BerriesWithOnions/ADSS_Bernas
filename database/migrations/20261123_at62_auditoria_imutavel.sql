-- AT-62 / RN-008 / RNF-002: evento_auditoria aceita somente INSERT.
-- Nem a service_role (usada pelo backend) consegue alterar ou apagar:
-- ela ignora RLS, mas NAO ignora triggers.

BEGIN;

CREATE OR REPLACE FUNCTION public.bloquear_alteracao_auditoria()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
    RAISE EXCEPTION
        'evento_auditoria e somente INSERT (RN-008 / RNF-002): % nao permitido',
        TG_OP;
END;
$$;

DROP TRIGGER IF EXISTS trg_auditoria_sem_update_delete
    ON public.evento_auditoria;

CREATE TRIGGER trg_auditoria_sem_update_delete
    BEFORE UPDATE OR DELETE ON public.evento_auditoria
    FOR EACH ROW
    EXECUTE FUNCTION public.bloquear_alteracao_auditoria();

DROP TRIGGER IF EXISTS trg_auditoria_sem_truncate
    ON public.evento_auditoria;

CREATE TRIGGER trg_auditoria_sem_truncate
    BEFORE TRUNCATE ON public.evento_auditoria
    FOR EACH STATEMENT
    EXECUTE FUNCTION public.bloquear_alteracao_auditoria();

COMMIT;

-- Teste manual (deve falhar com a mensagem acima):
--   UPDATE public.evento_auditoria SET acao = 'EDITAR';
--   DELETE FROM public.evento_auditoria;
