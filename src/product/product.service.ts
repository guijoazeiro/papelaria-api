import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { ProductDTO } from './dto';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async create(dto: ProductDTO, path: string) {
    return this.prisma.product.create({
      data: {
        ...dto,
        image: path,
      },
    });
  }
}
