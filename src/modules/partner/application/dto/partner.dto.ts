import { IsNotEmpty, IsEnum, IsString } from 'class-validator';
import { BusinessType } from '../../domain/enums/business-type.enum';
import { Role } from 'src/modules/super/domain/enums/sRole.enum';

export class PartnerDTO {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  @IsString()
  partnerName: string;

  @IsNotEmpty()
  @IsEnum(BusinessType)
  businessType: BusinessType;

  @IsEnum(Role)
  role: Role;
}
