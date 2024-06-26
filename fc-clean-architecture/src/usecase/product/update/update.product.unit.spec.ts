import Product from '../../../domain/product/entity/product';
import ProductNotFoundException from '../../../domain/product/exception/product-not-found.exception';
import UpdateProductUseCase from './update.product.usecase';

describe(UpdateProductUseCase.name, () => {
  const product = new Product('1', 'Product 1', 100);
  const MockRepository = () => ({
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  });
  const productRepository = MockRepository();
  const updateProductUseCase = new UpdateProductUseCase(productRepository);

  describe(UpdateProductUseCase.prototype.execute.name, () => {
    it('should update a product', async () => {
      const input = {
        id: '1',
        name: 'Product 1 updated',
        price: 101.99,
      };

      const result = await updateProductUseCase.execute(input);

      expect(result).toEqual({
        id: input.id,
        name: input.name,
        price: input.price,
      });
    });

    it('should throw ProductNotFoundException when product not found', async () => {
      const input = {
        id: '100',
        name: 'Product 100 updated',
        price: 1.99,
      };

      productRepository.find.mockRejectedValue(new ProductNotFoundException());

      await expect(updateProductUseCase.execute(input)).rejects.toThrow('Product not found');
    });
  });
});
