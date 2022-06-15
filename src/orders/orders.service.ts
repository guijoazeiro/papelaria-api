import {
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import {
  CreateOrderDTO,
  UpdateStatusDto,
} from './dto';
import currency = require('currency.js');

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  async getOrders() {
    try {
      return await this.prisma.order.findMany({
        include: {
          user: {
            select: {
              firstname: true,
              lastname: true,
              email: true,
            },
          },
          product: {
            select: {
              name: true,
              price: true,
            },
          },
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

      const order =
        await this.prisma.order.create({
          data: {
            userId: createOrderDTO.user,
            productId: createOrderDTO.product,
            amount: createOrderDTO.amount,
            totalPrice: productPrice,
          },
          include: {
            product: {
              select: {
                name: true,
                price: true,
              },
            },
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

  async changeOrderStatus(
    id: string,
    updateStatusDto: UpdateStatusDto,
  ) {
    try {
      const order =
        await this.prisma.order.update({
          where: {
            id,
          },
          data: {
            status: {
              set: updateStatusDto.status,
            },
          },
        });

      return order;
    } catch (error) {
      throw error;
    }
  }

  async getOrder(id: string) {
    try {
      const order =
        await this.prisma.order.findUnique({
          where: {
            id,
          },
          include: {
            user: {
              select: {
                email: true,
              },
            },
            product: {
              select: {
                name: true,
              },
            },
          },
        });

      if (!order) {
        return new HttpException(
          'Order not found',
          HttpStatus.NOT_FOUND,
        );
      }

      return order;
    } catch (error) {
      throw error;
    }
  }

  async getOrdersByUser(email: string) {
    try {
      const orders =
        await this.prisma.order.findMany({
          where: {
            user: {
              email: email,
            },
          },
          include: {
            product: {
              select: {
                name: true,
              },
            },
          },
        });
      if (!orders) {
        return new HttpException(
          'Orders not found',
          HttpStatus.NOT_FOUND,
        );
      }
      return orders;
    } catch (error) {
      throw error;
    }
  }
}
