export interface DadosHashObra {
  titulo: string;
  artistaId: string | null;
  tecnica: string;
  alturaCm: number;
  larguraCm: number;
  profundidadeCm: number;
  dataCriacao: string;
  titularId: string;
}

/**
 * Monta o objeto que vira JSON canônico + SHA-256 (RN-005):
 * título, artista, técnica, dimensões, data, titular e hashes dos arquivos ordenados.
 * O registrar (POST) e o editar (PATCH) devem usar ESTA função, senão os hashes divergem.
 */
export function montarPayloadHash(
  obra: DadosHashObra,
  hashesArquivos: string[],
): Record<string, unknown> {
  return {
    titulo: obra.titulo,
    artistaId: obra.artistaId,
    tecnica: obra.tecnica,
    alturaCm: Number(obra.alturaCm),
    larguraCm: Number(obra.larguraCm),
    profundidadeCm: Number(obra.profundidadeCm),
    dataCriacao: obra.dataCriacao,
    titularId: obra.titularId,
    arquivos: [...hashesArquivos].sort(),
  };
}
