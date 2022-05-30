import { IsNotEmpty, IsString, isString } from "class-validator";

export class CategoryDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  abbreviation: string;
}
