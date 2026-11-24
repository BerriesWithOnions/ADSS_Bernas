import { Module } from '@nestjs/common';

import { SupabaseModule } from '../supabase/supabase.module';
import { HashModule } from '../hash/hash.module';
import { ArquivosService } from './arquivos.service';

@Module({
  imports: [SupabaseModule, HashModule],
  providers: [ArquivosService],
  exports: [ArquivosService],
})
export class ArquivosModule {}
