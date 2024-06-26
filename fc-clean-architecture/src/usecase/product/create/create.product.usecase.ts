import Product from '../../../domain/product/entity/product';
import ProductRepositoryInterface from '../../../domain/product/repository/product-repository.interface';
import { CreateProductInputDto, CreateProductOutputDto } from './create.product.dto';
import { v4 as uuidv4 } from 'uuid'; // Para gerar IDs únicos

export class CreateProductUseCase {
  private productRepository: ProductRepositoryInterface;

  constructor(productRepository: ProductRepositoryInterface) {
    this.productRepository = productRepository;
  }

  async execute(input: CreateProductInputDto): Promise<CreateProductOutputDto> {
    const id = uuidv4(); // Gera um ID único
    const product = new Product(id, input.name, input.price);
    await this.productRepository.create(product);

    return {
      id: product.id,
      name: product.name,
      price: product.price,
      createdAt: new Date(), // Adicionando a data de criação
    };
  }
}
