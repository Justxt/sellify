import { IsNotEmpty, IsEnum, IsString } from 'class-validator';
import { Role } from '../../domain/enums/sRole.enum';

export class sAdminDTO {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  password: string;

  @IsEnum(Role)
  role: Role;
}
