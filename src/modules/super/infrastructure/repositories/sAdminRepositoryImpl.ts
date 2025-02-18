import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { sAdmin } from '../../domain/entities/sAdmin.entity';
import { sAdminRepository } from '../../application/ports/sAdminRepository.interface';

@Injectable()
export class sAdminRepositoryImpl implements sAdminRepository {
  constructor(
    @InjectRepository(sAdmin)
    private readonly repository: Repository<sAdmin>,
  ) {}

  async findOneByUsername(username: string): Promise<sAdmin | undefined> {
    const sAdmin = await this.repository.findOne({ where: { username } });
    return sAdmin ?? undefined;
  }

  save(sAdmin: sAdmin): Promise<sAdmin> {
    return this.repository.save(sAdmin);
  }
}
