import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CategoryDto } from './dto';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  async createCategory(categoryDto: CategoryDto) {
    return await this.prisma.category.create({
      data: {
        name: categoryDto.name,
        abbreviation: categoryDto.abbreviation,
      },
    });
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
    return await this.prisma.category.update({
      where: {
        id: id,
      },
      data: {
        name: categoryDTO.name,
        abbreviation: categoryDTO.abbreviation,
      },
    });
  }
}
