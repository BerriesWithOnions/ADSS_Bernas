import { ExecutionContext, ForbiddenException } from '@nestjs/common';
import {
  PermissaoGuard,
  UsuarioAutenticado,
  UsuariosLookup,
} from './permissao.guard';

const ID_VALIDO = '00000000-0000-4000-8000-000000000001';

function contexto(headers: Record<string, string>) {
  const request = { headers } as any;
  return {
    request,
    context: {
      switchToHttp: () => ({ getRequest: () => request }),
    } as unknown as ExecutionContext,
  };
}

function usuarioCom(perfil: string): UsuarioAutenticado {
  return { id: ID_VALIDO, nome: 'Teste', email: 't@teste.com', perfil };
}

function guardCom(usuario: UsuarioAutenticado | null) {
  const lookup: UsuariosLookup = {
    buscarPorId: jest.fn().mockResolvedValue(usuario),
  };
  return new PermissaoGuard(lookup);
}

describe('PermissaoGuard', () => {
  it('403 quando falta o cabeçalho X-User-Id', async () => {
    const { context } = contexto({});
    await expect(guardCom(null).canActivate(context)).rejects.toThrow(
      ForbiddenException,
    );
  });

  it('403 quando o X-User-Id não é UUID', async () => {
    const { context } = contexto({ 'x-user-id': 'abc' });
    await expect(guardCom(null).canActivate(context)).rejects.toThrow(
      ForbiddenException,
    );
  });

  it('403 quando o usuário não existe', async () => {
    const { context } = contexto({ 'x-user-id': ID_VALIDO });
    await expect(guardCom(null).canActivate(context)).rejects.toThrow(
      ForbiddenException,
    );
  });

  it.each(['COLECIONADOR', 'CERTIFICADOR', 'ADMINISTRADOR'])(
    '403 para o perfil %s',
    async (perfil) => {
      const { context } = contexto({ 'x-user-id': ID_VALIDO });
      await expect(
        guardCom(usuarioCom(perfil)).canActivate(context),
      ).rejects.toThrow(ForbiddenException);
    },
  );

  it.each(['ARTISTA', 'GALERIA'])('libera o perfil %s', async (perfil) => {
    const { context, request } = contexto({ 'x-user-id': ID_VALIDO });
    await expect(
      guardCom(usuarioCom(perfil)).canActivate(context),
    ).resolves.toBe(true);
    expect(request.usuario.perfil).toBe(perfil);
  });
});