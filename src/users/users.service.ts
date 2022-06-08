import {
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { UpdateUserDTO } from './dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async updateUser(
    id: string,
    updateUser: UpdateUserDTO,
  ) {
    try {
      const user = await this.prisma.user.update({
        where: { id },
        data: {
          firstname: updateUser.firstname,
          lastname: updateUser.lastname,
          email: updateUser.email,
        },
      });

      if (!user) {
        throw new ForbiddenException(
          'User not found',
        );
      }

      delete user.password;
      return user;
    } catch (error) {}
  }

  async getAllUsers() {
    const users =
      await this.prisma.user.findMany();
    return users.map((user) => {
      delete user.password;
      return user;
    });
  }
}
