import { sAdmin } from '../../domain/entities/sAdmin.entity';

export interface sAdminRepository {
  findOneByUsername(username: string): Promise<sAdmin | undefined>;
  save(sAdmin: sAdmin): Promise<sAdmin>;
}
