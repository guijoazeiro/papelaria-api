import {
  IsEmail,
  IsNotEmpty,
} from 'class-validator';

export class UpdateUserDTO {
  @IsNotEmpty()
  firstname: string;

  @IsNotEmpty()
  lastname: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;
}
