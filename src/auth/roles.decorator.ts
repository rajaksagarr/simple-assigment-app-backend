import { SetMetadata } from '@nestjs/common';
export const ROLE_KEYS = 'roles';
export type RolesKeys = 'Admin' | 'User';
export const Roles = (...roles: RolesKeys[]) => SetMetadata(ROLE_KEYS, roles);
