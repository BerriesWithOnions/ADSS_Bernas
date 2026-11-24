
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { HealthController } from './health.controller';
import { SupabaseModule } from './supabase/supabase.module';
import { HashModule } from './hash/hash.module';
import { AuditoriaModule } from './auditoria/auditoria.module';
import { ObrasModule } from './obras/obras.module';

import { TitularidadeService } from './obras/titularidade.service';
import { ObrasService } from './obras/obras.service';
import { ObrasEdicaoService } from './obras/obras-edicao.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SupabaseModule,
    HashModule,
    ObrasModule,
  ],

  controllers: [
    AppController,
    HealthController,
  ],

  providers: [ ObrasService, ObrasEdicaoService, TitularidadeService,
  ],

  exports: [ObrasService, ObrasEdicaoService, TitularidadeService],
})
export class AppModule {}
