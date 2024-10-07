import { Controller, Get, Post, Patch, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags, ApiResponse } from '@nestjs/swagger';
import { Product } from './entities/product.entity';
import { ProductService } from './products.service';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorator/rolesdecorator';
import { CreateProductDto } from './dto/create-product.dto';

@ApiBearerAuth() // Indica que las rutas requieren autenticación con JWT
@ApiTags('products') // Agrupa las rutas bajo la etiqueta 'products' en Swagger
@Controller('products')
// @UseGuards(RolesGuard) // Protege todas las rutas con el guardia de roles
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todos los productos' })
  @ApiResponse({ status: 200, description: 'Lista de productos obtenida exitosamente.' })
  async findAll(): Promise<Product[]> {
    return this.productService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un producto por su ID' })
  @ApiResponse({ status: 200, description: 'Producto obtenido exitosamente.' })
  @ApiResponse({ status: 404, description: 'Producto no encontrado.' })
  async findOne(@Param('id') id: number): Promise<Product> {
    return this.productService.findOne(id);
  }

  @Post()
  // @Roles('seller') // Solo los usuarios con rol de 'seller' pueden crear productos
  @ApiOperation({ summary: 'Crear un nuevo producto' })
  @ApiResponse({ status: 201, description: 'Producto creado exitosamente.' })
  @ApiResponse({ status: 403, description: 'Acceso denegado.' })
  async create(@Body() productData: CreateProductDto): Promise<Product> {
    return this.productService.create(productData);
  }

  @Patch(':id')
  @Roles('seller') // Solo los vendedores pueden actualizar productos
  @ApiOperation({ summary: 'Actualizar un producto existente' })
  @ApiResponse({ status: 200, description: 'Producto actualizado correctamente.' })
  @ApiResponse({ status: 404, description: 'Producto no encontrado.' })
  async updateProduct(
    @Param('id') id: number,
    @Body() productData: { name?: string; price?: number; description?: string; stock?: number },
  ): Promise<Product> {
    return this.productService.update(id, productData);
  }

  @Delete(':id')
  @Roles('seller') // Solo los vendedores pueden eliminar productos
  @ApiOperation({ summary: 'Eliminar un producto' })
  @ApiResponse({ status: 200, description: 'Producto eliminado correctamente.' })
  @ApiResponse({ status: 404, description: 'Producto no encontrado.' })
  async delete(@Param('id') id: number): Promise<void> {
    return this.productService.delete(id);
  }
}
