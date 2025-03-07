import { Length } from 'nestjs-class-validator';

export class CreateEnginDto {
  @Length(3, 20, { language: 'fr' })
  name: string;
}
