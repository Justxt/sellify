import { CreateFranchiseDto } from '../../application/dto/franchise.dto';
import { Franchise } from '../entities/franchise.entity';

export interface IFranchiseService {
  create(
    createFranchiseDto: CreateFranchiseDto,
    partnerId: string,
  ): Promise<Franchise>;
  findByPartnerId(partnerId: string): Promise<Franchise[]>;
  delete(id: string, partnerId: string): Promise<void>;
}
