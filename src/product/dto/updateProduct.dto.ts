import { ApiProperty } from '@nestjs/swagger';
import { Decimal } from '@prisma/client/runtime';
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString
} from 'class-validator';

export class updateProductDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  price: number | Decimal | string;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  stock: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  category: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  supplier: string;
}
