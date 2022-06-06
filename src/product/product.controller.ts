import {
  Body,
  Controller,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { createProductDTO } from './dto';
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
    return this.productService.uploadImage(id, file.path);
  }
}
