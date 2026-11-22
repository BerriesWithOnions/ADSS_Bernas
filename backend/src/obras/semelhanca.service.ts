import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { normalizarTitulo } from './normalizar-titulo';

export interface ObraSemelhante {
  id: string;
  titulo: string;
  artista: string;
  protocolo: string | null;
}

// Função pura: fácil de testar sem banco.
// Semelhante = mesmo artista + mesmo título, após normalizar os dois.
export function filtrarSemelhantes(
  obras: ObraSemelhante[],
  artista: string,
  titulo: string,
): ObraSemelhante[] {
  const artistaAlvo = normalizarTitulo(artista);
  const tituloAlvo = normalizarTitulo(titulo);

  if (!artistaAlvo || !tituloAlvo) {
    return [];
  }

  return obras.filter(
    (obra) =>
      normalizarTitulo(obra.artista) === artistaAlvo &&
      normalizarTitulo(obra.titulo) === tituloAlvo,
  );
}

@Injectable()
export class SemelhancaService {
  constructor(private readonly supabase: SupabaseService) {}

  async buscarSemelhantes(
    artista: string,
    titulo: string,
  ): Promise<ObraSemelhante[]> {
    const { data, error } = await this.supabase.client
      .from('obra')
      .select('id, titulo, artista, protocolo')
      .is('excluida_em', null); // ignora obras excluídas

    if (error) {
      throw error; // erro de banco vira 500
    }

    return filtrarSemelhantes((data ?? []) as ObraSemelhante[], artista, titulo);
  }
}