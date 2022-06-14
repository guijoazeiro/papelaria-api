import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsUUID
} from 'class-validator';

export class CreateOrderDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  user: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  product: string;

  @ApiProperty()
  @IsNotEmpty()
  amount: number;

  totalPrice?: number;
}
