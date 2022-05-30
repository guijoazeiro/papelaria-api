import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Put,
  UseGuards,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { UpdateUserDTO } from './dto';
import { UsersService } from './users.service';

@UseGuards(JwtGuard)
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
  ) {}

  @Get('me')
  async getMe(
    @GetUser()
    user: User,
  ) {
    console.log(user.id);
    return user;
  }

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
}
