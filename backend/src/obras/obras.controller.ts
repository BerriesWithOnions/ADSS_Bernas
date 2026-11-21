import { Body, Controller, Post } from '@nestjs/common';

import { ObrasService } from './obras.service';

@Controller('obras')
export class ObrasController {
  constructor(
    private readonly obrasService: ObrasService,
  ) {}

  @Post()
  async registrarObra(
    @Body() dados: Record<string, unknown>,
  ) {
    return this.obrasService.registrarObra(dados);
  }
}