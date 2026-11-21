import { Injectable } from '@nestjs/common';

import { SupabaseService } from '../supabase/supabase.service';
import { HashService } from '../hash/hash.service';
import { tratarErroRegistro } from './obras-errors';

@Injectable()
export class ObrasService {
  constructor(
    private readonly supabase: SupabaseService,
    private readonly hashService: HashService,
  ) {}

  async registrarObra(dados: Record<string, unknown>) {
    const { hash_conteudo, ...camposObra } = dados;

    const hash = this.hashService.gerarHashJson(camposObra);

    const { data, error } = await this.supabase.client
      .from('obra')
      .insert({
        ...camposObra,
        hash_conteudo: hash,
      })
      .select()
      .single();

    tratarErroRegistro(error);

    return data;
  }
}