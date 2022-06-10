import {
  IsNotEmpty,
  IsString,
  IsUUID
} from 'class-validator';

export class CreateOrderDTO {
  @IsNotEmpty()
  @IsUUID()
  user: string;

  @IsNotEmpty()
  @IsString()
  @IsUUID()
  product: string;

  
  @IsNotEmpty()
  amount: number;

  totalPrice?: number;
}
