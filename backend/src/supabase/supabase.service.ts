
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  createClient,
  SupabaseClient,
} from '@supabase/supabase-js';

@Injectable()
export class SupabaseService {
  public readonly client: SupabaseClient;

  constructor(
    private readonly config: ConfigService,
  ) {
    const url = this.config.getOrThrow<string>(
      'SUPABASE_URL',
    );

    const secretKey = this.config.getOrThrow<string>(
      'SUPABASE_SECRET_KEY',
    );

    this.client = createClient(url, secretKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
        detectSessionInUrl: false,
      },
    });
  }
}
