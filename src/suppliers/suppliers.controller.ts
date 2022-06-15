import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guard';
import { RolesGuard } from 'src/auth/guard/role.guard';
import { SupplierDTO } from './dto';
import { SuppliersService } from './suppliers.service';

@ApiTags('suppliers')
@Controller('suppliers')
export class SuppliersController {
  constructor(
    private readonly suppliersService: SuppliersService,
  ) {}

  @ApiBody({
    type: SupplierDTO,
  })
  @ApiBearerAuth()
  @ApiResponse({
    status: 201,
    description: 'Supplier created successfully',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @UseGuards(JwtGuard, RolesGuard)
  @Post()
  async crateSupplier(
    @Body() supplierDTO: SupplierDTO,
  ) {
    return await this.suppliersService.createSupplier(
      supplierDTO,
    );
  }

  @ApiResponse({
    status: 200,
    description:
      'Suppliers retrieved successfully',
  })
  @Get()
  async getSuppliers() {
    return await this.suppliersService.getSuppliers();
  }

  @ApiResponse({
    status: 200,
    description:
      'Supplier retrieved successfully',
  })
  @Get('/:cnpj')
  async getSupplier(@Param('cnpj') cnpj: string) {
    return await this.suppliersService.getSupplier(
      cnpj,
    );
  }

  @ApiBody({
    type: SupplierDTO,
  })
  @ApiBearerAuth()
  @ApiResponse({
    status: 201,
    description: 'Supplier updated successfully',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
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

  @ApiBearerAuth()
  @ApiResponse({
    status: 201,
    description: 'Supplier deleted successfully',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
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
