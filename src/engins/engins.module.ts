import { Module } from '@nestjs/common';
import { EnginsService } from './engins.service';
import { EnginsController } from './engins.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Engin } from './entities/engin.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Engin])],
  controllers: [EnginsController],
  providers: [EnginsService],
})
export class EnginsModule {}
