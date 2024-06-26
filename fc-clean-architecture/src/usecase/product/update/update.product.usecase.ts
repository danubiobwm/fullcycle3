
import ProductRepositoryInterface from '../../../domain/product/repository/product-repository.interface';
import { UpdateProductInputDto, UpdateProductOutputDto } from './update.product.dto';

export class UpdateProductUseCase {
  private productRepository: ProductRepositoryInterface;

  constructor(productRepository: ProductRepositoryInterface) {
    this.productRepository = productRepository;
  }

  async execute(input: UpdateProductInputDto): Promise<UpdateProductOutputDto> {
    const product = await this.productRepository.find(input.id);

    if (input.name) {
      product.changeName(input.name);
    }
    if (input.price) {
      product.changePrice(input.price);
    }

    await this.productRepository.create(product);

    return {
      id: product.id,
      name: product.name,
      price: product.price,
      createdAt: product.createdAt,
    };
  }
}
