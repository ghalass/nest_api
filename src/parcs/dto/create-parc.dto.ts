import { IsInt, Length } from 'class-validator';

export class CreateParcDto {
  @Length(3, 20)
  name: string;

  @IsInt()
  typeparcId: number; // ID du Typeparc auquel le parc appartient
}
