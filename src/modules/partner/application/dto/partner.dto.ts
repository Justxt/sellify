import { IsNotEmpty, IsEnum, IsString } from 'class-validator';
import { Role } from '../../../super/domain/enums/sRole.enum';

export class PartnerDTO {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  @IsString()
  partnerName: string;

  @IsEnum(Role)
  role: Role;
}
