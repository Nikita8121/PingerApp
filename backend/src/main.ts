require('dotenv').config({ path: `../${process.env.NODE_ENV}.env` });
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationErrorFilter } from './exceptions';
import { MongoFilter } from './exceptions/mongo-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.useGlobalFilters(
    /* new AllExceptionsFilter(), */ new MongoFilter(),
    new ValidationErrorFilter(),
  );
  app.enableCors({
    origin: ['http://127.0.0.1:5173', 'http://localhost:8000'],
    credentials: true,
  });
  const config = new DocumentBuilder().build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);
  await app.listen(3000);
}
bootstrap();
