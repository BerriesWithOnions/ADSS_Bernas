import { Module } from '@nestjs/common';

import { SupabaseModule } from '../supabase/supabase.module';
import { HashModule } from '../hash/hash.module';

import { ObrasController } from './obras.controller';
import { ObrasService } from './obras.service';

@Module({
  imports: [
    SupabaseModule,
    HashModule,
  ],
  controllers: [ObrasController],
  providers: [ObrasService],
  exports: [ObrasService],
})
export class ObrasModule {}