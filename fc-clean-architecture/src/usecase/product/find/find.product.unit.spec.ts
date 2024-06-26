import Product from "../../../domain/product/entity/product";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import FindProductUseCase from "./find.product.usecase";



describe(FindProductUseCase.name, () => {
  const product = new Product('123', 'Test Product', 9.99);
  const MockRepository = () => ({
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  });
  const productRepositoryMock = MockRepository();
  const findProductUseCase = new FindProductUseCase(productRepositoryMock);

  describe(FindProductUseCase.prototype.execute.name, () => {
    it('should find a product', async () => {
      const input = {
        id: '123',
      };

      const output = {
        id: '123',
        name: 'Test Product',
        price: 9.99,
      };

      const result = await findProductUseCase.execute(input);

      expect(result).toEqual(output);
    });

    it('should not find a product', async () => {
      productRepositoryMock.find.mockImplementation(() => {
        throw new Error('Product not found');
      });

      const input = {
        id: '1',
      };

      expect(() => {
        return findProductUseCase.execute(input);
      }).rejects.toThrow('Product not found');
    });
  });
});