import Product from '../../../domain/product/entity/product';
import ListProductUseCase from './list.product.usecase';

describe(ListProductUseCase.name, () => {
  const product = new Product('123', 'Test Product', 9.99);
  const MockRepository = () => ({
    find: jest.fn(),
    findAll: jest.fn().mockReturnValue(Promise.resolve([product])),
    create: jest.fn(),
    update: jest.fn(),
  });
  const productRepositoryMock = MockRepository();
  const listProductUseCase = new ListProductUseCase(productRepositoryMock);

  describe(ListProductUseCase.prototype.execute.name, () => {
    it('should list products', async () => {
      const output = {
        products: [{
          id: '123',
          name: 'Test Product',
          price: 9.99,
        }],
      };

      const result = await listProductUseCase.execute();

      expect(result).toEqual(output);
    });

    it('should return an empty list', async () => {
      productRepositoryMock.findAll.mockReturnValue(Promise.resolve([]));

      const output = {
        products: [] as Product[],
      };

      const result = await listProductUseCase.execute();

      expect(result).toEqual(output);
    });
  });
});