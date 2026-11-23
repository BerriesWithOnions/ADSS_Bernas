import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

import { SupabaseService } from '../supabase/supabase.service';
import { HashService } from '../hash/hash.service';
import { tratarErroRegistro } from './obras-errors';

@Injectable()
export class ObrasService {
  constructor(
    private readonly supabase: SupabaseService,
    private readonly hashService: HashService,
  ) {}

async listar(artistaId?: string, titulo?: string, status?: string) {
  let consulta = this.supabase.client
    .from('obra')
    .select('*')
    .is('excluida_em', null);

  if (artistaId) {
    consulta = consulta.eq('artista_id', artistaId);
  }

  if (titulo !== undefined) {
    if (typeof titulo !== 'string') {
      throw new BadRequestException('Título inválido.');
    }

    const trecho = titulo.trim().replace(/[\\%_]/g, '\\$&');
    if (trecho) {
      consulta = consulta.ilike('titulo', `%${trecho}%`);
    }
  }

  if (status !== undefined) {
    if (status !== 'PENDENTE' && status !== 'CONFIRMADO') {
      throw new BadRequestException('Status inválido.');
    }

    consulta = consulta.eq('status', status);
  }

  const { data, error } = await consulta
    .order('criado_em', { ascending: false })
    .order('id');

  if (error) {
    throw new InternalServerErrorException('Não foi possível listar as obras.');
  }

  return data;
}

async detalhar(id: string) {
  const { data, error } = await this.supabase.client
    .from('obra')
    .select('*, arquivos:arquivo_obra(*), eventos:evento_auditoria(*)')
    .eq('id', id)
    .is('excluida_em', null)
    .maybeSingle();

  if (error) {
    throw new InternalServerErrorException('Não foi possível consultar a obra.');
  }

  if (!data) {
    throw new NotFoundException('Obra não encontrada.');
  }

  return data;
}

async excluir(id: string): Promise<void> {
  const { data, error } = await this.supabase.client
    .from('obra')
    .update({ excluida_em: new Date().toISOString() })
    .eq('id', id)
    .is('excluida_em', null)
    .select('id')
    .maybeSingle();

  if (error) {
    throw new InternalServerErrorException('Não foi possível excluir a obra.');
  }

  if (!data) {
    throw new NotFoundException('Obra não encontrada.');
  }
}

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