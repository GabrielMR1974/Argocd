import { IsNotEmpty, IsString } from 'class-validator';

export class CreateStoreDto {
  @IsString()
  @IsNotEmpty()
    readonly name: string;

    @IsString()
    @IsNotEmpty()
    readonly description: string;

    @IsString()
    @IsNotEmpty()
    readonly address: string;
    readonly phone: string;
    readonly products: Product[];
  }
  
  class Product {
    readonly name: string;
    readonly price: number;
    readonly description: string;
  }
