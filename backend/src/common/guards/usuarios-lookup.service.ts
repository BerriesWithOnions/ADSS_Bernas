import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../../supabase/supabase.service';
import { UsuarioAutenticado, UsuariosLookup } from './permissao.guard';

@Injectable()
export class UsuariosLookupService implements UsuariosLookup {
  constructor(private readonly supabase: SupabaseService) {}

  async buscarPorId(id: string): Promise<UsuarioAutenticado | null> {
    const { data, error } = await this.supabase.client
      .from('usuario')
      .select('id, nome, email, perfil')
      .eq('id', id)
      .maybeSingle();

    if (error) {
      throw error; // erro de banco vira 500, e não 403
    }

    return data as UsuarioAutenticado | null;
  }
}