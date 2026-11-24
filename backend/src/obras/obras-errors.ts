
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

type ErroBanco = {
  code?: string;
  message?: string;
  details?: string | null;
} | null;

export function tratarErroRegistro(
  error: ErroBanco,
): void {
  if (!error) {
    return;
  }

  if (error.code === '23505') {
    const descricao = [
      error.message,
      error.details,
    ]
      .filter(Boolean)
      .join(' ');

    if (descricao.includes('hash_conteudo')) {
      throw new ConflictException(
        'Já existe uma obra registrada com este hash.',
      );
    }

    throw new ConflictException(
      'Já existe um registro com um identificador único informado.',
    );
  }

  throw new InternalServerErrorException(
    'Não foi possível registrar a obra.',
  );
}
