import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { InputFindProductDto, OutputFindProductDto } from "./find.product.dto";
import { FindProductMapper } from "./find.product.mapper";

export default class FindProductUseCase {
    private productRepository: ProductRepositoryInterface;

    constructor(productRepository: ProductRepositoryInterface) {
        this.productRepository = productRepository;
    }
    
    async execute(input: InputFindProductDto): Promise<OutputFindProductDto> {
      const product = await this.productRepository.find(input.id);
    
      return FindProductMapper.toOutputDto(product);
    }
}
