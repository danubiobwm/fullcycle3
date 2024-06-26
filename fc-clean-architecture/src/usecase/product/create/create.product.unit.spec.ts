import CreateProductUseCase from './create.product.usecase';
import { ProductTypeNotSupportedException } from '../../../domain/product/exception/product-type-not-supported.exception';
import { InputCreateProductDto, OutputCreateProductDto } from './create.product.dto';

describe(CreateProductUseCase.name, () => {
  const MockRepository = () => ({
    find: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  });
  const productRepository = MockRepository();
  const createProductUseCase = new CreateProductUseCase(productRepository);

  describe(CreateProductUseCase.prototype.execute.name, () => {
    it('should create a product', async () => {
      const input: InputCreateProductDto = {
        type: 'a',
        name: 'Product 1',
        price: 100,
      };

      const expected: OutputCreateProductDto = {
        id: expect.any(String),
        name: 'Product 1',
        price: 100,
      };

      const result = await createProductUseCase.execute(input);

      expect(result).toEqual(expected);
      expect(productRepository.create).toHaveBeenCalled();
    });

    it('should throw ProductTypeNotSupportedException when type is b', async () => {
      const input: InputCreateProductDto = {
        type: 'b',
        name: 'Product 1',
        price: 100,
      };

      await expect(createProductUseCase.execute(input)).rejects.toThrow(ProductTypeNotSupportedException);
    });
  });
});
