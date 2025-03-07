import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { Site } from './entities/site.entity';
import { CreateSiteDto } from './dto/create-site.dto';
import { UpdateSiteDto } from './dto/update-site.dto';

@Injectable()
export class SitesService {
  constructor(
    @InjectRepository(Site)
    private siteRepository: Repository<Site>,
  ) {}

  async create(createSiteDto: CreateSiteDto): Promise<Site> {
    const site = await this.siteRepository.findOne({
      where: { name: createSiteDto.name },
    });
    if (site)
      throw new BadRequestException(
        `Le site avec le nom "${createSiteDto.name}" existe déjà.`,
      );

    const newSite = this.siteRepository.create(createSiteDto);
    return await this.siteRepository.save(newSite);
  }

  async findAll(): Promise<Site[]> {
    return await this.siteRepository.find();
  }

  async findOne(id: number): Promise<Site | string> {
    const site = await this.siteRepository.findOne({ where: { id } });
    if (!site) throw new BadRequestException(`Site n'existe pas.`);
    return site;
  }

  async update(
    id: number,
    updateSiteDto: UpdateSiteDto,
  ): Promise<Site | string> {
    const site = await this.siteRepository.findOne({ where: { id } });
    if (!site) throw new BadRequestException(`Site n'existe pas.`);

    const site2 = await this.siteRepository.findOne({
      where: { id: Not(id), name: updateSiteDto.name },
    });
    if (site2) throw new BadRequestException(`Nom du Site dèjà utilisé.`);

    await this.siteRepository.update(id, updateSiteDto);
    const updatedSite = await this.siteRepository.findOne({ where: { id } });
    return updatedSite || `Site n'existe pas.`;
  }

  async remove(id: number): Promise<string> {
    const site = await this.siteRepository.findOne({ where: { id } });
    if (!site) throw new BadRequestException(`Site n'existe pas.`);

    const result = await this.siteRepository.delete(id);
    return result.affected
      ? `Site supprimé avec succès.`
      : `Failed to delete Site #${id}`;
  }
}
