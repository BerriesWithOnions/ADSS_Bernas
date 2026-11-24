// Valores identicos ao CHECK de arquivo_obra.categoria no schema.sql
export type CategoriaArquivo = 'imagem' | 'comprovante_titularidade';

// Subconjunto do que o multer entrega (memoryStorage).
// Definido aqui para nao depender de @types/multer.
export interface ArquivoRecebido {
  fieldname: string;
  originalname: string;
  mimetype: string;
  size: number;
  buffer: Buffer;
}

// Arquivo ja validado e com hash calculado, pronto para o Storage.
export interface ArquivoPreparado {
  categoria: CategoriaArquivo;
  nomeOriginal: string;
  mimeType: string;
  tamanhoBytes: number;
  hashArquivo: string;
  buffer: Buffer;
}

// Linha gravada em public.arquivo_obra
export interface ArquivoObraRegistro {
  id: string;
  obra_id: string;
  categoria: CategoriaArquivo;
  bucket: string;
  caminho_storage: string;
  nome_original: string;
  mime_type: string;
  tamanho_bytes: number;
  hash_arquivo: string;
  criado_em: string;
}
