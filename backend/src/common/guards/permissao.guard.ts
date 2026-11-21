import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Inject,
  Injectable,
} from '@nestjs/common';

export interface UsuarioAutenticado {
  id: string;
  nome: string;
  email: string;
  perfil: string;
}

// Contrato: quem busca o usuário no banco precisa oferecer isto.
export interface UsuariosLookup {
  buscarPorId(id: string): Promise<UsuarioAutenticado | null>;
}

export const USUARIOS_LOOKUP = 'USUARIOS_LOOKUP';

// Perfis que participam do UC-03 (conforme o seed.sql)
const PERFIS_PERMITIDOS = ['ARTISTA', 'GALERIA'];

const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

@Injectable()
export class PermissaoGuard implements CanActivate {
  constructor(
    @Inject(USUARIOS_LOOKUP) private readonly usuarios: UsuariosLookup,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const header = request.headers['x-user-id'];
    const userId = Array.isArray(header) ? header[0] : header;

    if (!userId) {
      throw new ForbiddenException('Cabeçalho X-User-Id ausente.');
    }

    // Evita erro 500 do banco ao receber um ID que não é UUID
    if (!UUID_REGEX.test(userId)) {
      throw new ForbiddenException('X-User-Id inválido.');
    }

    const usuario = await this.usuarios.buscarPorId(userId);
    if (!usuario) {
      throw new ForbiddenException('Usuário não encontrado.');
    }

    if (!PERFIS_PERMITIDOS.includes(usuario.perfil)) {
      throw new ForbiddenException('Seu perfil não pode registrar obras.');
    }

    request.usuario = usuario; // as próximas etapas podem reaproveitar
    return true;
  }
}