import {
  Controller,
  Post,
  Body,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true })) // Enables validation
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto.email, loginDto.password);
  }

  @Post('register')
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true })) // Enables validation
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }
}
