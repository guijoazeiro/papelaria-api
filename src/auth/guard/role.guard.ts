import {
  CanActivate,
  ExecutionContext,
  Injectable
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '@prisma/client';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean {
    const { user } = context
      .switchToHttp()
      .getRequest();

    console.log(user);

    if (user.role !== Role.ADMIN) {
      return false;
    }
    return true;
  }
}
