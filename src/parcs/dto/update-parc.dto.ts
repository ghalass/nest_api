import { PartialType } from '@nestjs/mapped-types';
import { CreateParcDto } from './create-parc.dto';
import { Length } from 'nestjs-class-validator';

export class UpdateParcDto extends PartialType(CreateParcDto) {
  @Length(3, 20, { language: 'fr' })
  name: string;
}
