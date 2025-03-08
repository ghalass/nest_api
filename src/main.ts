import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const allowedOrigins = process.env.ALLOWED_ORIGIN
    ? process.env.ALLOWED_ORIGIN.split(',').map((origin) => origin.trim()) // Transforme en tableau et supprime les espaces
    : '*'; // Si aucune origine définie, autorise tout

  app.enableCors({
    origin: allowedOrigins,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Autorise les cookies/sessions si nécessaire
  });

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
