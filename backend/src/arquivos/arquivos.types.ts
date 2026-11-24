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
