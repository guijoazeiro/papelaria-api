import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiResponse,
  ApiTags
} from '@nestjs/swagger';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { RolesGuard } from 'src/auth/guard/role.guard';
import {
  CreateOrderDTO,
  UpdateStatusDto
} from './dto';
import { OrdersService } from './orders.service';

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(
    private readonly ordersService: OrdersService,
  ) {}

  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'Orders retrieved successfully',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @UseGuards(JwtGuard, RolesGuard)
  @Get()
  async getOrders() {
    return await this.ordersService.getOrders();
  }

  @ApiBody({
    type: CreateOrderDTO,
  })
  @ApiBearerAuth()
  @ApiResponse({
    status: 201,
    description: 'Order created successfully',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @UseGuards(JwtGuard)
  @Post()
  async createOrder(
    @GetUser() user: User,
    @Body()
    createOrderDTO: CreateOrderDTO,
  ) {
    createOrderDTO.user = user.id;
    return await this.ordersService.createOrder(
      createOrderDTO,
    );
  }

  @ApiBody({
    type: UpdateStatusDto,
  })
  @ApiBearerAuth()
  @ApiResponse({
    status: 201,
    description: 'Status updated successfully',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
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

  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'Orders retrieved successfully',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @UseGuards(JwtGuard, RolesGuard)
  @Get('/:id')
  async getOrder(@Param('id') id: string) {
    return await this.ordersService.getOrder(id);
  }

  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'Orders retrieved successfully',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
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
