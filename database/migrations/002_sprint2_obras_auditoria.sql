-- Sprint 2 (AT-57 / AT-63): colunas usadas por PATCH /obras/:id e pela auditoria.
-- Executar no SQL Editor do Supabase DEPOIS de schema.sql. É idempotente.

ALTER TABLE public.obra
    ADD COLUMN IF NOT EXISTS artista_id UUID REFERENCES public.usuario(id),
    ADD COLUMN IF NOT EXISTS altura_cm NUMERIC(10,2) CHECK (altura_cm > 0),
    ADD COLUMN IF NOT EXISTS largura_cm NUMERIC(10,2) CHECK (largura_cm > 0),
    ADD COLUMN IF NOT EXISTS profundidade_cm NUMERIC(10,2) CHECK (profundidade_cm > 0),
    ADD COLUMN IF NOT EXISTS data_criacao DATE,
    ADD COLUMN IF NOT EXISTS status_registro TEXT NOT NULL DEFAULT 'PENDENTE'
        CHECK (status_registro IN ('PENDENTE', 'CONFIRMADO'));

-- Evento de auditoria: blockchain é simulada, então todo evento nasce PENDENTE (RNF-004).
ALTER TABLE public.evento_auditoria
    ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'PENDENTE'
        CHECK (status IN ('PENDENTE', 'CONFIRMADO')),
    ADD COLUMN IF NOT EXISTS hash_referencia TEXT
        CHECK (hash_referencia IS NULL OR hash_referencia ~ '^[0-9a-f]{64}$');
