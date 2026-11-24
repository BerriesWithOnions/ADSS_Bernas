import { INestApplication, NotFoundException, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { USUARIOS_LOOKUP } from '../common/guards/permissao.guard';
import { ObrasEdicaoController } from './obras-edicao.controller';
import { ObrasEdicaoService } from './obras-edicao.service';
import { PermissaoGuard } from '../common/guards/permissao.guard';

const ARTISTA_ID = '00000000-0000-4000-8000-000000000001';
const COLECIONADOR_ID = '00000000-0000-4000-8000-000000000004';
const OBRA_ID = '6f1c1c1e-0000-4000-8000-000000000001';

describe('PATCH /obras/:id (AT-57, HTTP)', () => {
  let app: INestApplication;
  const atualizar = jest.fn();

  beforeEach(async () => {
    atualizar.mockReset();
    const modulo = await Test.createTestingModule({
      controllers: [ObrasEdicaoController],
      providers: [
        PermissaoGuard,
        { provide: ObrasEdicaoService, useValue: { atualizar } },
        {
          provide: USUARIOS_LOOKUP,
          useValue: {
            buscarPorId: async (id: string) =>
              id === ARTISTA_ID
                ? { id, nome: 'M', email: 'm@t.com', perfil: 'ARTISTA' }
                : id === COLECIONADOR_ID
                  ? { id, nome: 'C', email: 'c@t.com', perfil: 'COLECIONADOR' }
                  : null,
          },
        },
      ],
    }).compile();

    app = modulo.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }),
    );
    await app.init();
  });

  afterEach(() => app.close());

  const patch = (id = OBRA_ID) => request(app.getHttpServer()).patch(`/obras/${id}`);

  it('403 sem X-User-Id', async () => {
    await patch().send({ titulo: 'x' }).expect(403);
  });

  it('403 para perfil que não pode editar', async () => {
    await patch().set('X-User-Id', COLECIONADOR_ID).send({ titulo: 'x' }).expect(403);
  });

  it('400 para id que não é UUID', async () => {
    await patch('abc').set('X-User-Id', ARTISTA_ID).send({ titulo: 'x' }).expect(400);
  });

  it.each([
    [{ alturaCm: -1 }],
    [{ alturaCm: 'abc' }],
    [{ titulo: '   ' }],
    [{ dataCriacao: '2025-13-45' }],
    [{ titularId: ARTISTA_ID }], // não editável
    [{ artistaId: ARTISTA_ID }], // não editável
  ])('400 para corpo inválido %j', async (corpo) => {
    await patch().set('X-User-Id', ARTISTA_ID).send(corpo).expect(400);
    expect(atualizar).not.toHaveBeenCalled();
  });

  it('200 e repassa o DTO e o ator ao service', async () => {
    atualizar.mockResolvedValue({ id: OBRA_ID, camposAlterados: ['titulo'] });
    const res = await patch()
      .set('X-User-Id', ARTISTA_ID)
      .send({ titulo: 'Novo', alturaCm: '81.5' })
      .expect(200);

    expect(res.body.camposAlterados).toEqual(['titulo']);
    expect(atualizar).toHaveBeenCalledWith(
      OBRA_ID,
      expect.objectContaining({ titulo: 'Novo', alturaCm: 81.5 }),
      expect.objectContaining({ id: ARTISTA_ID }),
    );
  });

  it('404 quando o service diz que a obra não existe', async () => {
    atualizar.mockRejectedValue(new NotFoundException('Obra não encontrada.'));
    await patch().set('X-User-Id', ARTISTA_ID).send({ titulo: 'x' }).expect(404);
  });
});
