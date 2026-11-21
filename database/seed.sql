INSERT INTO usuario (id, nome, email, perfil) VALUES
 
-- Perfis que PODEM registrar obra (ator do UC-03)
('00000000-0000-4000-8000-000000000001', 'Marina Alves',        'marina.alves@teste.com',     'ARTISTA'),
('00000000-0000-4000-8000-000000000002', 'Rafael Duarte',       'rafael.duarte@teste.com',    'ARTISTA'),
('00000000-0000-4000-8000-000000000003', 'Galeria Horizonte',   'contato@horizonte.teste.com','GALERIA'),
 
-- Perfis que NÃO participam do UC-03 (úteis para testar o erro 403)
('00000000-0000-4000-8000-000000000004', 'Carlos Menezes',      'carlos.menezes@teste.com',   'COLECIONADOR'),
('00000000-0000-4000-8000-000000000005', 'Helena Prado',        'helena.prado@teste.com',     'CERTIFICADOR'),
('00000000-0000-4000-8000-000000000006', 'Administrador Teste', 'admin@teste.com',            'ADMINISTRADOR')
 
ON CONFLICT (id) DO NOTHING;
 
-- Conferência rápida
-- SELECT id, nome, perfil FROM usuario ORDER BY perfil, nome;
