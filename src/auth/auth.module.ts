import { Module } from '@nestjs/common';
import {JwtModule} from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from 'src/database/prisma.service';
import { JwtStrategy } from './strategy';

@Module({
  imports: [JwtModule.register({})],
  controllers: [AuthController],
  providers: [AuthService, PrismaService, JwtStrategy]
})
export class AuthModule {}
