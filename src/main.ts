import { ValidationPipe } from '@nestjs/common';
import {
  HttpAdapterHost,
  NestFactory
} from '@nestjs/core';
import {
  DocumentBuilder,
  SwaggerModule
} from '@nestjs/swagger';
import { AppModule } from './app.module';
import { PrismaClientExceptionFilter } from './prisma-client-exception.filter';

async function bootstrap() {
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

  const config = new DocumentBuilder()
    .setTitle('Eccomerce API')
    .setDescription(
      'Eccomcerce API using Nestjs + Prisma',
    )
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(
    app,
    config,
  );
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
