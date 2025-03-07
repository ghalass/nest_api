import { Length } from 'nestjs-class-validator';

export class CreateParcDto {
  @Length(3, 20, { language: 'fr' })
  name: string;
}
