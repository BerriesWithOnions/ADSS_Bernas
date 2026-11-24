BEGIN;

ALTER TABLE public.obra
    ADD COLUMN artista_id UUID REFERENCES public.usuario(id),
    ADD COLUMN status TEXT
        CHECK (status IN ('PENDENTE', 'CONFIRMADO'));

ALTER TABLE public.obra
    ALTER COLUMN status SET DEFAULT 'PENDENTE';

COMMIT;