
CREATE TABLE IF NOT EXISTS public.usuario (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nome TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,

    perfil TEXT NOT NULL CHECK (
        perfil IN (
            'ARTISTA',
            'GALERIA',
            'COLECIONADOR',
            'CERTIFICADOR',
            'ADMINISTRADOR'
        )
    ),

    criado_em TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.obra (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    titulo TEXT NOT NULL,
    artista TEXT NOT NULL,
    descricao TEXT,
    tecnica TEXT,
    ano_criacao INTEGER,

    titular_id UUID NOT NULL
        REFERENCES public.usuario(id),

    registrado_por UUID NOT NULL
        REFERENCES public.usuario(id),

    protocolo TEXT UNIQUE,

    hash_conteudo TEXT NOT NULL UNIQUE
        CHECK (
            hash_conteudo ~ '^[0-9a-f]{64}$'
        ),

    criado_em TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    atualizado_em TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    excluida_em TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS public.arquivo_obra (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    obra_id UUID NOT NULL
        REFERENCES public.obra(id),

    categoria TEXT NOT NULL CHECK (
        categoria IN (
            'imagem',
            'comprovante_titularidade'
        )
    ),

    bucket TEXT NOT NULL DEFAULT 'obras',
    caminho_storage TEXT NOT NULL,
    nome_original TEXT NOT NULL,
    mime_type TEXT NOT NULL,

    tamanho_bytes BIGINT NOT NULL
        CHECK (tamanho_bytes > 0),

    hash_arquivo TEXT NOT NULL
        CHECK (
            hash_arquivo ~ '^[0-9a-f]{64}$'
        ),

    criado_em TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    UNIQUE (bucket, caminho_storage)
);

CREATE TABLE IF NOT EXISTS public.evento_auditoria (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    obra_id UUID NOT NULL
        REFERENCES public.obra(id),

    usuario_id UUID NOT NULL
        REFERENCES public.usuario(id),

    acao TEXT NOT NULL CHECK (
        acao IN (
            'REGISTRAR',
            'EDITAR',
            'EXCLUIR'
        )
    ),

    detalhes JSONB NOT NULL DEFAULT '{}'::jsonb,
    criado_em TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_obra_titular
    ON public.obra(titular_id);

CREATE INDEX IF NOT EXISTS idx_obra_registrado_por
    ON public.obra(registrado_por);

CREATE INDEX IF NOT EXISTS idx_arquivo_obra
    ON public.arquivo_obra(obra_id);

CREATE INDEX IF NOT EXISTS idx_auditoria_obra
    ON public.evento_auditoria(obra_id);

CREATE INDEX IF NOT EXISTS idx_auditoria_usuario
    ON public.evento_auditoria(usuario_id);

ALTER TABLE public.usuario
    ENABLE ROW LEVEL SECURITY;

ALTER TABLE public.obra
    ENABLE ROW LEVEL SECURITY;

ALTER TABLE public.arquivo_obra
    ENABLE ROW LEVEL SECURITY;

ALTER TABLE public.evento_auditoria
    ENABLE ROW LEVEL SECURITY;

REVOKE ALL ON TABLE
    public.usuario,
    public.obra,
    public.arquivo_obra,
    public.evento_auditoria
FROM anon, authenticated;
