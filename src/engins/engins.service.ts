import { Injectable } from '@nestjs/common';
import { CreateEnginDto } from './dto/create-engin.dto';
import { UpdateEnginDto } from './dto/update-engin.dto';

@Injectable()
export class EnginsService {
  create(createEnginDto: CreateEnginDto) {
    return 'This action adds a new engin';
  }

  findAll() {
    return `This action returns all engins`;
  }

  findOne(id: number) {
    return `This action returns a #${id} engin`;
  }

  update(id: number, updateEnginDto: UpdateEnginDto) {
    return `This action updates a #${id} engin`;
  }

  remove(id: number) {
    return `This action removes a #${id} engin`;
  }
}
