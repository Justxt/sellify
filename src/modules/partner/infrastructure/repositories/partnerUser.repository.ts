import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PartnerUser } from '../../domain/entities/partnerUser.entity';
import { IPartnerUserRepository } from '../../application/interfaces/ipartnerUser.repository';

@Injectable()
export class PartnerUserRepository implements IPartnerUserRepository {
  constructor(
    @InjectRepository(PartnerUser)
    private readonly repository: Repository<PartnerUser>,
  ) {}

  findByUsername(username: string): Promise<PartnerUser | undefined> {
    return this.repository
      .findOne({ where: { username } })
      .then((result) => result ?? undefined);
  }

  findById(id: string): Promise<PartnerUser | undefined> {
    return this.repository
      .findOne({ where: { id } })
      .then((result) => result ?? undefined);
  }

  save(partnerUser: PartnerUser): Promise<PartnerUser> {
    return this.repository.save(partnerUser);
  }
}
