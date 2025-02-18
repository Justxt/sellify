import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { PartnerService } from '../../application/services/partner.service';
import { PartnerDTO } from '../../application/dto/partner.dto';
import { JwtAuthGuard } from '../../../super/infrastructure/auth/jwt-auth.guard';
import { RolesGuard } from '../../../super/infrastructure/auth/roles.guard';
import { Roles } from '../../../super/infrastructure/auth/roles.decorator';
import { Role } from '../../../super/domain/enums/sRole.enum';

@Controller('partner')
@UseGuards(JwtAuthGuard, RolesGuard)
export class PartnerController {
  constructor(private readonly partnerService: PartnerService) {}

  @Post('registerPartner')
  @Roles(Role.sAdmin)
  async register(@Body() partnerDto: PartnerDTO) {
    return this.partnerService.register(partnerDto);
  }

  @Post('loginPartner')
  async login(@Body() { username, password }) {
    return this.partnerService.login(username, password);
  }
}
