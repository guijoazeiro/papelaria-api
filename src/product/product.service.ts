import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { createProductDTO } from './dto';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async create(dto: createProductDTO) {
    return this.prisma.product.create({
      data: {
        name: dto.name,
        url: dto.url,
        price: dto.price,
        stock: dto.stock,
        description: dto.description,
        category: {
          connect: {
            id: dto.category,
          },
        },
        supplier: {
          connect: {
            id: dto.supplier,
          },
        },
      },
      include: {
        category: {
          select: {
            name: true,
          },
        },
        supplier: {
          select: {
            name: true,
          },
        },
      },
    });
  }

  async uploadImage(id: string, file: string) {
    return this.prisma.product.update({
      where: {
        id,
      },
      data: {
        image: file,
      },
    });
  }
}
