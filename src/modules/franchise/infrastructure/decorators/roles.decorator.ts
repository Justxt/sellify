import { SetMetadata } from '@nestjs/common';
import { Role } from '../../../super/domain/enums/sRole.enum';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
