import {
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaService } from 'src/database/prisma.service';
import { SupplierDTO } from './dto';

@Injectable()
export class SuppliersService {
  constructor(private prisma: PrismaService) {}

  async createSupplier(supplierDto: SupplierDTO) {
    try {
      return await this.prisma.supplier.create({
        data: {
          name: supplierDto.name,
          cnpj: supplierDto.cnpj,
        },
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async getSuppliers() {
    try {
      return await this.prisma.supplier.findMany();
    } catch (error) {
      throw new Error(error);
    }
  }

  async getSupplier(cnpj: string) {
    try {
      return await this.prisma.supplier.findUnique(
        {
          where: {
            cnpj: cnpj,
          },
        },
      );
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateSupplier(
    cnpj: string,
    supplierDto: SupplierDTO,
  ) {
    try {
      return await this.prisma.supplier.update({
        where: {
          cnpj: cnpj,
        },
        data: {
          name: supplierDto.name,
          cnpj: supplierDto.cnpj,
        },
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteSupplier(cnpj: string) {
    try {
      return await this.prisma.supplier.delete({
        where: {
          cnpj: cnpj,
        },
      });
    } catch (error) {
      throw new Error(error);
    }
  }
}
