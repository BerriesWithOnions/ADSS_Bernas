
import { BadRequestException } from '@nestjs/common';
import { HashService } from './hash.service';

describe('HashService', () => {
  const service = new HashService();

  it('gera o mesmo hash para JSONs equivalentes', () => {
    const obra1 = {
      titulo: 'Noite Estrelada',
      artista: 'Vincent van Gogh',
      detalhes: {
        ano: 1889,
        tecnica: 'oleo',
      },
    };

    const obra2 = {
      detalhes: {
        tecnica: 'oleo',
        ano: 1889,
      },
      artista: 'Vincent van Gogh',
      titulo: 'Noite Estrelada',
    };

    const hash1 = service.gerarHashJson(obra1);
    const hash2 = service.gerarHashJson(obra2);

    expect(hash1).toBe(hash2);
    expect(hash1).toMatch(/^[0-9a-f]{64}$/);
  });

  it('gera hashes diferentes para dados diferentes', () => {
    const hash1 = service.gerarHashJson({
      titulo: 'Obra A',
    });

    const hash2 = service.gerarHashJson({
      titulo: 'Obra B',
    });

    expect(hash1).not.toBe(hash2);
  });

  it('rejeita entradas invalidas', () => {
    expect(() =>
      service.gerarHashJson(undefined),
    ).toThrow(BadRequestException);
  });
});
