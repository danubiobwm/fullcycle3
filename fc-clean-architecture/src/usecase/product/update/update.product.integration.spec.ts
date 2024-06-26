import { Sequelize } from 'sequelize-typescript';
import UpdateProductUseCase from './update.product.usecase';
import ProductModel from '../../../infrastructure/product/repository/sequelize/product.model';
import ProductRepository from '../../../infrastructure/product/repository/sequelize/product.repository';
import { InputUpdateProductDto, OutputUpdateProductDto } from './update.product.dto';
import Product from '../../../domain/product/entity/product';

describe(UpdateProductUseCase.name, () => {
  let sequelize: Sequelize;
  const productRepository = new ProductRepository();

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  describe(UpdateProductUseCase.prototype.execute.name, () => {
    it('should update a product', async () => {
      const product = new Product('1', 'Product 1', 100);
      await productRepository.create(product);

      const productCreated = await productRepository.find('1');
      expect(productCreated).not.toBeNull();
      
      const usecase = new UpdateProductUseCase(productRepository);
      const input: InputUpdateProductDto = {
        id: '1',
        name: 'Product 1 updated',
        price: 101.99,
      };

      const result = await usecase.execute(input);

      expect(result).toEqual({
        id: input.id,
        name: input.name,
        price: input.price,
      });
    });

    it('should throw ProductNotFoundException when product not found', async () => {
      const usecase = new UpdateProductUseCase(productRepository);
      const input: InputUpdateProductDto = {
        id: '100',
        name: 'Product 100 updated',
        price: 1.99,
      };

      await expect(usecase.execute(input)).rejects.toThrow('Product not found');
    });
  });
});
