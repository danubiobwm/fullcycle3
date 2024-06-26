import ProductRepositoryInterface from '../../../domain/product/repository/product-repository.interface';
import { InputListProductDto, OutputListProductDto } from './list.product.dto';
import { ListProductMapper } from './list.product.mapper';

export default class ListProductUseCase {
  private productRepository: ProductRepositoryInterface;
  constructor(ProductRepository: ProductRepositoryInterface) {
    this.productRepository = ProductRepository;
  }

  async execute(input: InputListProductDto = {}): Promise<OutputListProductDto> {
    const products = await this.productRepository.findAll();

    return ListProductMapper.toOutput(products);
  }
}