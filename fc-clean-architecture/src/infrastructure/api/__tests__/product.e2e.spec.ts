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

  it('should create a new product', async () => {
    const newProduct = {
      name: 'Product 2',
      price: 199,
      type: 'a',
    };

    const { status, body } = await request(app).post('/products').send(newProduct);

    expect(status).toBe(201);
    expect(body).toStrictEqual({
      id: expect.any(String),
      name: newProduct.name,
      price: newProduct.price,
      type: newProduct.type,
    });
  });

  it('should update an existing product', async () => {
    // Create the product first
    const newProduct = {
      id: '123',
      name: 'Product 1',
      price: 99.99,
    };
    await repository.create(newProduct as any);

    const createdProduct = await ProductModel.findOne({ where: { id: '123' } });

    const updatedProduct = {
      name: 'Updated Product',
      price: 299.99,
    };

    const { status, body } = await request(app).put(`/products/${createdProduct.id}`).send(updatedProduct);

    expect(status).toBe(200);
    expect(body).toStrictEqual({
      id: createdProduct.id,
      name: updatedProduct.name,
      price: updatedProduct.price,
    });
  });
});