import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class LoginDto {
  @IsEmail({}, { message: 'Invalid email format' }) // Ensures it's a valid email
  @IsNotEmpty({ message: 'Email is required' }) // Ensures it's not empty
  email: string;

  @IsNotEmpty({ message: 'Password is required' }) // Ensures it's not empty
  @MinLength(6, { message: 'Password must be at least 6 characters' }) // Enforces minimum length
  password: string;
}
