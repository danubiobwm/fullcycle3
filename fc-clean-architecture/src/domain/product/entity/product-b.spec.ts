import ProductB from './product-b';

describe(ProductB.name, () => {
  it('should throw error when id is empty', () => {
    expect(() => {
      const product = new ProductB('', 'Product 1', 100);
    }).toThrowError('product: Id is required');
  });

  it('should throw error when name is empty', () => {
    expect(() => {
      const product = new ProductB('123', '', 100);
    }).toThrowError('product: Name is required');
  });

  it('should throw error when price is less than zero', () => {
    expect(() => {
      const product = new ProductB('123', 'Name', -1);
    }).toThrowError('product: Price must be greater than zero');
  });

  it('should throw error when fields are invalid', () => {
    expect(() => {
      const product = new ProductB('', '', -1);
    }).toThrowError('product: Id is required,product: Name is required,product: Price must be greater than zero');
  });

  it('should change name', () => {
    const product = new ProductB('123', 'Product 1', 100);
    product.changeName('Product 2');
    expect(product.name).toBe('Product 2');
  });

  it('should change price', () => {
    const product = new ProductB('123', 'Product 1', 100);
    product.changePrice(150);
    expect(product.price).toBe(300);
  });

  it('should create a product', () => {
    const product = new ProductB('123', 'Product 1', 100);
    expect(product.id).toBe('123');
    expect(product.name).toBe('Product 1');
    expect(product.price).toBe(200);
  });
});
