import { sAdmin } from '../../domain/entities/sAdmin.entity';
import { sAdminDTO } from '../dto/sAdmin.dto';

export interface IAuthService {
  sAdminRegister(sAdminRegisterDto: sAdminDTO): Promise<sAdmin>;
  sAdminLogin(
    username: string,
    password: string,
  ): Promise<{ access_token: string }>;
}
