import Product from './product';

describe(Product.name, () => {
  it('should throw error when id is empty', () => {
    expect(() => {
      const product = new Product('', 'Product 1', 100);
    }).toThrowError('product: Id is required');
  });

  it('should throw error when name is empty', () => {
    expect(() => {
      const product = new Product('123', '', 100);
    }).toThrowError('product: Name is required');
  });

  it('should throw error when price is less than zero', () => {
    expect(() => {
      const product = new Product('123', 'Name', -1);
    }).toThrowError('product: Price must be greater than zero');
  });

  it('should throw error when fields are invalid', () => {
    expect(() => {
      const product = new Product('', '', -1);
    }).toThrowError("product: Id is required,product: Id must be alphanumeric with dashes allowed,product: Name is required,product: Name must be at least 3 characters,product: Price must be greater than zero");
  });

  it('should change name', () => {
    const product = new Product('123', 'Product 1', 100);
    product.changeName('Product 2');
    expect(product.name).toBe('Product 2');
  });

  it('should change price', () => {
    const product = new Product('123', 'Product 1', 100);
    product.changePrice(150);
    expect(product.price).toBe(150);
  });

  it('should create a product', () => {
    const product = new Product('123', 'Product 1', 100);
    expect(product.id).toBe('123');
    expect(product.name).toBe('Product 1');
    expect(product.price).toBe(100);
  });
});
