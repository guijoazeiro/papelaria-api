import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateOrderDTO } from './dto';
import currency = require('currency.js');

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

  async createOrder(
    createOrderDTO: CreateOrderDTO,
  ) {
    try {
      const productPrice = await this.getPrice(
        createOrderDTO,
      );

      createOrderDTO.totalPrice =
        productPrice * createOrderDTO.amount;

      const order =
        await this.prisma.order.create({
          data: {
            userId: createOrderDTO.user,
            productId: createOrderDTO.product,
            amount: createOrderDTO.amount,
            totalPrice: createOrderDTO.totalPrice,
          },
        });
      return order;
    } catch (error) {
      throw error;
    }
  }

  async getPrice(createOrderDTO: CreateOrderDTO) {
    try {
      const { price } =
        await this.prisma.product.findUnique({
          where: {
            id: createOrderDTO.product,
          },
        });

      const orderPrice = currency(
        price.toNumber(),
      ).multiply(createOrderDTO.amount);
      return orderPrice.value;
    } catch (error) {
      throw error;
    }
  }
}
