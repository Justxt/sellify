import { Franchise } from '../entities/franchise.entity';

export interface IFranchiseRepository {
  save(franchise: Franchise): Promise<Franchise>;
  findByName(name: string): Promise<Franchise | undefined>;
  findById(id: string): Promise<Franchise | undefined>;
  findByPartnerId(partnerId: string): Promise<Franchise[]>;
  delete(id: string): Promise<void>;
}
