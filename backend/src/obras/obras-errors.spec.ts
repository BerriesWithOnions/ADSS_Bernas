
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

import { tratarErroRegistro } from './obras-errors';

describe('Tratamento de erros de registro', () => {
  it('deve retornar 409 para hash duplicado', () => {
    const error = {
      code: '23505',
      message:
        'duplicate key value violates unique constraint "obra_hash_conteudo_key"',
    };

    let excecao: unknown;

    try {
      tratarErroRegistro(error);
    } catch (erro) {
      excecao = erro;
    }

    expect(excecao).toBeInstanceOf(ConflictException);

    expect(
      (excecao as ConflictException).getStatus(),
    ).toBe(409);
  });

  it('deve tratar outros erros do banco', () => {
    const error = {
      code: 'XX000',
      message: 'Erro interno no banco',
    };

    expect(() => tratarErroRegistro(error))
      .toThrow(InternalServerErrorException);
  });

  it('não deve lançar exceção sem erro', () => {
    expect(() => tratarErroRegistro(null))
      .not.toThrow();
  });

  it('deve tratar outras violações de unicidade', () => {
    const error = {
      code: '23505',
      message:
        'duplicate key value violates unique constraint "obra_protocolo_key"',
    };

    expect(() => tratarErroRegistro(error))
      .toThrow(ConflictException);
  });
});
