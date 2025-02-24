import { StaffDTO } from '../dto/staff.dto';
import { Staff } from '../../domain/entities/staff.entity';
import { UUID } from 'crypto';

export interface IStaffService {
  register(staffDto: StaffDTO, currentPartnerId: UUID): Promise<Staff>;
  login(username: string, password: string): Promise<{ access_token: string }>;
}