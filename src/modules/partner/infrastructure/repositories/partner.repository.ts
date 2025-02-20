import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FindOptionsWhere } from 'typeorm';
import { Partner } from '../../domain/entities/partner.entity';
import { IPartnerRepository } from '../../application/interfaces/ipartner.repository';

@Injectable()
export class PartnerRepository implements IPartnerRepository {
  constructor(
    @InjectRepository(Partner)
    private readonly repository: Repository<Partner>,
  ) {}

  findByName(name: string): Promise<Partner | undefined> {
    return this.repository
      .findOne({ where: { name } })
      .then((result) => result ?? undefined);
  }

  findById(id: string): Promise<Partner | undefined> {
    const where: FindOptionsWhere<Partner> = { id: id as any };
    return this.repository
      .findOne({ where })
      .then((result) => result ?? undefined);
  }

  save(partner: Partner): Promise<Partner> {
    return this.repository.save(partner);
  }
}
