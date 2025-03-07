import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TypeparcsService } from './typeparcs.service';
import { CreateTypeparcDto } from './dto/create-typeparc.dto';
import { UpdateTypeparcDto } from './dto/update-typeparc.dto';

@Controller('typeparcs')
export class TypeparcsController {
  constructor(private readonly typeparcsService: TypeparcsService) {}

  @Post()
  create(@Body() createTypeparcDto: CreateTypeparcDto) {
    return this.typeparcsService.create(createTypeparcDto);
  }

  @Get()
  findAll() {
    return this.typeparcsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.typeparcsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTypeparcDto: UpdateTypeparcDto,
  ) {
    return this.typeparcsService.update(+id, updateTypeparcDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.typeparcsService.remove(+id);
  }
}
