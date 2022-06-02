import { IsNotEmpty, IsNumber, IsNumberString, IsString } from "class-validator";

export class ProductDTO {
  @IsString()
  @IsNotEmpty()  
  name: string;

  @IsNotEmpty()
  @IsNumberString()  
  price: number;

  @IsString()
  @IsNotEmpty()  
  description: string;

  image?: string;

  @IsString()
  @IsNotEmpty()  
  category: string;

  @IsString()
  @IsNotEmpty()  
  supplier: string;
}
