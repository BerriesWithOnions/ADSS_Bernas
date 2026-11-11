import { Transform } from 'class-transformer';
import {
  IsDateString,
  IsNumber,
  IsPositive,
  IsUUID,
  Matches,
} from 'class-validator';

// Campos numéricos de multipart chegam como texto.
function converterDimensao({ value }: { value: unknown }): unknown {
  if (typeof value !== 'string') {
    return value;
  }

  const texto = value.trim();
  return /^\d+(?:\.\d+)?$/.test(texto) ? Number(texto) : value;
}

export class RegistrarObraDto {
  @Matches(/\S/, { message: 'O título da obra é obrigatório.' })
  titulo!: string;

  @IsUUID(undefined, { message: 'Informe um artistaId no formato UUID.' })
  artistaId!: string;

  @IsUUID(undefined, { message: 'Informe um titularId no formato UUID.' })
  titularId!: string;

  @Matches(/\S/, { message: 'A técnica da obra é obrigatória.' })
  tecnica!: string;

  @Transform(converterDimensao, { toClassOnly: true })
  @IsNumber({}, { message: 'Informe um número válido para alturaCm.' })
  @IsPositive({ message: 'alturaCm deve ser maior que zero.' })
  alturaCm!: number;

  @Transform(converterDimensao, { toClassOnly: true })
  @IsNumber({}, { message: 'Informe um número válido para larguraCm.' })
  @IsPositive({ message: 'larguraCm deve ser maior que zero.' })
  larguraCm!: number;

  @Transform(converterDimensao, { toClassOnly: true })
  @IsNumber({}, { message: 'Informe um número válido para profundidadeCm.' })
  @IsPositive({ message: 'profundidadeCm deve ser maior que zero.' })
  profundidadeCm!: number;

  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'Informe a data de criação no formato AAAA-MM-DD.',
  })
  @IsDateString({ strict: true }, { message: 'Informe uma data de criação válida.' })
  dataCriacao!: string;
}
