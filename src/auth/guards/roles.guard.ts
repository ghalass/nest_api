import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator'; // Import roles metadata key

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<string[]>(
      ROLES_KEY,
      context.getHandler(),
    );

    if (!requiredRoles) {
      return true; // If no roles are required, allow access
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user; // Extract the user from the request
    // check if user exist
    if (!user) {
      throw new ForbiddenException('Utilisateur non trouvé');
    }
    // check if user is active
    if (!user?.active) {
      throw new ForbiddenException(
        'Contactez un administrateur pour activer votre compte.',
      );
    }

    // Check if the user's role is one of the required roles
    if (!requiredRoles.includes(user.role)) {
      throw new ForbiddenException(
        "Vous n'avez pas l'autorisation d'accéder à cette ressource",
      );
    }

    return true;
  }
}
