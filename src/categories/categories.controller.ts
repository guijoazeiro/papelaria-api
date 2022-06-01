import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoryDto } from './dto';

@Controller('categories')
export class CategoriesController {
  constructor(
    private readonly categoriesService: CategoriesService,
  ) {}

  @Post()
  async createCategory(
    @Body() categoryDTO: CategoryDto,
  ) {
    return await this.categoriesService.createCategory(
      categoryDTO,
    );
  }

  @Get()
  async getCategories() {
    return await this.categoriesService.getCategories();
  }

  @Get('/:id')
  async getCategory(@Param('id') id: string) {
    return await this.categoriesService.getCategory(
      id,
    );
  }

  @Put('/:id')
  async updateCategory(
    @Param('id') id: string,
    @Body() categoryDTO: CategoryDto,
  ) {
    {
      return await this.categoriesService.updateCategory(
        id,
        categoryDTO,
      );
    }
  }
}
