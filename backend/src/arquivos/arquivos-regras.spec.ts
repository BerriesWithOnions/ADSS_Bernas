import {
  BadRequestException,
  UnprocessableEntityException,
} from '@nestjs/common';

import {
  TAMANHO_MAXIMO_BYTES,
  validarArquivosObra,
} from './arquivos-regras';
import { ArquivoRecebido } from './arquivos.types';

const PNG = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];
const JPG = [0xff, 0xd8, 0xff, 0xe0];
const PDF = [0x25, 0x50, 0x44, 0x46, 0x2d, 0x31];

function arquivo(
  mimetype: string,
  bytes: number[],
  extra: Partial<ArquivoRecebido> = {},
): ArquivoRecebido {
  return {
    fieldname: 'x',
    originalname: 'arquivo.bin',
    mimetype,
    size: bytes.length,
    buffer: Buffer.from(bytes),
    ...extra,
  };
}

const imagemOk = () => arquivo('image/png', PNG);
const provaOk = () => arquivo('application/pdf', PDF);

describe('validarArquivosObra', () => {
  it('aceita 1 imagem + prova em PDF', () => {
    expect(() =>
      validarArquivosObra([imagemOk()], provaOk()),
    ).not.toThrow();
  });

  it('aceita varias imagens e prova em imagem', () => {
    expect(() =>
      validarArquivosObra(
        [imagemOk(), arquivo('image/jpeg', JPG)],
        arquivo('image/jpeg', JPG),
      ),
    ).not.toThrow();
  });

  it('400 sem nenhuma imagem (undefined ou lista vazia)', () => {
    expect(() =>
      validarArquivosObra(undefined, provaOk()),
    ).toThrow(BadRequestException);
    expect(() => validarArquivosObra([], provaOk())).toThrow(
      BadRequestException,
    );
  });

  it('422 sem prova de titularidade', () => {
    expect(() =>
      validarArquivosObra([imagemOk()], undefined),
    ).toThrow(UnprocessableEntityException);
  });

  it('400 para imagem em PDF (imagem so aceita JPG/PNG)', () => {
    expect(() =>
      validarArquivosObra([provaOk()], provaOk()),
    ).toThrow(BadRequestException);
  });

  it('400 para tipo nao permitido na prova', () => {
    expect(() =>
      validarArquivosObra(
        [imagemOk()],
        arquivo('text/plain', [0x61, 0x62]),
      ),
    ).toThrow(BadRequestException);
  });

  it('400 quando o conteudo nao bate com o mimetype informado', () => {
    // diz ser PNG mas os bytes sao de PDF
    expect(() =>
      validarArquivosObra([arquivo('image/png', PDF)], provaOk()),
    ).toThrow(BadRequestException);
  });

  it('400 para arquivo vazio', () => {
    expect(() =>
      validarArquivosObra([arquivo('image/png', [])], provaOk()),
    ).toThrow(BadRequestException);
  });

  it('400 para arquivo acima de 10 MB', () => {
    const grande = arquivo('image/png', PNG, {
      buffer: Buffer.concat([
        Buffer.from(PNG),
        Buffer.alloc(TAMANHO_MAXIMO_BYTES),
      ]),
    });
    expect(() =>
      validarArquivosObra([grande], provaOk()),
    ).toThrow(BadRequestException);
  });
});
