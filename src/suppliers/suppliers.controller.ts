import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { RolesGuard } from 'src/auth/guard/role.guard';
import { SupplierDTO } from './dto';
import { SuppliersService } from './suppliers.service';

@Controller('suppliers')
export class SuppliersController {
  constructor(
    private readonly suppliersService: SuppliersService,
  ) {}

  @UseGuards(JwtGuard, RolesGuard)
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

  @UseGuards(JwtGuard, RolesGuard)
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

  @UseGuards(JwtGuard, RolesGuard)
  @Delete('/:cnpj')
  async deleteSupplier(
    @Param('cnpj') cnpj: string,
  ) {
    return await this.suppliersService.deleteSupplier(
      cnpj,
    );
  }
}
