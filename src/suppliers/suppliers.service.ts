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
      if (
        error instanceof
        PrismaClientKnownRequestError
      ) {
        if (error.code === 'P2002') {
          throw new ForbiddenException(
            'CNPJ taken',
          );
        }
      }
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
}
