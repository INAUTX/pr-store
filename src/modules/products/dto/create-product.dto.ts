import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ example: 'Nombre del producto', description: 'El nombre del producto' })
  name: string;

  @ApiProperty({ example: 99.99, description: 'El precio del producto' })
  price: number;

  @ApiProperty({ example: 'Descripción del producto', description: 'Una breve descripción del producto' })
  description: string;

  @ApiProperty({ example: 10, description: 'Cantidad de stock disponible para el producto' })
  stock: number;
}
