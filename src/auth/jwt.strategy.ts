import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from './interfaces/jwt-payload.interface'; // Import the JwtPayload interface
import { PrismaService } from '../prisma/prisma.service';
import { UnauthorizedException } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET, // Your secret key here
    });
  }

  // Using the JwtPayload interface for the validated payload
  async validate(payload: JwtPayload) {
    // Retrieve the user from the database
    const user = await this.prisma.user.findUnique({
      where: { email: payload.email },
    });

    // Check if the user is not found (null)
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    // Return the user object along with role information to be attached to the request
    return {
      userId: user.id,
      email: user.email,
      role: user.role,
      active: user.active,
    };
  }
}
