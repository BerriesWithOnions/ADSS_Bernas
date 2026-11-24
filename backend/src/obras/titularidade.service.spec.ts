import { UnprocessableEntityException } from '@nestjs/common';
import type { UsuarioAutenticado } from '../common/guards/permissao.guard';
import { TitularidadeService } from './titularidade.service';

const u = (id: string, perfil: string): UsuarioAutenticado => ({
  id,
  nome: id,
  email: `${id}@t.com`,
  perfil,
});

const ARTISTA = u('artista-1', 'ARTISTA');
const OUTRO_ARTISTA = u('artista-2', 'ARTISTA');
const GALERIA = u('galeria-1', 'GALERIA');
const COLECIONADOR = u('colec-1', 'COLECIONADOR');

function servico(...existentes: UsuarioAutenticado[]) {
  return new TitularidadeService({
    buscarPorId: async (id: string) => existentes.find((x) => x.id === id) ?? null,
  });
}

const prova = [{ size: 1024, originalname: 'escritura.pdf' }];

describe('TitularidadeService (AT-54)', () => {
  it.each([[undefined], [null], [[]], [[{ size: 0 }]]])(
    '422 sem prova de titularidade (%j)',
    async (provas) => {
      await expect(
        servico(ARTISTA, COLECIONADOR).validar(
          ARTISTA,
          { artistaId: ARTISTA.id, titularId: COLECIONADOR.id },
          provas as any,
        ),
      ).rejects.toThrow(UnprocessableEntityException);
    },
  );

  it('422 quando o artista informado não existe', async () => {
    await expect(
      servico(GALERIA, COLECIONADOR).validar(
        GALERIA,
        { artistaId: 'fantasma', titularId: COLECIONADOR.id },
        prova,
      ),
    ).rejects.toThrow(UnprocessableEntityException);
  });

  it('422 quando o "artista" não tem perfil ARTISTA', async () => {
    await expect(
      servico(GALERIA, COLECIONADOR).validar(
        GALERIA,
        { artistaId: COLECIONADOR.id, titularId: COLECIONADOR.id },
        prova,
      ),
    ).rejects.toThrow(UnprocessableEntityException);
  });

  it('422 quando o titular não existe', async () => {
    await expect(
      servico(ARTISTA).validar(
        ARTISTA,
        { artistaId: ARTISTA.id, titularId: 'fantasma' },
        prova,
      ),
    ).rejects.toThrow(UnprocessableEntityException);
  });

  it('422 quando um artista tenta registrar obra de outro artista', async () => {
    await expect(
      servico(ARTISTA, OUTRO_ARTISTA).validar(
        ARTISTA,
        { artistaId: OUTRO_ARTISTA.id, titularId: ARTISTA.id },
        prova,
      ),
    ).rejects.toThrow(UnprocessableEntityException);
  });

  it('libera artista registrando a própria obra', async () => {
    await expect(
      servico(ARTISTA, COLECIONADOR).validar(
        ARTISTA,
        { artistaId: ARTISTA.id, titularId: COLECIONADOR.id },
        prova,
      ),
    ).resolves.toBeUndefined();
  });

  it('libera galeria registrando obra de um artista', async () => {
    await expect(
      servico(GALERIA, ARTISTA).validar(
        GALERIA,
        { artistaId: ARTISTA.id, titularId: GALERIA.id },
        prova,
      ),
    ).resolves.toBeUndefined();
  });
});
