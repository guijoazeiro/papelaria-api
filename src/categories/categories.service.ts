import { Injectable } from '@nestjs/common';
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
      throw new Error(error);
    }
  }

  async getCategories() {
    try {
      return await this.prisma.category.findMany();
    } catch (error) {
      throw new Error(error);
    }
  }
}
