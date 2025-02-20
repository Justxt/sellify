import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
    return this.repository
      .findOne({
        where: { name },
        relations: ['partner'],
      })
      .then((result) => result ?? undefined);
  }

  async findById(id: string): Promise<Franchise | undefined> {
    return this.repository
      .findOne({
        where: { id },
        relations: ['partner'],
      })
      .then((result) => result ?? undefined);
  }

  async findByPartnerId(partnerId: string): Promise<Franchise[]> {
    return this.repository.find({
      where: { partner: { id: partnerId } },
      relations: ['partner'],
    });
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
