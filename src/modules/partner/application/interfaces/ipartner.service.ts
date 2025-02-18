import { PartnerUser } from '../../domain/entities/partnerUser.entity';
import { PartnerDTO } from '../dto/partner.dto';

export interface IPartnerService {
  register(partnerDto: PartnerDTO): Promise<PartnerUser>;
  login(username: string, password: string): Promise<{ access_token: string }>;
}
