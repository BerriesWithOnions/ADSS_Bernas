
import {
  BadRequestException,
  Injectable,
} from '@nestjs/common';

import { createHash } from 'node:crypto';
import canonicalize from 'canonicalize';

@Injectable()
export class HashService {
  gerarHashJson(dados: unknown): string {
    let jsonCanonico: string | undefined;

    try {
      jsonCanonico = canonicalize(dados);
    } catch {
      throw new BadRequestException(
        'Dados invalidos para JSON canonico',
      );
    }

    if (typeof jsonCanonico !== 'string') {
      throw new BadRequestException(
        'Dados invalidos para JSON canonico',
      );
    }

    return createHash('sha256')
      .update(jsonCanonico, 'utf8')
      .digest('hex');
  }
  // AT-60 / RNF-009: SHA-256 do conteudo binario do arquivo.
  gerarHashArquivo(conteudo: Buffer | Uint8Array): string {
    if (!conteudo || conteudo.length === 0) {
      throw new BadRequestException(
        'Arquivo vazio: nao e possivel calcular o hash',
      );
    }

    return createHash('sha256')
      .update(conteudo)
      .digest('hex');
  }
}
