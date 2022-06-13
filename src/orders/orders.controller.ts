import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post
} from '@nestjs/common';
import {
  CreateOrderDTO,
  UpdateStatusDto
} from './dto';
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

  @Patch('/status/:id')
  async updateStatus(
    @Param('id') id: string,
    @Body() updateStatusDTO: UpdateStatusDto,
  ) {
    return await this.ordersService.changeOrderStatus(
      id,
      updateStatusDTO,
    );
  }

  @Get('/:id')
  async getOrder(@Param('id') id: string) {
    return await this.ordersService.getOrder(id);
  }
}
