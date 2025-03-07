import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTypeparcDto } from './dto/create-typeparc.dto';
import { UpdateTypeparcDto } from './dto/update-typeparc.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Typeparc } from './entities/typeparc.entity';
import { Not, Repository } from 'typeorm';

@Injectable()
export class TypeparcsService {
  constructor(
    @InjectRepository(Typeparc)
    private typeparcRepository: Repository<Typeparc>,
  ) {}

  async create(createTypeparcDto: CreateTypeparcDto) {
    const typeparc = await this.typeparcRepository.findOne({
      where: { name: createTypeparcDto.name },
    });
    if (typeparc)
      throw new BadRequestException(
        `Le Typeparc avec le nom "${createTypeparcDto.name}" existe déjà.`,
      );

    const newTypeparc = this.typeparcRepository.create(createTypeparcDto);
    return await this.typeparcRepository.save(newTypeparc);
  }

  async findAll() {
    return await this.typeparcRepository.find();
  }

  async findOne(id: number) {
    const typeparc = await this.typeparcRepository.findOne({ where: { id } });
    if (!typeparc) throw new BadRequestException(`Typeparc n'existe pas.`);
    return typeparc;
  }

  async update(id: number, updateTypeparcDto: UpdateTypeparcDto) {
    const typeparc = await this.typeparcRepository.findOne({ where: { id } });
    if (!typeparc) throw new BadRequestException(`Typeparc n'existe pas.`);

    const typeparc2 = await this.typeparcRepository.findOne({
      where: { id: Not(id), name: updateTypeparcDto.name },
    });
    if (typeparc2)
      throw new BadRequestException(`Nom du Typeparc dèjà utilisé.`);

    await this.typeparcRepository.update(id, updateTypeparcDto);
    const updatedTypeparc = await this.typeparcRepository.findOne({
      where: { id },
    });
    return updatedTypeparc || `Typeparc n'existe pas.`;
  }

  async remove(id: number) {
    const typeparc = await this.typeparcRepository.findOne({ where: { id } });
    if (!typeparc) throw new BadRequestException(`Typeparc n'existe pas.`);

    const result = await this.typeparcRepository.delete(id);
    return result.affected
      ? `Typeparc supprimé avec succès.`
      : `Failed to delete Typeparc #${id}`;
  }
}
