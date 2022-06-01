import {
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaService } from 'src/database/prisma.service';
import { CategoryDto } from './dto';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  async createCategory(categoryDto: CategoryDto) {
    try {
      return await this.prisma.category.create({
        data: {
          name: categoryDto.name,
          abbreviation: categoryDto.abbreviation,
        },
      });
    } catch (error) {
      if (
        error instanceof
        PrismaClientKnownRequestError
      ) {
        if (error.code === 'P2002') {
          throw new ForbiddenException(
            'Abbreviation taken',
          );
        }
      }
    }
  }

  async getCategories() {
    try {
      return await this.prisma.category.findMany();
    } catch (error) {
      throw new Error(error);
    }
  }

  async getCategory(id: string) {
    try {
      return await this.prisma.category.findUnique(
        {
          where: {
            id: id,
          },
        },
      );
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateCategory(
    id: string,
    categoryDTO: CategoryDto,
  ) {
    try {
      return await this.prisma.category.update({
        where: {
          id: id,
        },
        data: {
          name: categoryDTO.name,
          abbreviation: categoryDTO.abbreviation,
        },
      });
    } catch (error) {
      throw new Error(error);
    }
  }
}
