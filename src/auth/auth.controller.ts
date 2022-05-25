import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDTO } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() dto: AuthDTO) {
    return this.authService.signUp(dto);
  }

  @Post('sigin')
  async signIn(@Body() dto: AuthDTO) {
    return this.authService.signIn(dto);
  }
}
