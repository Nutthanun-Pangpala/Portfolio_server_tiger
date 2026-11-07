import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';
import { AppModule } from './app.module.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const origins = (process.env.FRONTEND_URL ?? 'https://portfolio-client-tiger.vercel.app')
    .split(',')
    .map((s) => s.trim().replace(/\/$/, ''));

  app.use(cookieParser());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.enableCors({
  origin: [
    process.env.FRONTEND_URL ?? 'https://portfolio-client-tiger.vercel.app',
  ],
  credentials: true,
});

  await app.listen(process.env.PORT ?? 5555);
}
bootstrap();