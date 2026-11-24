import {
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import { PermissaoGuard } from '../common/guards/permissao.guard';
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

  @Get(':id')
  detalhar(@Param('id', ParseUUIDPipe) id: string) {
    return this.obras.detalhar(id);
}
  @Delete(':id')
  @HttpCode(204)
  @UseGuards(PermissaoGuard)
  async excluir(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    await this.obras.excluir(id);
  }
}