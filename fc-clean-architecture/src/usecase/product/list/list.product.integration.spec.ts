import { Sequelize } from 'sequelize-typescript';
import ListProductUseCase from './list.product.usecase';
import ProductModel from '../../../infrastructure/product/repository/sequelize/product.model';
import ProductRepository from '../../../infrastructure/product/repository/sequelize/product.repository';
import Product from '../../../domain/product/entity/product';

describe(ListProductUseCase.name, () => {
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

  it('should list products', async () => {
    const productRepository = new ProductRepository();
    const usecase = new ListProductUseCase(productRepository);

    const product1 = new Product('123', 'Product 1', 100);
    const product2 = new Product('124', 'Product 2', 200);
    await productRepository.create(product1);
    await productRepository.create(product2);

    const output = {
      products: [
        {
          id: '123',
          name: 'Product 1',
          price: 100,
        },
        {
          id: '124',
          name: 'Product 2',
          price: 200,
        },
      ],
    };

    const result = await usecase.execute();

    expect(result.products).toHaveLength(2);
    expect(result).toEqual(output);
  });
});