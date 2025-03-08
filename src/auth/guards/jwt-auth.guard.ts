import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private jwtService: JwtService) {
    super();
  }

  // You can override the `handleRequest` method to modify how user data is added to the request object.
  handleRequest(err, user) {
    if (user) {
      // Assuming the user object returned by the JWT validation contains a `role` field.
      return { ...user, role: user.role }; // Attach the user's role to the request object
    }
    return null;
  }
}
