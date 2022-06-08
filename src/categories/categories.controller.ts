import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { RolesGuard } from 'src/auth/guard/role.guard';
import { CategoriesService } from './categories.service';
import { CategoryDto } from './dto';

@Controller('categories')
export class CategoriesController {
  constructor(
    private readonly categoriesService: CategoriesService,
  ) {}

  @UseGuards(JwtGuard, RolesGuard)
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

  @UseGuards(JwtGuard, RolesGuard)
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
