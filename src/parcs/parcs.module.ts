import { Module } from '@nestjs/common';
import { ParcsService } from './parcs.service';
import { ParcsController } from './parcs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Parc } from './entities/parc.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Parc])],
  controllers: [ParcsController],
  providers: [ParcsService],
})
export class ParcsModule {}
