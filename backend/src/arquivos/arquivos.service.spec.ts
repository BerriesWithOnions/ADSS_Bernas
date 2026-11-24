import {
  BadRequestException,
  InternalServerErrorException,
  UnprocessableEntityException,
} from '@nestjs/common';

import { ArquivosService } from './arquivos.service';
import { HashService } from '../hash/hash.service';
import { ArquivoRecebido } from './arquivos.types';

const OBRA_ID = '11111111-1111-4111-8111-111111111111';

const PNG = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 1, 2, 3];
const PDF = [0x25, 0x50, 0x44, 0x46, 0x2d, 0x31, 9, 9];

function recebido(
  mimetype: string,
  bytes: number[],
  nome = 'a',
): ArquivoRecebido {
  return {
    fieldname: 'x',
    originalname: nome,
    mimetype,
    size: bytes.length,
    buffer: Buffer.from(bytes),
  };
}

function criarServico(opcoes: {
  uploadErro?: boolean;
  uploadFalhaNaVez?: number;
  insertErro?: boolean;
} = {}) {
  let chamadasUpload = 0;

  const upload = jest.fn().mockImplementation(async () => {
    chamadasUpload += 1;
    const falha =
      opcoes.uploadErro || opcoes.uploadFalhaNaVez === chamadasUpload;
    return { error: falha ? { message: 'boom' } : null };
  });
  const remove = jest.fn().mockResolvedValue({ error: null });
  const select = jest.fn().mockImplementation(async () =>
    opcoes.insertErro
      ? { data: null, error: { message: 'db' } }
      : { data: [{ id: 'x' }], error: null },
  );
  const insert = jest.fn().mockReturnValue({ select });

  const supabase = {
    client: {
      storage: { from: jest.fn().mockReturnValue({ upload, remove }) },
      from: jest.fn().mockReturnValue({ insert }),
    },
  };
  const config = { get: jest.fn().mockReturnValue(undefined) };

  const servico = new ArquivosService(
    supabase as any,
    new HashService(),
    config as any,
  );

  return { servico, upload, remove, insert, supabase };
}

describe('ArquivosService.prepararArquivos', () => {
  it('valida e calcula hash de cada arquivo', () => {
    const { servico } = criarServico();
    const prontos = servico.prepararArquivos(
      [recebido('image/png', PNG, 'foto.png')],
      recebido('application/pdf', PDF, 'prova.pdf'),
    );

    expect(prontos).toHaveLength(2);
    expect(prontos[0].categoria).toBe('imagem');
    expect(prontos[1].categoria).toBe('comprovante_titularidade');
    prontos.forEach((p) =>
      expect(p.hashArquivo).toMatch(/^[0-9a-f]{64}$/),
    );
    expect(prontos[0].nomeOriginal).toBe('foto.png');
  });

  it('400 sem imagem e 422 sem prova', () => {
    const { servico } = criarServico();
    expect(() =>
      servico.prepararArquivos([], recebido('application/pdf', PDF)),
    ).toThrow(BadRequestException);
    expect(() =>
      servico.prepararArquivos([recebido('image/png', PNG)], undefined),
    ).toThrow(UnprocessableEntityException);
  });

  it('hashesOrdenados nao depende da ordem de envio', () => {
    const { servico } = criarServico();
    const a = servico.prepararArquivos(
      [recebido('image/png', PNG), recebido('image/png', [...PNG, 7])],
      recebido('application/pdf', PDF),
    );
    const b = servico.prepararArquivos(
      [recebido('image/png', [...PNG, 7]), recebido('image/png', PNG)],
      recebido('application/pdf', PDF),
    );

    expect(servico.hashesOrdenados(a)).toEqual(servico.hashesOrdenados(b));
  });
});

describe('ArquivosService.anexarAObra', () => {
  const preparar = (s: ArquivosService) =>
    s.prepararArquivos(
      [recebido('image/png', PNG)],
      recebido('application/pdf', PDF),
    );

  it('sobe todos os arquivos e grava as linhas com hash', async () => {
    const { servico, upload, insert } = criarServico();
    await servico.anexarAObra(OBRA_ID, preparar(servico));

    expect(upload).toHaveBeenCalledTimes(2);
    expect(upload.mock.calls[0][0]).toMatch(
      new RegExp(`^${OBRA_ID}/imagem/[0-9a-f-]{36}\\.png$`),
    );
    expect(upload.mock.calls[0][2]).toMatchObject({
      contentType: 'image/png',
      upsert: false,
    });

    const linhas = insert.mock.calls[0][0];
    expect(linhas).toHaveLength(2);
    expect(linhas[0]).toMatchObject({
      obra_id: OBRA_ID,
      categoria: 'imagem',
      bucket: 'obras',
    });
    expect(linhas[0].hash_arquivo).toMatch(/^[0-9a-f]{64}$/);
  });

  it('se o upload do 2o arquivo falhar, remove o 1o e devolve 500', async () => {
    const { servico, remove, insert } = criarServico({
      uploadFalhaNaVez: 2,
    });

    await expect(
      servico.anexarAObra(OBRA_ID, preparar(servico)),
    ).rejects.toThrow(InternalServerErrorException);

    expect(remove).toHaveBeenCalledTimes(1);
    expect(remove.mock.calls[0][0]).toHaveLength(1);
    expect(insert).not.toHaveBeenCalled();
  });

  it('se o insert falhar, remove todos os arquivos enviados', async () => {
    const { servico, remove } = criarServico({ insertErro: true });

    await expect(
      servico.anexarAObra(OBRA_ID, preparar(servico)),
    ).rejects.toThrow(InternalServerErrorException);

    expect(remove.mock.calls[0][0]).toHaveLength(2);
  });
});
