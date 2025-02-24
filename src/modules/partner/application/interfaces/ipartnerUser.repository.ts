import { PartnerUser } from '../../domain/entities/partnerUser.entity';

export interface IPartnerUserRepository {
  findByUsername(username: string): Promise<PartnerUser | undefined>;
  findById(id: string): Promise<PartnerUser | undefined>;
  save(partnerUser: PartnerUser): Promise<PartnerUser>;
}
