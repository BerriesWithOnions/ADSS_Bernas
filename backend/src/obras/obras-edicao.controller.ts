import {
  Body,
  Controller,
  Param,
  ParseUUIDPipe,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { PermissaoGuard } from '../common/guards/permissao.guard';
import type { UsuarioAutenticado } from '../common/guards/permissao.guard';
import { AtualizarObraDto } from './dto/atualizar-obra.dto';
import { ObrasEdicaoService } from './obras-edicao.service';

@Controller('obras')
@UseGuards(PermissaoGuard)
export class ObrasEdicaoController {
  constructor(private readonly obras: ObrasEdicaoService) {}

  // AT-57
  @Patch(':id')
  atualizar(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() dto: AtualizarObraDto,
    @Req() req: { usuario: UsuarioAutenticado },
  ) {
    return this.obras.atualizar(id, dto, req.usuario);
  }
}
