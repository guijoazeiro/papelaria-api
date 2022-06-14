import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiResponse,
  ApiTags
} from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guard';
import { RolesGuard } from 'src/auth/guard/role.guard';
import {
  createProductDTO,
  updateProductDTO
} from './dto';
import { saveImageToStorage } from './helpers/image-store';
import { ProductService } from './product.service';

@ApiTags('products')
@Controller('product')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
  ) {}

  @ApiBody({
    type: createProductDTO,
  })
  @ApiBearerAuth()
  @ApiResponse({
    status: 201,
    description: 'Product created successfully',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @UseGuards(JwtGuard, RolesGuard)
  @Post()
  async create(@Body() dto: createProductDTO) {
    return this.productService.create(dto);
  }

  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Product image',
    type: 'FILE',
  })
  @ApiResponse({
    status: 201,
    description:
      'Product image updated successfully',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @ApiBearerAuth()
  @UseGuards(JwtGuard, RolesGuard)
  @Post('upload/:id')
  @UseInterceptors(
    FileInterceptor('file', saveImageToStorage),
  )
  async uploadImage(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.productService.uploadImage(
      id,
      file.path,
    );
  }

  @ApiResponse({
    status: 201,
    description:
      'Products retrieved successfully',
  })
  @Get()
  async getProducts() {
    return this.productService.getProducts();
  }

  @ApiResponse({
    status: 201,
    description: 'Product retrieved successfully',
  })
  @Get('/:url')
  async getProductByURL(
    @Param('url') url: string,
  ) {
    return this.productService.getProductByURL(
      url,
    );
  }

  @ApiResponse({
    status: 201,
    description:
      'Products retrieved successfully',
  })
  @Get('/category/:category')
  async getProductsByCategory(
    @Param('category') category: string,
  ) {
    return this.productService.getProductsByCategory(
      category,
    );
  }

  @ApiResponse({
    status: 201,
    description:
      'Products retrieved successfully',
  })
  @Get('/supplier/:supplier')
  async getProductsBySupplier(
    @Param('supplier') supplier: string,
  ) {
    return this.productService.getProductsBySupplier(
      supplier,
    );
  }

  @ApiResponse({
    status: 201,
    description:
      'Products retrieved successfully',
  })
  @Get('/search/:search')
  async getProductsBySearch(
    @Param('search') search: string,
  ) {
    return this.productService.getProductsBySearch(
      search,
    );
  }

  @ApiBody({
    type: updateProductDTO,
  })
  @ApiBearerAuth()
  @ApiResponse({
    status: 201,
    description: 'Product updated successfully',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @UseGuards(JwtGuard, RolesGuard)
  @Put('/:id')
  async updateProduct(
    @Param('id') id: string,
    @Body() dto: updateProductDTO,
  ) {
    return this.productService.updateProduct(
      id,
      dto,
    );
  }

  @ApiBearerAuth()
  @ApiResponse({
    status: 201,
    description: 'Product updated successfully',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @UseGuards(JwtGuard, RolesGuard)
  @Delete('/:id')
  async deleteProduct(@Param('id') id: string) {
    return this.productService.deleteProduct(id);
  }
}
