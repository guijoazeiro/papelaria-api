import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { RolesGuard } from 'src/auth/guard/role.guard';
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

  @UseGuards(JwtGuard, RolesGuard)
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

  @UseGuards(JwtGuard, RolesGuard)
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

  @UseGuards(JwtGuard, RolesGuard)
  @Get('/:id')
  async getOrder(@Param('id') id: string) {
    return await this.ordersService.getOrder(id);
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Get('/user/:email')
  async getOrdersByUser(
    @Param('email') email: string,
  ) {
    return await this.ordersService.getOrdersByUser(
      email,
    );
  }
}
