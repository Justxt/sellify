import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FindOptionsWhere } from 'typeorm';
import { Franchise } from '../../domain/entities/franchise.entity';
import { IFranchiseRepository } from '../../domain/interfaces/ifranchise.repository';

@Injectable()
export class FranchiseRepository implements IFranchiseRepository {
  constructor(
    @InjectRepository(Franchise)
    private readonly repository: Repository<Franchise>,
  ) {}

  async save(franchise: Franchise): Promise<Franchise> {
    return this.repository.save(franchise);
  }

  async findByName(name: string): Promise<Franchise | undefined> {
    const franchise = await this.repository.findOne({ where: { name } });
    return franchise ?? undefined;
  }

  async findById(
    id: string,
    relations: string[] = [],
  ): Promise<Franchise | undefined> {
    // Siempre incluir la relación con partner
    const allRelations = [...new Set([...relations, 'partner'])];
    const franchise = await this.repository.findOne({
      where: { id },
      relations: allRelations,
    });
    return franchise ?? undefined;
  }

  async findByPartnerId(partnerId: string): Promise<Franchise[]> {
    return this.repository.find({
      where: { partner: { id: partnerId } },
    });
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
