import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { sAdmin } from '../../domain/entities/sAdmin.entity';
import { sAdminDTO } from '../dto/sAdmin.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(sAdmin)
    private userRepository: Repository<sAdmin>,
    private jwtService: JwtService,
  ) {}

  async sAdminRegister(sAdminRegisterDto: sAdminDTO): Promise<sAdmin> {
    const existingUser = await this.userRepository.findOne({ 
      where: { username: sAdminRegisterDto.username } 
    });
    
    if (existingUser) {
      throw new ConflictException('SAdmin ya registrado');
    }
  
    const hashedPassword = await bcrypt.hash(sAdminRegisterDto.password, 10);
    
    const user = this.userRepository.create({
      ...sAdminRegisterDto,
      password: hashedPassword,
    });
  
    return this.userRepository.save(user);
  }

  async sAdminLogin(username: string, password: string): Promise<{ access_token: string }> {
    const user = await this.userRepository.findOne({ where: { username } });
    
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const payload = {
      sub: user.id,
      username: user.username,
      role: user.role,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
