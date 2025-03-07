import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ParcsService } from './parcs.service';
import { CreateParcDto } from './dto/create-parc.dto';
import { UpdateParcDto } from './dto/update-parc.dto';

@Controller('parcs')
export class ParcsController {
  constructor(private readonly parcsService: ParcsService) {}

  @Post()
  create(@Body() createParcDto: CreateParcDto) {
    return this.parcsService.create(createParcDto);
  }

  @Get()
  findAll() {
    return this.parcsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.parcsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateParcDto: UpdateParcDto) {
    return this.parcsService.update(+id, updateParcDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.parcsService.remove(+id);
  }
}
