import { ValidationPipe } from '@nestjs/common';
import {
  HttpAdapterHost,
  NestFactory
} from '@nestjs/core';
import {
  DocumentBuilder,
  SwaggerModule
} from '@nestjs/swagger';
import { config } from 'aws-sdk';
import { AppModule } from './app.module';
import { PrismaClientExceptionFilter } from './prisma-client-exception.filter';

async function bootstrap() {
  config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey:
      process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
  });
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true }),
  );

  const { httpAdapter } = app.get(
    HttpAdapterHost,
  );
  app.useGlobalFilters(
    new PrismaClientExceptionFilter(httpAdapter),
  );

  const configOpenAPI = new DocumentBuilder()
    .setTitle('Eccomerce API')
    .setDescription(
      'Eccomcerce API using Nestjs + Prisma',
    )
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(
    app,
    configOpenAPI,
  );
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
