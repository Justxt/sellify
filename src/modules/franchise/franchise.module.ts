import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Franchise } from './domain/entities/franchise.entity';
import { FranchiseController } from './infrastructure/http/franchise.controller';
import { FranchiseService } from './application/services/franchise.service';
import { PartnerRepository } from '../partner/infrastructure/repositories/partner.repository';
import { Partner } from '../partner/domain/entities/partner.entity';
import { FranchiseRepository } from './infrastructure/repositories/franchise.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Franchise, Partner])],
  controllers: [FranchiseController],
  providers: [
    {
      provide: 'IFranchiseService',
      useClass: FranchiseService,
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
  exports: ['IFranchiseService', 'IFranchiseRepository'],
})
export class FranchiseModule {}
