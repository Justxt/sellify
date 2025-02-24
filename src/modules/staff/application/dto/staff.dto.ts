import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  ArrayNotEmpty,
  IsUUID,
} from 'class-validator';
import { Role } from '../../domain/enums/staffRole.enum';

export class StaffDTO {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  password: string;

  @IsEnum(Role)
  role: Role;

  @ArrayNotEmpty({ message: 'Se bebe asignar al menos una franquicia' })
  @IsArray()
  @IsUUID('4', { each: true })
  franchiseIds: string[];

  @IsOptional()
  @IsUUID()
  @IsNotEmpty()
  partnerId?: string;}

