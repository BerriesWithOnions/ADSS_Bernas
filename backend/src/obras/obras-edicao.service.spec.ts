import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { AuditoriaService } from '../auditoria/auditoria.service';
import { HashService } from '../hash/hash.service';
import { criarFakeSupabase, Resposta } from '../test-utils/fake-supabase';
import { montarPayloadHash } from './obra-hash';
import { ObrasEdicaoService } from './obras-edicao.service';

const ATOR = { id: 'user-1', nome: 'Marina', email: 'm@t.com', perfil: 'ARTISTA' };

const obraBanco = () => ({
  id: 'obra-1',
  titulo: 'Noite Estrelada',
  tecnica: 'Óleo sobre tela',
  altura_cm: 80,
  largura_cm: 60,
  profundidade_cm: 2,
  data_criacao: '2025-03-15',
  ano_criacao: 2025,
  artista_id: 'user-1',
  titular_id: 'user-9',
  registrado_por: 'user-1',
  protocolo: 'REG-2026-000001',
  hash_conteudo: 'b'.repeat(64),
  status: 'CONFIRMADO',
  atualizado_em: '2026-11-01T00:00:00.000Z',
});

function montar(respostas: Record<string, Resposta[]>) {
  const fake = criarFakeSupabase(respostas);
  const hash = new HashService();
  const auditoria = new AuditoriaService(fake.service);
  jest.spyOn(auditoria, 'registrarEdicao');
  return { svc: new ObrasEdicaoService(fake.service, hash, auditoria), fake, hash, auditoria };
}

describe('ObrasEdicaoService.atualizar (AT-57)', () => {
  it('400 quando nenhum campo é enviado', async () => {
    const { svc } = montar({});
    await expect(svc.atualizar('obra-1', {}, ATOR)).rejects.toThrow(BadRequestException);
  });

  it('404 quando a obra não existe ou está excluída', async () => {
    const { svc } = montar({ obra: [{ data: null }] });
    await expect(svc.atualizar('x', { titulo: 'Novo' }, ATOR)).rejects.toThrow(NotFoundException);
  });

  it('403 quando quem edita não registrou a obra', async () => {
    const { svc } = montar({ obra: [{ data: obraBanco() }] });
    await expect(
      svc.atualizar('obra-1', { titulo: 'Novo' }, { ...ATOR, id: 'outro' }),
    ).rejects.toThrow(ForbiddenException);
  });

  it('500 quando a consulta ao banco falha', async () => {
    const { svc } = montar({ obra: [{ data: null, error: { message: 'x' } }] });
    await expect(svc.atualizar('obra-1', { titulo: 'N' }, ATOR)).rejects.toThrow(
      InternalServerErrorException,
    );
  });

  it('não grava nem gera evento quando nada mudou', async () => {
    const { svc, fake, auditoria } = montar({ obra: [{ data: obraBanco() }] });
    const r = await svc.atualizar('obra-1', { titulo: ' Noite Estrelada ', alturaCm: 80 }, ATOR);
    expect(r.camposAlterados).toEqual([]);
    expect(fake.chamadas.filter((c) => c.op !== 'select')).toHaveLength(0);
    expect(auditoria.registrarEdicao).not.toHaveBeenCalled();
  });

  it('recalcula o hash, atualiza a obra e grava o evento EDITAR pendente', async () => {
    const original = obraBanco();
    const atualizada = { ...original, titulo: 'Noite Estrelada II', hash_conteudo: 'novo' };
    const { svc, fake, hash, auditoria } = montar({
      obra: [{ data: original }, { data: atualizada }],
      arquivo_obra: [{ data: [{ hash_arquivo: 'f2'.repeat(32) }, { hash_arquivo: 'f1'.repeat(32) }] }],
      evento_auditoria: [{ data: { id: 'ev-1' } }],
    });

    const r = await svc.atualizar('obra-1', { titulo: 'Noite Estrelada II' }, ATOR);

    const esperado = hash.gerarHashJson(
      montarPayloadHash(
        {
          titulo: 'Noite Estrelada II',
          artistaId: 'user-1',
          tecnica: 'Óleo sobre tela',
          alturaCm: 80,
          larguraCm: 60,
          profundidadeCm: 2,
          dataCriacao: '2025-03-15',
          titularId: 'user-9',
        },
        ['f1'.repeat(32), 'f2'.repeat(32)],
      ),
    );

    const update = fake.chamadas.find((c) => c.tabela === 'obra' && c.op === 'update')!;
    expect(update.payload).toMatchObject({
      titulo: 'Noite Estrelada II',
      hash_conteudo: esperado,
      status: 'PENDENTE',
    });
    expect(r.camposAlterados).toEqual(['titulo']);
    expect(auditoria.registrarEdicao).toHaveBeenCalledWith(
      'obra-1',
      'user-1',
      esperado,
      expect.objectContaining({
        camposAlterados: ['titulo'],
        antes: { titulo: 'Noite Estrelada' },
        depois: { titulo: 'Noite Estrelada II' },
        hashAnterior: original.hash_conteudo,
      }),
    );
    const evento = fake.chamadas.find((c) => c.tabela === 'evento_auditoria')!;
    expect(evento.payload).toMatchObject({ acao: 'EDITAR', status: 'PENDENTE' });
  });

  it('atualiza ano_criacao quando a data muda', async () => {
    const { svc, fake } = montar({
      obra: [{ data: obraBanco() }, { data: obraBanco() }],
      arquivo_obra: [{ data: [] }],
      evento_auditoria: [{ data: { id: 'ev' } }],
    });
    await svc.atualizar('obra-1', { dataCriacao: '2020-01-02' }, ATOR);
    const update = fake.chamadas.find((c) => c.tabela === 'obra' && c.op === 'update')!;
    expect(update.payload).toMatchObject({ data_criacao: '2020-01-02', ano_criacao: 2020 });
  });

  it('409 quando o novo hash já pertence a outra obra', async () => {
    const { svc, auditoria } = montar({
      obra: [{ data: obraBanco() }, { data: null, error: { message: 'dup', code: '23505' } }],
      arquivo_obra: [{ data: [] }],
    });
    await expect(svc.atualizar('obra-1', { titulo: 'Outro' }, ATOR)).rejects.toThrow(ConflictException);
    expect(auditoria.registrarEdicao).not.toHaveBeenCalled();
  });

  it('desfaz a edição se o evento de auditoria falhar', async () => {
    const original = obraBanco();
    const { svc, fake } = montar({
      obra: [{ data: original }, { data: { ...original, titulo: 'Novo' } }, { data: null }],
      arquivo_obra: [{ data: [] }],
      evento_auditoria: [{ data: null, error: { message: 'falhou' } }],
    });
    await expect(svc.atualizar('obra-1', { titulo: 'Novo' }, ATOR)).rejects.toThrow(
      InternalServerErrorException,
    );
    const updates = fake.chamadas.filter((c) => c.tabela === 'obra' && c.op === 'update');
    expect(updates).toHaveLength(2);
    expect(updates[1].payload).toMatchObject({
      titulo: original.titulo,
      hash_conteudo: original.hash_conteudo,
      status: 'CONFIRMADO',
    });
  });
});
