import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // 👈 Makes this module available everywhere without imports
@Module({
  providers: [PrismaService],
  exports: [PrismaService], // 👈 Export so other modules can use it
})
export class PrismaModule {}
