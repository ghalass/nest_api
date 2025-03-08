import { PartialType } from '@nestjs/mapped-types';
import { CreateParcDto } from './create-parc.dto';
import { IsInt, IsOptional, IsString, Length } from 'class-validator';

export class UpdateParcDto extends PartialType(CreateParcDto) {
  @IsString()
  @IsOptional() // Le nom peut être facultatif pour une mise à jour partielle
  @Length(3, 100)
  name?: string;

  @IsInt()
  @IsOptional() // Le typeparcId peut être facultatif pour une mise à jour partielle
  typeparcId?: number; // L'ID du typeparc peut être mis à jour
}
