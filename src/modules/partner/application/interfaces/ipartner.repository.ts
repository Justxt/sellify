import { Partner } from '../../domain/entities/partner.entity';

export interface IPartnerRepository {
  findByName(name: string): Promise<Partner | undefined>;
  findById(id: string): Promise<Partner | undefined>;
  save(partner: Partner): Promise<Partner>;
}
