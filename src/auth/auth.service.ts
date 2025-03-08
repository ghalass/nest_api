import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import { RegisterDto } from './dto/register.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      // check if user account is active
      if (!user.active) {
        throw new UnauthorizedException(
          'Contactez un administrateur pour activer votre compte.',
        );
      }
      const { password, ...result } = user; // Exclude password from response
      return result;
    }

    throw new UnauthorizedException('Invalid credentials');
  }

  async login(email: string, password: string) {
    const user = await this.validateUser(email, password); // 👈 Now it exists
    const payload = { email: user.email, sub: user.id };

    const loggedUser = await this.prisma.user.update({
      where: { email },
      data: { lastVisite: new Date() },
    });
    const { password: _, ...userWithoutPassword } = loggedUser;

    return {
      token: this.jwtService.sign(payload),
      name: userWithoutPassword.name,
      active: userWithoutPassword.active,
      email: userWithoutPassword.email,
      role: userWithoutPassword.role,
    };
  }

  // Register method
  async register(registerDto: RegisterDto) {
    const { email, password, name } = registerDto;

    // Check if the user already exists
    const existingUser = await this.userService.findByEmail(email);
    if (existingUser) {
      throw new ConflictException('Email already in use');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save the new user
    const newUser = await this.userService.createUser({
      email,
      password: hashedPassword,
      name,
    });

    // Create and return a JWT token
    const payload = { email: newUser.email, sub: newUser.id };

    // Create a new object excluding the password
    const { password: _, ...userWithoutPassword } = newUser;

    return {
      token: this.jwtService.sign(payload),
      name: userWithoutPassword.name,
      active: userWithoutPassword.active,
      email: userWithoutPassword.email,
      role: userWithoutPassword.role,
    };
  }
}
