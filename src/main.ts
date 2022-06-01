import { ValidationPipe } from '@nestjs/common';
import {
  HttpAdapterHost,
  NestFactory,
} from '@nestjs/core';
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

  await app.listen(3000);
}
bootstrap();
