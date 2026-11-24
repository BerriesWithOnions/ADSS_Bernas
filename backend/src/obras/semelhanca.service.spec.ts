import { filtrarSemelhantes } from './semelhanca.service';

describe('filtrarSemelhantes', () => {
  const obras = [
    { id: '1', titulo: 'Lua Cheia', artista: 'Marina Alves', protocolo: null },
    { id: '2', titulo: 'Mar Aberto', artista: 'Marina Alves', protocolo: null },
    { id: '3', titulo: 'Lua Cheia', artista: 'Rafael Duarte', protocolo: null },
  ];

  it('encontra mesmo artista e título equivalente após normalizar', () => {
    expect(filtrarSemelhantes(obras, 'marina  alves', 'LÚA cheia!')).toEqual([
      obras[0],
    ]);
  });

  it('não considera outro artista com o mesmo título', () => {
    const resultado = filtrarSemelhantes(obras, 'Rafael Duarte', 'Lua Cheia');
    expect(resultado).toEqual([obras[2]]);
  });

  it('não encontra título diferente', () => {
    expect(filtrarSemelhantes(obras, 'Marina Alves', 'Sol Poente')).toEqual([]);
  });

  it('devolve vazio se artista ou título forem vazios', () => {
    expect(filtrarSemelhantes(obras, '', 'Lua Cheia')).toEqual([]);
    expect(filtrarSemelhantes(obras, 'Marina Alves', '')).toEqual([]);
  });
});