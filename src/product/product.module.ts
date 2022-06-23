import { Module } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { UploadFile } from './uploadFile.service';

@Module({
  controllers: [ProductController],
  providers: [ProductService, PrismaService, UploadFile],
})
export class ProductModule {}
