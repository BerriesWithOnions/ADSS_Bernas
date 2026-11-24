import { ConflictException } from '@nestjs/common';
import { ObrasService } from './obras.service';
import { SupabaseService } from '../supabase/supabase.service';
import { HashService } from '../hash/hash.service';

describe('ObrasService', () => {
  it('deve retornar conflito quando o hash já existe', async () => {
    const single = jest.fn(async () => ({
      data: null,
      error: {
        code: '23505',
        message:
          'duplicate key value violates unique constraint "obra_hash_conteudo_key"',
        details: 'Key (hash_conteudo) already exists.',
      },
    }));

    const insert = jest.fn(() => ({
      select: () => ({
        single,
      }),
    }));

    const supabaseMock = {
      client: {
        from: jest.fn(() => ({ insert })),
      },
    };

    const hashMock = {
      gerarHashJson: jest.fn(() => 'hash-existente'),
    };

    const service = new ObrasService(
      supabaseMock as unknown as SupabaseService,
      hashMock as unknown as HashService,
    );

    await expect(
      service.registrarObra({ titulo: 'Obra duplicada' }),
    ).rejects.toThrow(ConflictException);

    expect(insert).toHaveBeenCalledWith({
      titulo: 'Obra duplicada',
      hash_conteudo: 'hash-existente',
    });
  });
});