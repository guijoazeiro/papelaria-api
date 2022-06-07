import { Decimal } from '@prisma/client/runtime';
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class createProductDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  url: string;

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
