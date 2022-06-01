import {
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { AuthDTO } from './dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async signUp(dto: AuthDTO) {
    const { password } = dto;
    const hashedPassword =
      await this.hashPassword(password);

    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        password: hashedPassword,
      },
    });

    return this.signToken(user.id, user.email);
  }

  async signIn(dto: AuthDTO) {
    const { email, password } = dto;
    const user =
      await this.prisma.user.findUnique({
        where: { email },
      });

    if (!user) {
      throw new ForbiddenException(
        'Credentials not found',
      );
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new ForbiddenException(
        'Credentials not found',
      );
    }
    return this.signToken(user.id, user.email);
  }

  private async hashPassword(
    password: string,
  ): Promise<string> {
    const salt = 10;
    return bcrypt.hash(password, salt);
  }

  async signToken(
    userId: string,
    email: string,
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      email,
    };
    const secret = this.config.get('JWT_SECRET');

    const token = await this.jwt.signAsync(
      payload,
      {
        expiresIn: '15m',
        secret: secret,
      },
    );

    return {
      access_token: token,
    };
  }
}
