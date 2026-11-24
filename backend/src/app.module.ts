
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { HealthController } from './health.controller';
import { SupabaseModule } from './supabase/supabase.module';
import { HashModule } from './hash/hash.module';
import { AuditoriaModule } from './auditoria/auditoria.module';
import { ObrasModule } from './obras/obras.module';

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

  providers: [
    AppService,
  ],
})
export class AppModule {}
