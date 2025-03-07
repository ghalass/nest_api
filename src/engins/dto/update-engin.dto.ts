import { PartialType } from '@nestjs/mapped-types';
import { CreateEnginDto } from './create-engin.dto';
import { Length } from 'nestjs-class-validator';

export class UpdateEnginDto extends PartialType(CreateEnginDto) {
  @Length(3, 20, { language: 'fr' })
  name: string;
}
