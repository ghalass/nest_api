import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Active la validation DTO avec transformation des données
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Ignore les champs non définis dans DTO
      forbidNonWhitelisted: true, // Erreur si un champ non prévu est envoyé
      transform: true, // Convertit les données entrantes en types DTO
    }),
  );

  await app.listen(process.env.PORT ?? 3000).then(() => {
    console.log(`Running on : http://localhost:${process.env.PORT}`);
  });
}
bootstrap();
