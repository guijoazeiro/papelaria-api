import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { SupplierDTO } from './dto';
import { SuppliersService } from './suppliers.service';

@Controller('suppliers')
export class SuppliersController {
  constructor(
    private readonly suppliersService: SuppliersService,
  ) {}

  @Post()
  async crateSupplier(
    @Body() supplierDTO: SupplierDTO,
  ) {
    return await this.suppliersService.createSupplier(
      supplierDTO,
    );
  }

  @Get()
  async getSuppliers() {
    return await this.suppliersService.getSuppliers();
  }

  @Get('/:cnpj')
  async getSupplier(@Param('cnpj') cnpj: string) {
    return await this.suppliersService.getSupplier(
      cnpj,
    );
  }

  @Put('/:cnpj')
  async updateSupplier(
    @Param('cnpj') cnpj: string,
    @Body() supplierDTO: SupplierDTO,
  ) {
    return await this.suppliersService.updateSupplier(
      cnpj,
      supplierDTO,
    );
  }

  @Delete('/:cnpj')
  async deleteSupplier(
    @Param('cnpj') cnpj: string,
  ) {
    return await this.suppliersService.deleteSupplier(
      cnpj,
    );
  }
}
