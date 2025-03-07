import { Length } from 'nestjs-class-validator';

export class CreateTypeparcDto {
  @Length(3, 20, { language: 'fr' })
  name: string;
}
