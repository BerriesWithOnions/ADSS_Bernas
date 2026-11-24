import { InternalServerErrorException } from '@nestjs/common';
import { criarFakeSupabase } from '../test-utils/fake-supabase';
import { AuditoriaService } from './auditoria.service';

const HASH = 'a'.repeat(64);

describe('AuditoriaService (AT-63)', () => {
  it.each([
    ['registrarRegistro', 'REGISTRAR'],
    ['registrarEdicao', 'EDITAR'],
    ['registrarExclusao', 'EXCLUIR'],
  ] as const)('%s grava %s com status PENDENTE', async (metodo, acao) => {
    const { service, chamadas } = criarFakeSupabase({
      evento_auditoria: [{ data: { id: 'ev-1', acao, status: 'PENDENTE' } }],
    });
    const auditoria = new AuditoriaService(service);

    const evento = await auditoria[metodo]('obra-1', 'user-1', HASH, { x: 1 });

    expect(evento.status).toBe('PENDENTE');
    expect(chamadas).toHaveLength(1);
    expect(chamadas[0]).toMatchObject({
      tabela: 'evento_auditoria',
      op: 'insert',
      payload: {
        obra_id: 'obra-1',
        usuario_id: 'user-1',
        acao,
        status: 'PENDENTE',
        hash_referencia: HASH,
        detalhes: { x: 1 },
      },
    });
  });

  it('força PENDENTE mesmo se o chamador tentar outro status', async () => {
    const { service, chamadas } = criarFakeSupabase({
      evento_auditoria: [{ data: { id: 'ev-1' } }],
    });
    await new AuditoriaService(service).registrar({
      obraId: 'o',
      usuarioId: 'u',
      acao: 'EDITAR',
      status: 'CONFIRMADO',
    } as any);
    expect((chamadas[0].payload as any).status).toBe('PENDENTE');
  });

  it('500 quando o banco recusa o insert', async () => {
    const { service } = criarFakeSupabase({
      evento_auditoria: [{ data: null, error: { message: 'boom' } }],
    });
    await expect(
      new AuditoriaService(service).registrarExclusao('o', 'u'),
    ).rejects.toThrow(InternalServerErrorException);
  });

  it('é somente de inserção: não expõe update nem delete', () => {
    const proto = Object.getOwnPropertyNames(AuditoriaService.prototype);
    expect(proto.filter((m) => /update|delete|remover|editar$|excluir$/i.test(m))).toEqual([]);
  });
});
