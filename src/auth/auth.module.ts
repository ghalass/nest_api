import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module'; // 👈 Import UserModule
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    UserModule, // 👈 Ensure UserModule is imported
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'secret', // Use env for security
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
