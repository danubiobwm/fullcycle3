import { CreateProductUseCase } from './create.product.usecase';

import { CreateProductInputDto } from './create.product.dto';
import ProductRepositoryInterface from '../../../domain/product/repository/product-repository.interface';

const MockRepository = (): ProductRepositoryInterface => {
  return {
    create: jest.fn(),
    update: jest.fn(),
    find: jest.fn(),
    findAll: jest.fn(),
  };
};

describe('Create Product Use Case Unit Test', () => {
  it('should create a product', async () => {
    const productRepository = MockRepository();
    const usecase = new CreateProductUseCase(productRepository);

    const input: CreateProductInputDto = {
      name: 'Product 1',
      price: 100,
    };

    const output = await usecase.execute(input);

    expect(output).toEqual({
      id: expect.any(String),
      name: input.name,
      price: input.price,
      createdAt: expect.any(Date),
    });
  });
});
