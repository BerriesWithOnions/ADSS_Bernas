import { InternalServerErrorException } from '@nestjs/common';
import { AuditoriaService } from './auditoria.service';

const OBRA = '11111111-1111-4111-8111-111111111111';
const USER = '00000000-0000-4000-8000-000000000001';

function criar(resposta: { data: unknown; error: unknown }) {
  const single = jest.fn().mockResolvedValue(resposta);
  const select = jest.fn().mockReturnValue({ single });
  const insert = jest.fn().mockReturnValue({ select });
  const from = jest.fn().mockReturnValue({ insert });

  const servico = new AuditoriaService({ client: { from } } as any);
  return { servico, from, insert };
}

describe('AuditoriaService', () => {
  it('insere o evento em evento_auditoria e devolve a linha criada', async () => {
    const linha = { id: 'e1', obra_id: OBRA, acao: 'REGISTRAR' };
    const { servico, from, insert } = criar({ data: linha, error: null });

    const evento = await servico.registrar({
      obraId: OBRA,
      usuarioId: USER,
      acao: 'REGISTRAR',
      detalhes: { protocolo: 'REG-2026-000001' },
    });

    expect(from).toHaveBeenCalledWith('evento_auditoria');
    expect(insert).toHaveBeenCalledWith({
      obra_id: OBRA,
      usuario_id: USER,
      acao: 'REGISTRAR',
      detalhes: { protocolo: 'REG-2026-000001' },
    });
    expect(evento).toBe(linha);
  });

  it('usa {} quando nao ha detalhes', async () => {
    const { servico, insert } = criar({ data: { id: 'e' }, error: null });
    await servico.registrar({ obraId: OBRA, usuarioId: USER, acao: 'EXCLUIR' });
    expect(insert.mock.calls[0][0].detalhes).toEqual({});
  });

  it('500 quando o banco falha', async () => {
    const { servico } = criar({ data: null, error: { message: 'x' } });
    await expect(
      servico.registrar({ obraId: OBRA, usuarioId: USER, acao: 'EDITAR' }),
    ).rejects.toThrow(InternalServerErrorException);
  });

  it('e somente INSERT: nao expoe metodos de alteracao ou exclusao', () => {
    const { servico } = criar({ data: null, error: null });
    const metodos = Object.getOwnPropertyNames(
      Object.getPrototypeOf(servico),
    ).filter((m) => m !== 'constructor');

    expect(metodos).toEqual(['registrar']);
  });
});
