import { SetMetadata } from '@nestjs/common';

// Define the metadata key for roles
export const ROLES_KEY = 'roles';

// The Roles decorator accepts a list of roles as an array of strings
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);
