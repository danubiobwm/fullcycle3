import { ListProductUseCase } from './list.product.usecase';

import Product from '../../../domain/product/entity/product';
import ProductRepositoryInterface from '../../../domain/product/repository/product-repository.interface';

const MockRepository = (): ProductRepositoryInterface => {
  return {
    create: jest.fn(),
    update: jest.fn(),
    find: jest.fn(),
    findAll: jest.fn().mockReturnValue(Promise.resolve([
      new Product('1', 'Product 1', 100),
      new Product('2', 'Product 2', 200),
    ])),
  };
};

describe('List Products Use Case Unit Test', () => {
  it('should list all products', async () => {
    const productRepository = MockRepository();
    const usecase = new ListProductUseCase(productRepository);

    const output = await usecase.execute();

    expect(output).toEqual({
      products: [
        {
          id: '1',
          name: 'Product 1',
          price: 100,
          createdAt: expect.any(Date),
        },
        {
          id: '2',
          name: 'Product 2',
          price: 200,
          createdAt: expect.any(Date),
        },
      ],
    });
  });
});
