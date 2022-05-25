import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaService } from 'src/database/prisma.service';
import { AuthDTO } from './dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async signUp(dto: AuthDTO) {
    const { password } = dto;
    const hashedPassword = await this.hashPassword(password);

    try {
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          password: hashedPassword,
        },
      });
      delete user.password;
      return user;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials taken');
        }
      }
    }
  }

  async signIn(dto: AuthDTO) {
    const { email, password } = dto;
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new ForbiddenException('Credentials not found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new ForbiddenException('Credentials not found');
    }

    delete user.password;
    return user;
  }

  private async hashPassword(password: string) {
    const salt = 10;
    return bcrypt.hash(password, salt);
  }
}
