import {
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class SupplierDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  cnpj: string;
}
