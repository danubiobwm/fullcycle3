import { FindProductUseCase } from './find.product.usecase';

import { FindProductInputDto } from './find.product.dto';
import Product from '../../../domain/product/entity/product';
import ProductRepositoryInterface from '../../../domain/product/repository/product-repository.interface';

const MockRepository = (): ProductRepositoryInterface => {
  return {
    create: jest.fn(),
    update: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(new Product('1', 'Product 1', 100))),
    findAll: jest.fn(),
  };
};

describe('Find Product Use Case Unit Test', () => {
  it('should find a product', async () => {
    const productRepository = MockRepository();
    const usecase = new FindProductUseCase(productRepository);

    const input: FindProductInputDto = {
      id: '1',
    };

    const output = await usecase.execute(input);

    expect(output).toEqual({
      id: '1',
      name: 'Product 1',
      price: 100,
      createdAt: expect.any(Date),
    });
  });
});
