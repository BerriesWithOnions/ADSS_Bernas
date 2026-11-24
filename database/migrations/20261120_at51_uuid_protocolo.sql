
BEGIN;

CREATE SEQUENCE IF NOT EXISTS public.obra_protocolo_seq
    AS BIGINT
    START WITH 1
    INCREMENT BY 1
    MINVALUE 1
    MAXVALUE 999999
    NO CYCLE;

ALTER TABLE public.obra
    ALTER COLUMN id
    SET DEFAULT gen_random_uuid();

-- Se houver protocolos antigos, continuar após
-- o maior número já utilizado.
SELECT setval(
    'public.obra_protocolo_seq'::regclass,
    GREATEST(
        1,
        COALESCE(
            (
                SELECT MAX(RIGHT(protocolo, 6)::BIGINT)
                FROM public.obra
                WHERE protocolo ~ '^REG-[0-9]{4}-[0-9]{6}$'
            ),
            0
        ) + 1
    ),
    false
);

ALTER TABLE public.obra
    ALTER COLUMN protocolo
    SET DEFAULT (
        'REG-'
        || to_char(CURRENT_DATE, 'YYYY')
        || '-'
        || lpad(
            nextval('public.obra_protocolo_seq'::regclass)::TEXT,
            6,
            '0'
        )
    );

-- Completa protocolos de registros anteriores,
-- caso existam.
UPDATE public.obra
SET protocolo = DEFAULT
WHERE protocolo IS NULL;

ALTER TABLE public.obra
    ALTER COLUMN protocolo SET NOT NULL;

COMMIT;
