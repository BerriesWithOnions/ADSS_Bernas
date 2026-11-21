
import {
  Controller,
  Get,
  Logger,
  ServiceUnavailableException,
} from '@nestjs/common';

import { SupabaseService } from './supabase/supabase.service';

@Controller('health')
export class HealthController {
  private readonly logger = new Logger(
    HealthController.name,
  );

  constructor(
    private readonly supabase: SupabaseService,
  ) {}

  @Get('db')
  async verificarBanco() {
    const { error } = await this.supabase.client
      .from('usuario')
      .select('id')
      .limit(1);

    if (error) {
      this.logger.error(error.message);

      throw new ServiceUnavailableException(
        'Falha na consulta ao banco',
      );
    }

    return {
      status: 'ok',
      database: 'connected',
    };
  }
}
