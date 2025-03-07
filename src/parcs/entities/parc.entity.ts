import { Typeparc } from 'src/typeparcs/entities/typeparc.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
@Unique(['name'])
export class Parc {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  // Définition de la relation ManyToOne
  @ManyToOne(() => Typeparc, (typeparc) => typeparc.parcs)
  @JoinColumn({ name: 'typeparcId' }) // Définit la colonne de clé étrangère
  typeparc: Typeparc;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
