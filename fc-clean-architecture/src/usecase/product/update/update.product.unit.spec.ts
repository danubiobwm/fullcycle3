import { UpdateProductUseCase } from './update.product.usecase';

import { UpdateProductInputDto } from './update.product.dto';
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

describe('Update Product Use Case Unit Test', () => {
  it('should update a product', async () => {
    const productRepository = MockRepository();
    const usecase = new UpdateProductUseCase(productRepository);

    const input: UpdateProductInputDto = {
      id: '1',
      name: 'Updated Product',
      price: 150,
    };

    const output = await usecase.execute(input);

    expect(output).toEqual({
      id: '1',
      name: 'Updated Product',
      price: 150,
      createdAt: expect.any(Date),
    });
  });
});
