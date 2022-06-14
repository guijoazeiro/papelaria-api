import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiResponse,
  ApiTags
} from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guard';
import { RolesGuard } from 'src/auth/guard/role.guard';
import { CategoriesService } from './categories.service';
import { CategoryDto } from './dto';

@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
  constructor(
    private readonly categoriesService: CategoriesService,
  ) {}

  @ApiBody({
    type: CategoryDto,
  })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description:
      'The record has been successfully created.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
  })
  @ApiResponse({
    status: 409,
    description: 'Conflict',
  })
  @UseGuards(JwtGuard, RolesGuard)
  @Post()
  async createCategory(
    @Body() categoryDTO: CategoryDto,
  ) {
    return await this.categoriesService.createCategory(
      categoryDTO,
    );
  }

  @ApiResponse({
    status: 200,
    description: 'Data retrieved successfully.',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error',
  })
  @Get()
  async getCategories() {
    return await this.categoriesService.getCategories();
  }

  @ApiResponse({
    status: 200,
    description: 'Data retrieved successfully.',
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found',
  })
  @Get('/:id')
  async getCategory(@Param('id') id: string) {
    return await this.categoriesService.getCategory(
      id,
    );
  }

  @ApiBody({
    type: CategoryDto,
  })
  @ApiBearerAuth()
  @ApiResponse({
    status: 201,
    description:
      'The record has been successfully uploaded.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found',
  })
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
