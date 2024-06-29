import { Sequelize } from 'sequelize-typescript';
import { app } from '../express';
import request from 'supertest';
import ProductModel from '../../product/repository/sequelize/product.model';
import ProductRepository from '../../product/repository/sequelize/product.repository';
import Product from '../../../domain/product/entity/product';

describe('E2E test for product', () => {
  let sequelize: Sequelize;
  const repository = new ProductRepository();
  const product = new Product('123', 'Product 1', 99.99);

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([ProductModel]);
    await sequelize.sync({ force: true });
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it('should list all product in json format', async () => {
    await repository.create(product);
    const expected = {
      products: [
        {
          id: product.id,
          name: product.name,
          price: product.price,
        }
      ],
    };

    const { status, body } = await request(app).get('/products');

    expect(status).toBe(200);
    expect(body).toStrictEqual(expected);
  });

  it('should list all product in xml format', async () => {
    await repository.create(product);

    const { status, text } = await request(app).get('/products').set('Accept', 'application/xml');

    expect(status).toBe(200);
    expect(text).toContain('<products>');
    expect(text).toContain('<product>');
    expect(text).toContain(`<id>${product.id}</id>`);
    expect(text).toContain(`<name>${product.name}</name>`);
    expect(text).toContain(`<price>${product.price}</price>`);
    expect(text).toContain('</product>');
    expect(text).toContain('</products>');
  });
});
