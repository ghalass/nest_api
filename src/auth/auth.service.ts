import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user; // Exclude password from response
      return result;
    }
    throw new UnauthorizedException('Invalid credentials');
  }

  async login(email: string, password: string) {
    const user = await this.validateUser(email, password); // 👈 Now it exists
    const payload = { email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
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
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
