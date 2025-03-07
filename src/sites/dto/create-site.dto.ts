import { Length } from 'nestjs-class-validator';

export class CreateSiteDto {
  @Length(3, 20, { language: 'fr' })
  name: string;
}
