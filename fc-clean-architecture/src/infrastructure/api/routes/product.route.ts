import express, { Request, Response } from 'express';
import ListProductUseCase from '../../../usecase/product/list/list.product.usecase';
import ProductRepository from '../../product/repository/sequelize/product.repository';
import ProductPresenter from '../presenters/product.presenter';
import CreateProductUseCase from '../../../usecase/product/create/create.product.usecase';
import { ProductTypeNotSupportedException } from '../../../domain/product/exception/product-type-not-supported.exception';
import UpdateProductUseCase from '../../../usecase/product/update/update.product.usecase';
import ProductNotFoundException from '../../../domain/product/exception/product-not-found.exception';

export const productRoute = express.Router();

productRoute.get('/', async (req: Request, res: Response) => {
  const useCase = new ListProductUseCase(new ProductRepository());
  const output = await useCase.execute();

  res.format({
    json: async () => res.send(output),
    xml: async () => res.send(ProductPresenter.listXML(output)),
  });
});

productRoute.post('/', async (req: Request, res: Response) => {
  console.log('POST /products endpoint hit');
  const useCase = new CreateProductUseCase(new ProductRepository());
  const { name, price, type } = req.body;

  // Validate request body
  if (!name || !price || !type) {
    console.log('Validation failed');
    return res.status(400).json({ error: 'Name, price, and type are required' });
  }

  try {
    // Create a new product
    const product = await useCase.execute({ name, price, type });
    console.log('Product created:', product);

    // Return the created product
    res.status(201).json({
      id: product.id,
      name: product.name,
      price: product.price,
      type: type
    });
  } catch (error) {
    if (error instanceof ProductTypeNotSupportedException) {
      res.status(400).json({ error: error.message });
    } else {
      console.error('Error creating product:', error);
      res.status(500).json({ error: 'Failed to create product' });
    }
  }
});


productRoute.put('/:id', async (req: Request, res: Response) => {
  console.log('PUT /products/:id endpoint hit');
  const useCase = new UpdateProductUseCase(new ProductRepository());
  const { name, price } = req.body;
  const { id } = req.params;

  if (!name || !price) {
    console.log('Validation failed');
    return res.status(400).json({ error: 'Name and price are required' });
  }

  try {
    const updatedProduct = await useCase.execute({ id, name, price });
    console.log('Product updated:', updatedProduct);

    res.status(200).json({
      id: updatedProduct.id,
      name: updatedProduct.name,
      price: updatedProduct.price,
    });
  } catch (error) {
    if (error instanceof ProductNotFoundException) {
      res.status(404).json({ error: error.message });
    } else {
      console.error('Error updating product:', error);
      res.status(500).json({ error: 'Failed to update product' });
    }
  }
});