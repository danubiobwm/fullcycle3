import Product from '../../../domain/product/entity/product';
import ProductFactory from '../../../domain/product/factory/product.factory';
import ProductRepositoryInterface from '../../../domain/product/repository/product-repository.interface';
import { InputCreateProductDto, OutputCreateProductDto } from './create.product.dto';
import { ProductTypeNotSupportedException } from '../../../domain/product/exception/product-type-not-supported.exception';
import CreateProductMapper from './create.product.mapper';

export default class CreateProductUseCase {
  private productRepository: ProductRepositoryInterface;

  constructor(productRepository: ProductRepositoryInterface) {
    this.productRepository = productRepository;
  }

  async execute(input: InputCreateProductDto): Promise<OutputCreateProductDto> {
    if (input.type === 'b') throw new ProductTypeNotSupportedException()

    const product = ProductFactory.create(input.type, input.name, input.price) as Product ;
    await this.productRepository.create(product);

    return CreateProductMapper.toOutputDto(product);
  }
}
