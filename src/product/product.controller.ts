import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { url } from 'inspector';
import {
  createProductDTO,
  updateProductDTO,
} from './dto';
import { saveImageToStorage } from './helpers/image-store';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
  ) {}

  @Post()
  async create(@Body() dto: createProductDTO) {
    return this.productService.create(dto);
  }

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

  @Get()
  async getProducts() {
    return this.productService.getProducts();
  }

  @Get('/:url')
  async getProductByURL(
    @Param('url') url: string,
  ) {
    return this.productService.getProductByURL(
      url,
    );
  }

  @Get('/category/:category')
  async getProductsByCategory(
    @Param('category') category: string,
  ) {
    return this.productService.getProductsByCategory(
      category,
    );
  }

  @Get('/supplier/:supplier')
  async getProductsBySupplier(
    @Param('supplier') supplier: string,
  ) {
    return this.productService.getProductsBySupplier(
      supplier,
    );
  }

  @Get('/search/:search')
  async getProductsBySearch(
    @Param('search') search: string,
  ) {
    return this.productService.getProductsBySearch(
      search,
    );
  }

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

  @Delete('/:id')
  async deleteProduct(@Param('id') id: string) {
    return this.productService.deleteProduct(id);
  }
}
