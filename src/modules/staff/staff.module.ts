import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Staff } from './domain/entities/staff.entity';
import { JwtModule } from '@nestjs/jwt';
import jwtConfig from './infrastructure/security/jwt.config';
import { StaffController } from './infrastructure/http/staff.controller';
import { StaffService } from './application/services/staff.service';
import { StaffRepository } from './infrastructure/repositories/staff.repository';
import { FranchiseRepository } from '../franchise/infrastructure/repositories/franchise.repository';
import { PartnerRepository } from '../partner/infrastructure/repositories/partner.repository';
import { FranchiseModule } from '../franchise/franchise.module';
import { PartnerModule } from '../partner/partner.module';
import { Franchise } from '../franchise/domain/entities/franchise.entity';
import { Partner } from '../partner/domain/entities/partner.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Staff, Franchise, Partner]),
    JwtModule.register(jwtConfig),
    FranchiseModule,
    PartnerModule,
  ],
  controllers: [StaffController],
  providers: [
    StaffService,
    {
      provide: 'IStaffRepository',
      useClass: StaffRepository,
    },
    {
      provide: 'IFranchiseRepository',
      useClass: FranchiseRepository,
    },
    {
      provide: 'IPartnerRepository',
      useClass: PartnerRepository,
    },
  ],
  exports: [
    'IStaffRepository',
    StaffService,
    'IFranchiseRepository',
    'IPartnerRepository',
  ],
})
export class StaffModule {}
