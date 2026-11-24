import { Transform } from 'class-transformer';
import { IsDateString, IsNumber, IsOptional, IsPositive, Matches } from 'class-validator';

function converterDimensao({ value }: { value: unknown }): unknown {
  if (typeof value !== 'string') return value;
  const texto = value.trim();
  return /^\d+(?:\.\d+)?$/.test(texto) ? Number(texto) : value;
}

/**
 * AT-57 — todos os campos são opcionais (PATCH).
 * artistaId e titularId NÃO são editáveis: mudar artista viola a RN-011 e mudar
 * titular é transferência (UC-07). Com forbidNonWhitelisted, enviá-los devolve 400.
 */
export class AtualizarObraDto {
  @IsOptional()
  @Matches(/\S/, { message: 'O título da obra não pode ficar vazio.' })
  titulo?: string;

  @IsOptional()
  @Matches(/\S/, { message: 'A técnica da obra não pode ficar vazia.' })
  tecnica?: string;

  @IsOptional()
  @Transform(converterDimensao, { toClassOnly: true })
  @IsNumber({}, { message: 'Informe um número válido para alturaCm.' })
  @IsPositive({ message: 'alturaCm deve ser maior que zero.' })
  alturaCm?: number;

  @IsOptional()
  @Transform(converterDimensao, { toClassOnly: true })
  @IsNumber({}, { message: 'Informe um número válido para larguraCm.' })
  @IsPositive({ message: 'larguraCm deve ser maior que zero.' })
  larguraCm?: number;

  @IsOptional()
  @Transform(converterDimensao, { toClassOnly: true })
  @IsNumber({}, { message: 'Informe um número válido para profundidadeCm.' })
  @IsPositive({ message: 'profundidadeCm deve ser maior que zero.' })
  profundidadeCm?: number;

  @IsOptional()
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'Informe a data de criação no formato AAAA-MM-DD.',
  })
  @IsDateString({ strict: true }, { message: 'Informe uma data de criação válida.' })
  dataCriacao?: string;
}
