// "Lúa  Chéia!" -> "lua cheia"
export function normalizarTitulo(titulo: string): string {
  return titulo
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // tira acentos
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ') // tira pontuação
    .replace(/\s+/g, ' ') // junta espaços
    .trim();
}