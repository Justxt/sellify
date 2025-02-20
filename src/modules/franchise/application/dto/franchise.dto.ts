import { IsNotEmpty, IsString } from 'class-validator';

export class CreateFranchiseDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  location: string;
}
