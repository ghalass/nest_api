import { PartialType } from '@nestjs/mapped-types';
import { CreateTypeparcDto } from './create-typeparc.dto';
import { Length } from 'nestjs-class-validator';

export class UpdateTypeparcDto extends PartialType(CreateTypeparcDto) {
  @Length(3, 20, { language: 'fr' })
  name: string;
}
