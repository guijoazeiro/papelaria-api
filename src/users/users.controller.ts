import {
  Body,
  Controller,
  Get,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { RolesGuard } from 'src/auth/guard/role.guard';
import { UpdateUserDTO } from './dto';
import { UsersService } from './users.service';

@ApiTags('users')
@UseGuards(JwtGuard)
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
  ) {}

  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'User retrieved successfully',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @Get('me')
  async getMe(
    @GetUser()
    user: User,
  ) {
    console.log(user.id);
    return user;
  }

  @ApiBody({
    type: UpdateUserDTO,
  })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'User retrieved successfully',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @Put('update')
  async updateUser(
    @GetUser() user: User,
    @Body() updateUserDTO: UpdateUserDTO,
  ) {
    const { id } = user;
    return await this.usersService.updateUser(
      id,
      updateUserDTO,
    );
  }

  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'Users retrieved successfully',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @UseGuards(RolesGuard)
  @Get('all')
  async getAllUsers() {
    return await this.usersService.getAllUsers();
  }
}
