import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { PartnerService } from '../../application/services/partner.service';
import { PartnerDTO } from '../../application/dto/partner.dto';
import { JwtAuthGuard } from '../../../super/infrastructure/guards/jwt-auth.guard';

import { Role } from '../../../super/domain/enums/sRole.enum';
import { Roles } from 'src/modules/super/infrastructure/decorators/roles.decorator';
import { RolesGuard } from '../guards/roles.guard';

@Controller('partner')
export class PartnerController {
  constructor(private readonly partnerService: PartnerService) {}

  @Post('registerPartner')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.sAdmin)
  async register(@Body() partnerDto: PartnerDTO) {
    return this.partnerService.register(partnerDto);
  }

  @Post('loginPartner')
  async login(@Body() { username, password }) {
    return this.partnerService.login(username, password);
  }
}
