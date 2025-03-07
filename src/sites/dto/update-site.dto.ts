import { PartialType } from '@nestjs/mapped-types';
import { CreateSiteDto } from './create-site.dto';
import { Length } from 'nestjs-class-validator';

export class UpdateSiteDto extends PartialType(CreateSiteDto) {
  @Length(3, 20, { language: 'fr' })
  name: string;
}
