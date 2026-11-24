import {
  BadRequestException,
  UnprocessableEntityException,
} from '@nestjs/common';

import {
  ArquivoRecebido,
  CategoriaArquivo,
} from './arquivos.types';

export const TAMANHO_MAXIMO_BYTES = 10 * 1024 * 1024; // 10 MB

const MIME_IMAGEM = ['image/jpeg', 'image/png'];
const MIME_PROVA = [...MIME_IMAGEM, 'application/pdf'];

// "Magic bytes": o mimetype enviado pelo cliente pode ser falsificado,
// entao conferimos tambem os primeiros bytes do conteudo.
const ASSINATURAS: Record<string, number[]> = {
  'image/jpeg': [0xff, 0xd8, 0xff],
  'image/png': [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a],
  'application/pdf': [0x25, 0x50, 0x44, 0x46, 0x2d], // %PDF-
};

function conteudoCombinaComMime(arquivo: ArquivoRecebido): boolean {
  const assinatura = ASSINATURAS[arquivo.mimetype];
  if (!assinatura || arquivo.buffer.length < assinatura.length) {
    return false;
  }
  return assinatura.every((byte, i) => arquivo.buffer[i] === byte);
}

function validarArquivo(
  arquivo: ArquivoRecebido,
  categoria: CategoriaArquivo,
): void {
  const nome = arquivo.originalname;
  const permitidos =
    categoria === 'imagem' ? MIME_IMAGEM : MIME_PROVA;

  if (!arquivo.buffer || arquivo.buffer.length === 0) {
    throw new BadRequestException(`O arquivo "${nome}" esta vazio.`);
  }

  if (arquivo.buffer.length > TAMANHO_MAXIMO_BYTES) {
    throw new BadRequestException(
      `O arquivo "${nome}" excede o limite de 10 MB.`,
    );
  }

  if (!permitidos.includes(arquivo.mimetype)) {
    const aceitos =
      categoria === 'imagem' ? 'JPG ou PNG' : 'JPG, PNG ou PDF';
    throw new BadRequestException(
      `Tipo de arquivo invalido em "${nome}". Aceitos: ${aceitos}.`,
    );
  }

  if (!conteudoCombinaComMime(arquivo)) {
    throw new BadRequestException(
      `O conteudo de "${nome}" nao corresponde ao tipo informado.`,
    );
  }
}

/**
 * Regras de arquivos do UC-03 (RF-002):
 *  - pelo menos 1 imagem                      -> 400 (cadastro incompleto)
 *  - prova de titularidade obrigatoria        -> 422 (titularidade nao comprovada)
 *  - tipo, tamanho e conteudo validos         -> 400
 */
export function validarArquivosObra(
  imagens: ArquivoRecebido[] | undefined,
  prova: ArquivoRecebido | undefined,
): void {
  if (!imagens || imagens.length === 0) {
    throw new BadRequestException(
      'Envie pelo menos uma imagem da obra (campo "imagens").',
    );
  }

  if (!prova) {
    throw new UnprocessableEntityException(
      'Titularidade nao comprovada: envie a prova de titularidade (campo "provaTitularidade").',
    );
  }

  imagens.forEach((imagem) => validarArquivo(imagem, 'imagem'));
  validarArquivo(prova, 'comprovante_titularidade');
}
