import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  async getOrders() {
    try {
      return await this.prisma.order.findMany({
        include: {
          user: true,
          product: true,
        },
      });
    } catch (error) {
      throw error;
    }
  }
}
