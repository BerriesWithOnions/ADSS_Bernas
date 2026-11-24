import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { TAMANHO_MAXIMO_BYTES } from './arquivos-regras';

export const CAMPO_IMAGENS = 'imagens';
export const CAMPO_PROVA = 'provaTitularidade';
export const MAX_IMAGENS = 10;

// AT-59: recebe o multipart do POST /obras.
// Sem "storage" definido, o multer guarda em memoria (file.buffer),
// que e o que precisamos para calcular o hash antes de enviar.
export const UploadObraInterceptor = FileFieldsInterceptor(
  [
    { name: CAMPO_IMAGENS, maxCount: MAX_IMAGENS },
    { name: CAMPO_PROVA, maxCount: 1 },
  ],
  { limits: { fileSize: TAMANHO_MAXIMO_BYTES } },
);
