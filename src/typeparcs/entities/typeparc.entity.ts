import { Parc } from 'src/parcs/entities/parc.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
@Unique(['name'])
export class Typeparc {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  // Définition de la relation OneToMany
  @OneToMany(() => Parc, (parc) => parc.typeparc)
  parcs: Parc[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
