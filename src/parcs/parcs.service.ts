import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateParcDto } from './dto/create-parc.dto';
import { UpdateParcDto } from './dto/update-parc.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Parc } from './entities/parc.entity';
import { Not, Repository } from 'typeorm';

@Injectable()
export class ParcsService {
  constructor(
    @InjectRepository(Parc)
    private parcRepository: Repository<Parc>,
  ) {}

  async create(createParcDto: CreateParcDto) {
    const parc = await this.parcRepository.findOne({
      where: { name: createParcDto.name },
    });
    if (parc)
      throw new BadRequestException(
        `Le Parc avec le nom "${createParcDto.name}" existe déjà.`,
      );

    const newParc = this.parcRepository.create(createParcDto);
    return await this.parcRepository.save(newParc);
  }

  async findAll() {
    return await this.parcRepository.find();
  }

  async findOne(id: number) {
    const parc = await this.parcRepository.findOne({ where: { id } });
    if (!parc) throw new BadRequestException(`Parc n'existe pas.`);
    return parc;
  }

  async update(id: number, updateParcDto: UpdateParcDto) {
    const parc = await this.parcRepository.findOne({ where: { id } });
    if (!parc) throw new BadRequestException(`Parc n'existe pas.`);

    const parc2 = await this.parcRepository.findOne({
      where: { id: Not(id), name: updateParcDto.name },
    });
    if (parc2) throw new BadRequestException(`Nom du Parc dèjà utilisé.`);

    await this.parcRepository.update(id, updateParcDto);
    const updatedParc = await this.parcRepository.findOne({
      where: { id },
    });
    return updatedParc || `Parc n'existe pas.`;
  }

  async remove(id: number) {
    const parc = await this.parcRepository.findOne({ where: { id } });
    if (!parc) throw new BadRequestException(`Parc n'existe pas.`);

    const result = await this.parcRepository.delete(id);
    return result.affected
      ? `Parc supprimé avec succès.`
      : `Failed to delete Parc #${id}`;
  }
}
