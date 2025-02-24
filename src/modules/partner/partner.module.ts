import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import jwtConfig from 'src/modules/super/infrastructure/security/jwt.config';
import { PartnerUser } from './domain/entities/partnerUser.entity';
import { PartnerController } from './infrastructure/http/partner.controller';
import { PartnerService } from './application/services/partner.service';
import { Partner } from './domain/entities/partner.entity';
import { PartnerRepository } from './infrastructure/repositories/partner.repository';
import { PartnerUserRepository } from './infrastructure/repositories/partnerUser.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([PartnerUser, Partner]),
    JwtModule.register(jwtConfig),
  ],
  controllers: [PartnerController],
  providers: [
    PartnerService,
    { provide: 'IPartnerRepository', useClass: PartnerRepository },
    { provide: 'IPartnerUserRepository', useClass: PartnerUserRepository },
  ],
  exports: ['IPartnerRepository', PartnerService],
})
export class PartnerModule {}
