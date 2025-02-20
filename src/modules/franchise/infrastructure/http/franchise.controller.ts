import {
  Controller,
  Post,
  Get,
  Delete,
  Body,
  Param,
  UseGuards,
  Request,
  Inject,
} from '@nestjs/common';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { Roles } from '../decorators/roles.decorator';
import { Role } from '../../../super/domain/enums/sRole.enum';
import { CreateFranchiseDto } from '../../application/dto/franchise.dto';
import { IFranchiseService } from '../../domain/interfaces/ifranchise.service';
import { RolesGuard } from 'src/modules/franchise/infrastructure/guards/roles.guard';

@Controller('franchise')
@UseGuards(JwtAuthGuard, RolesGuard)
export class FranchiseController {
  constructor(
    @Inject('IFranchiseService')
    private readonly franchiseService: IFranchiseService,
  ) {}

  @Post('createFranchise')
  @Roles(Role.pAdmin)
  create(@Body() createFranchiseDto: CreateFranchiseDto, @Request() req) {
    return this.franchiseService.create(createFranchiseDto, req.user.partnerId);
  }

  @Get('findAll')
  @Roles(Role.pAdmin)
  findAll(@Request() req) {
    return this.franchiseService.findByPartnerId(req.user.partnerId);
  }

  @Delete(':id')
  @Roles(Role.pAdmin)
  remove(@Param('id') id: string, @Request() req) {
    return this.franchiseService.delete(id, req.user.partnerId);
  }
}
