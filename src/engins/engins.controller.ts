import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EnginsService } from './engins.service';
import { CreateEnginDto } from './dto/create-engin.dto';
import { UpdateEnginDto } from './dto/update-engin.dto';

@Controller('engins')
export class EnginsController {
  constructor(private readonly enginsService: EnginsService) {}

  @Post()
  create(@Body() createEnginDto: CreateEnginDto) {
    return this.enginsService.create(createEnginDto);
  }

  @Get()
  findAll() {
    return this.enginsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.enginsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEnginDto: UpdateEnginDto) {
    return this.enginsService.update(+id, updateEnginDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.enginsService.remove(+id);
  }
}
