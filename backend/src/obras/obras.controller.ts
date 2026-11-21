import { Controller, Get, ParseUUIDPipe, Query } from '@nestjs/common';
import { ObrasService } from './obras.service';

@Controller('obras')
export class ObrasController {
  constructor(private readonly obras: ObrasService) {}

  @Get()
  listar(
    @Query('artistaId', new ParseUUIDPipe({ optional: true }))
    artistaId?: string,
    @Query('titulo') titulo?: string,
    @Query('status') status?: string,
  ) {
    return this.obras.listar(artistaId, titulo, status);
  }
}