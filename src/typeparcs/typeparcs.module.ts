import { Module } from '@nestjs/common';
import { TypeparcsService } from './typeparcs.service';
import { TypeparcsController } from './typeparcs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Typeparc } from './entities/typeparc.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Typeparc])],
  controllers: [TypeparcsController],
  providers: [TypeparcsService],
})
export class TypeparcsModule {}
