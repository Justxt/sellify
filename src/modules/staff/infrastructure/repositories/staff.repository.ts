import { Injectable } from '@nestjs/common';
import { IStaffRepository } from '../../application/interfaces/istaff.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Staff } from '../../domain/entities/staff.entity';
import { FindOptionsWhere, Repository } from 'typeorm';

Injectable();
export class StaffRepository implements IStaffRepository {
  constructor(
    @InjectRepository(Staff)
    private readonly repository: Repository<Staff>,
  ) {}

  findAll(): Promise<Staff[]> {
    return this.repository.find();
  }

  findByUsername(username: string): Promise<Staff | undefined> {
    return this.repository
      .findOne({ where: { username } })
      .then((result) => result ?? undefined);
  }

  findById(id: string): Promise<Staff | undefined> {
    const where: FindOptionsWhere<Staff> = { id: id as string };
    return this.repository
      .findOne({ where })
      .then((result) => result ?? undefined);
  }

  update(id: string, staff: Staff): Promise<Staff> {
    return this.repository.save({ ...staff, id: id as string });
  }

  delete(id: string): Promise<void> {
    return this.repository.delete(id as string).then(() => undefined);
  }

  save(staff: Staff): Promise<Staff> {
    return this.repository.save(staff);
  }
}
