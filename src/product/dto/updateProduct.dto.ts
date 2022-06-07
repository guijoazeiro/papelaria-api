import { Decimal } from '@prisma/client/runtime';
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class updateProductDTO {
  @IsNotEmpty()
  @IsNumber()
  price: number | Decimal | string;

  @IsNotEmpty()
  @IsInt()
  stock: number;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  category: string;

  @IsString()
  @IsNotEmpty()
  supplier: string;
}
