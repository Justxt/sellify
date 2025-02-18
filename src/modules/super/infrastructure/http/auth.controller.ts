import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from '../../application/services/auth.service';
import { sAdminDTO } from '../../application/dto/sAdmin.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sRegister')
  async sRegister(@Body() sRegisterDto: sAdminDTO) {
    return this.authService.sAdminRegister(sRegisterDto);
  }

  @Post('sLogin')
  async sLogin(@Body() { username, password }) {
    return this.authService.sAdminLogin(username, password);
  }
}