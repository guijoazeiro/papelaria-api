import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProductDTO } from './dto';
import { saveImageToStorage } from './helpers/image-store';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
  ) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', saveImageToStorage),
  )
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: ProductDTO,
  ) {
    const { path } = file;    
    return this.productService.create(dto, path);
  }
}
