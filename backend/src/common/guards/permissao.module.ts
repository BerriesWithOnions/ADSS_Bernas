import { Module } from '@nestjs/common';
import { SupabaseModule } from '../../supabase/supabase.module';
import { PermissaoGuard, USUARIOS_LOOKUP } from './permissao.guard';
import { UsuariosLookupService } from './usuarios-lookup.service';

@Module({
  imports: [SupabaseModule],
  providers: [
    { provide: USUARIOS_LOOKUP, useClass: UsuariosLookupService },
    PermissaoGuard,
  ],
  exports: [PermissaoGuard, USUARIOS_LOOKUP],
})
export class PermissaoModule {}