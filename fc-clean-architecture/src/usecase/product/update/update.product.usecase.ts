import Product from '../../../domain/product/entity/product';
import ProductRepositoryInterface from '../../../domain/product/repository/product-repository.interface';
import ProductNotFoundException from '../../../domain/product/exception/product-not-found.exception';
import { InputUpdateProductDto, OutputUpdateProductDto } from './update.product.dto';
import UpdateProductMapper from './update.product.mapper';

export default class UpdateProductUseCase {
  private productRepository: ProductRepositoryInterface;

  constructor(ProductRepository: ProductRepositoryInterface) {
    this.productRepository = ProductRepository;
  }

  async execute(input: InputUpdateProductDto): Promise<OutputUpdateProductDto> {
    const product = await this.getProduct(input.id);
    this.chainOfChanges(product, input);
    await this.productRepository.update(product);

    return UpdateProductMapper.toOutputDto(product);
  }

  private async getProduct(id: string): Promise<Product> {
    return this.productRepository.find(id).catch(() => {
      throw new ProductNotFoundException();
    });
  }

  private chainOfChanges(product: Product, input: InputUpdateProductDto): void{
    product.changeName(input.name).changePrice(input.price);
  }
}
