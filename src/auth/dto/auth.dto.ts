import { IsEmail, IsNotEmpty } from 'class-validator';

export class AuthDTO {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
