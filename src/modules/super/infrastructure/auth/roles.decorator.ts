import { SetMetadata } from '@nestjs/common';
import { Role } from '../../domain/enums/sRole.enum';

export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);
