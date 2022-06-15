import {
  Body,
  Controller,
  Post,
} from '@nestjs/common';
import {
  ApiBody,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthDTO } from './dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @ApiBody({
    type: AuthDTO,
  })
  @ApiResponse({
    status: 201,
    description:
      'The record has been successfully created.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
  })
  @Post('signup')
  async signUp(@Body() dto: AuthDTO) {
    return this.authService.signUp(dto);
  }

  @ApiBody({
    type: AuthDTO,
  })
  @ApiResponse({
    status: 201,
    description: 'Login successful.',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden.',
  })
  @Post('sigin')
  async signIn(@Body() dto: AuthDTO) {
    return this.authService.signIn(dto);
  }
}
