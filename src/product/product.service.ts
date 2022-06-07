import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import {
  createProductDTO,
  updateProductDTO,
} from './dto';

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

  async getProducts() {
    try {
      return await this.prisma.product.findMany({
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
    } catch (error) {
      return error;
    }
  }

  async getProductByURL(url: string) {
    try {
      return await this.prisma.product.findUnique(
        {
          where: {
            url,
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
        },
      );
    } catch (error) {
      return error;
    }
  }

  async getProductsByCategory(category: string) {
    try {
      return await this.prisma.product.findMany({
        where: {
          category: {
            id: category,
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
    } catch (error) {
      return error;
    }
  }

  async getProductsBySupplier(supplier: string) {
    try {
      return await this.prisma.product.findMany({
        where: {
          supplier: {
            id: supplier,
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
    } catch (error) {
      return error;
    }
  }

  async getProductsBySearch(search: string) {
    try {
      return await this.prisma.product.findMany({
        where: {
          OR: [
            {
              name: {
                contains: search,
              },
            },
            {
              description: {
                contains: search,
              },
            },
          ],
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
    } catch (error) {
      return error;
    }
  }

  async updateProduct(
    id: string,
    dto: updateProductDTO,
  ) {
    return this.prisma.product.update({
      where: {
        id,
      },
      data: {
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
}
