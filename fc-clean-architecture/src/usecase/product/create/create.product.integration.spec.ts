import { Sequelize } from 'sequelize-typescript';
import ProductRepository from '../../../infrastructure/product/repository/sequelize/product.repository';
import CreateProductUseCase from './create.product.usecase';
import { ProductTypeNotSupportedException } from '../../../domain/product/exception/product-type-not-supported.exception';
import ProductModel from '../../../infrastructure/product/repository/sequelize/product.model';
import { InputCreateProductDto, OutputCreateProductDto } from './create.product.dto';

describe(CreateProductUseCase.name, () => {
  let sequelize: Sequelize;

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

  describe(CreateProductUseCase.prototype.execute.name, () => {
    it('should create a product', async () => {
      const productRepository = new ProductRepository();
      const usecase = new CreateProductUseCase(productRepository);

      const input: InputCreateProductDto = {
        type: 'a',
        name: 'Product 1',
        price: 100,
      };

      const output: OutputCreateProductDto = {
        id: expect.any(String),
        name: 'Product 1',
        price: 100,
      };

      const result = await usecase.execute(input);

      expect(result).toEqual(output);
    });

    it('should throw ProductTypeNotSupportedException when type is b', async () => {
      const productRepository = new ProductRepository();
      const usecase = new CreateProductUseCase(productRepository);

      const input: InputCreateProductDto = {
        type: 'b',
        name: 'Product 1',
        price: 100,
      };

      await expect(usecase.execute(input)).rejects.toThrow(ProductTypeNotSupportedException);
    });
  });
});
