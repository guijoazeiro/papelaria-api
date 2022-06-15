import {
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
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
      const product =
        await this.prisma.product.findUnique({
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
        });
      if (!product) {
        return new HttpException(
          'Product not found',
          HttpStatus.NOT_FOUND,
        );
      }
      return product;
    } catch (error) {
      return error;
    }
  }

  async getProductsByCategory(category: string) {
    try {
      const products =
        await this.prisma.product.findMany({
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

      if (!products) {
        return new HttpException(
          'Products not found',
          HttpStatus.NOT_FOUND,
        );
      }
    } catch (error) {
      return error;
    }
  }

  async getProductsBySupplier(supplier: string) {
    try {
      const products =
        await this.prisma.product.findMany({
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
      if (!products) {
        return new HttpException(
          'Products not found',
          HttpStatus.NOT_FOUND,
        );
      }
    } catch (error) {
      return error;
    }
  }

  async getProductsBySearch(search: string) {
    try {
      const products =
        await this.prisma.product.findMany({
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
      if (!products) {
        return new HttpException(
          'Product not found',
          HttpStatus.NOT_FOUND,
        );
      }
      return products;
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

  async deleteProduct(id: string) {
    return this.prisma.product.delete({
      where: {
        id,
      },
    });
  }
}
