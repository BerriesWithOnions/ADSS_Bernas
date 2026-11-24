import { Module } from '@nestjs/common';

import { SupabaseModule } from '../supabase/supabase.module';
import { HashModule } from '../hash/hash.module';
import { PermissaoModule } from '../common/guards/permissao.module';
import { AuditoriaModule } from '../auditoria/auditoria.module';

import { ObrasController } from './obras.controller';
import { ObrasEdicaoController } from './obras-edicao.controller';
import { ObrasService } from './obras.service';
import { ObrasEdicaoService } from './obras-edicao.service';

@Module({
  imports: [
    SupabaseModule,
    HashModule,
    PermissaoModule,
    AuditoriaModule,
  ],
  controllers: [ObrasController, ObrasEdicaoController],
  providers: [ObrasService, ObrasEdicaoService],
  exports: [ObrasService, ObrasEdicaoService],
})
export class ObrasModule {}