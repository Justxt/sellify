import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { BusinessType } from 'src/modules/partner/domain/enums/business-type.enum';

export class CreateFranchiseDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  location: string;
}
