import {
  Body,
  Controller,
  Get,
  Post
} from '@nestjs/common';
import { CreateOrderDTO } from './dto';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(
    private readonly ordersService: OrdersService,
  ) {}

  @Get()
  async getOrders() {
    return await this.ordersService.getOrders();
  }

  @Post()
  async createOrder(
    @Body()
    createOrderDTO: CreateOrderDTO,
  ) {
    return await this.ordersService.createOrder(
      createOrderDTO,
    );
  }
}
