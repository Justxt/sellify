import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { StaffService } from '../../application/services/staff.service';
import { StaffDTO } from '../../application/dto/staff.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { RolesGuard } from '../guards/roles.guard';
import { Roles } from '../decorators/roles.decorator';
import { Role } from 'src/modules/super/domain/enums/sRole.enum';

@Controller('staff')
@UseGuards(JwtAuthGuard, RolesGuard)
export class StaffController {
  constructor(private readonly staffService: StaffService) {}

  @Post('createEmployee')
  @Roles(Role.pAdmin)
  async createStaff(@Body() staffDto: StaffDTO, @Request() req) {
    return this.staffService.register(staffDto, req.user.partnerId);
  }

  @Post('loginEmployee')
  @Roles(Role.pAdmin)
  login(@Body() { username, password }) {
    return this.staffService.login(username, password);
  }
}
