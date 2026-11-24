import { normalizarTitulo } from './normalizar-titulo';

describe('normalizarTitulo', () => {
  it('ignora acentos, maiúsculas, pontuação e espaços extras', () => {
    expect(normalizarTitulo('  Lúa   CHÉIA! ')).toBe('lua cheia');
  });

  it('trata títulos equivalentes como iguais', () => {
    expect(normalizarTitulo('Lua Cheia')).toBe(normalizarTitulo('LUA  CHEIA!'));
  });

  it('devolve vazio para texto só com símbolos', () => {
    expect(normalizarTitulo('!!!')).toBe('');
  });
});