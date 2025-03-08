import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SitesModule } from './sites/sites.module';
import { ConfigModule } from '@nestjs/config';
import { TypeparcsModule } from './typeparcs/typeparcs.module';
import { ParcsModule } from './parcs/parcs.module';
import { EnginsModule } from './engins/engins.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 8889,
      username: 'root',
      password: 'root',
      database: 'nest_api',
      autoLoadEntities: true,
      synchronize: true,
    }),
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true, // Permet d'utiliser partout sans réimporter
    }),
    SitesModule,
    TypeparcsModule,
    ParcsModule,
    EnginsModule,
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
