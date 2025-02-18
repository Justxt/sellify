import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './infrastructure/http/auth.controller';
import { JwtStrategy } from './infrastructure/auth/jwt.strategy';
import jwtConfig from './infrastructure/auth/jwt.config';
import { JwtAuthGuard } from './infrastructure/auth/jwt-auth.guard';
import { RolesGuard } from './infrastructure/auth/roles.guard';
import { sAdmin } from './domain/entities/sAdmin.entity';
import { PartnerModule } from '../partner/partner.module';
import { sAdminRepositoryImpl } from './infrastructure/repositories/sAdminRepositoryImpl';
import { AuthService } from './application/services/auth.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([sAdmin]),
    JwtModule.register(jwtConfig),
    PartnerModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    JwtAuthGuard,
    RolesGuard,
    sAdminRepositoryImpl,
  ],
  exports: [AuthService, JwtAuthGuard],
})
export class sAdminModule {}
