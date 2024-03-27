import { Sequelize } from 'sequelize-typescript';
import { faker } from '@faker-js/faker'
import Order from '../../../../domain/checkout/entity/order';
import OrderItem from '../../../../domain/checkout/entity/order_item';
import Customer from '../../../../domain/customer/entity/customer';
import Product from '../../../../domain/product/entity/product';
import CustomerModel from '../../../customer/repository/sequelize/customer.model';
import CustomerRepository from '../../../customer/repository/sequelize/customer.repository';
import ProductModel from '../../../product/repository/sequelize/product.model';
import ProductRepository from '../../../product/repository/sequelize/product.repository';
import { OrderRepository } from './order.repository';
import OrderModel from './order.model';
import OrderItemModel from './order-item.model';
import  Address  from '../../../../domain/customer/value-object/address';

async function makeCustomer({ shouldCreateOnDb = true } = {}) {
  const customer = new Customer(faker.datatype.uuid(), faker.name.firstName());
  const address = new Address({
    street: faker.address.streetName(),
    number: faker.datatype.number(),
    city: faker.address.city(),
    state: faker.address.stateAbbr(),
    zip: faker.address.zipCode(),
  });
  customer.changeAddress(address);

  if (shouldCreateOnDb) {
    const customerRepository = new CustomerRepository();
    await customerRepository.create(customer);
  }

  return customer;
}

async function makeProduct({ shouldCreateOnDb = true } = {}) {
  const product = new Product(
    faker.datatype.uuid(),
    faker.commerce.productName(),
    parseFloat(faker.commerce.price()),
  );

  if (shouldCreateOnDb) {
    const productRepository = new ProductRepository();
    await productRepository.create(product);
  }

  return product;
}

function makeOrderItem({ product }: { product: Product }) {
  const orderItem = new OrderItem(
    faker.datatype.uuid(),
    product.name,
    product.price,
    product.id,
    faker.datatype.number({ min: 1, max: 10 }),
  );

  return orderItem;
}

async function makeOrder({
  customer,
  orderItems,
  shouldCreateOnDb = true,
}: {
  customer: Customer;
  orderItems: OrderItem[];
  shouldCreateOnDb?: boolean;
}) {
  const order = new Order(faker.datatype.uuid(), customer.id, orderItems);

  if (shouldCreateOnDb) {
    const orderRepository = new OrderRepository();
    await orderRepository.create(order);
  }

  return order;
}

describe('Order repository test', () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      define: {
        timestamps: false,
      },
    });

    sequelize.addModels([
      CustomerModel,
      OrderModel,
      OrderItemModel,
      ProductModel,
    ]);

    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it('should create an order', async () => {
    const customer = await makeCustomer();
    const product = await makeProduct();
    const orderItem = makeOrderItem({ product });
    const order = await makeOrder({
      customer,
      orderItems: [orderItem],
    });

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: [{ model: OrderItemModel, as: 'items' }],
    });

    expect(orderModel.toJSON()).toStrictEqual({
      id: order.id,
      customer_id: order.customerId,
      items: [
        {
          id: orderItem.id,
          name: orderItem.name,
          price: orderItem.price,
          product_id: orderItem.productId,
          quantity: orderItem.quantity,
          order_id: order.id,
        },
      ],
      total: order.total(),
    });
  });

  it('should update an order', async () => {
    const customer = await makeCustomer();
    const product = await makeProduct();
    const [itemToBeUpdated, itemToBeRemoved] = Array.from({ length: 2 }, () =>
      makeOrderItem({ product }),
    );
    const order = await makeOrder({
      customer,
      orderItems: [itemToBeUpdated, itemToBeRemoved],
    });

    const itemToBeAdded = makeOrderItem({ product });

    const orderRepository = new OrderRepository();
    await orderRepository.update(order);

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: [{ model: OrderItemModel, as: 'items' }],
    });

    expect(orderModel.toJSON()).toStrictEqual({
      id: order.id,
      customer_id: order.customerId,
      items: expect.arrayContaining([
        {
          id: itemToBeUpdated.id,
          name: itemToBeUpdated.name,
          price: itemToBeUpdated.price,
          product_id: itemToBeUpdated.productId,
          quantity: itemToBeUpdated.quantity,
          order_id: order.id,
        },
        {
          id: itemToBeAdded.id,
          name: itemToBeAdded.name,
          price: itemToBeAdded.price,
          product_id: itemToBeAdded.productId,
          quantity: itemToBeAdded.quantity,
          order_id: order.id,
        },
      ]),
      total: order.total(),
    });
  });

  test('should find an order', async () => {
    const customer = await makeCustomer();
    const product = await makeProduct();
    const orderItem = makeOrderItem({ product });
    const order = await makeOrder({
      customer,
      orderItems: [orderItem],
    });

    const orderRepository = new OrderRepository();
    const foundOrder = await orderRepository.find(order.id);

    expect(foundOrder).toStrictEqual(order);
  });

  test('should throw an error when order is not found', async () => {
    const orderRepository = new OrderRepository();
    const id = faker.datatype.uuid();

    await expect(orderRepository.find(id)).rejects.toThrow('Order not found');
  });

  test('should find all orders', async () => {
    const customer = await makeCustomer();
    const product = await makeProduct();
    const orderItem = makeOrderItem({ product });
    const order = await makeOrder({
      customer,
      orderItems: [orderItem],
    });

    const orderRepository = new OrderRepository();
    const foundOrders = await orderRepository.findAll();

    expect(foundOrders).toStrictEqual([order]);
  });

  test('should return empty array when no orders were found', async () => {
    const orderRepository = new OrderRepository();
    const orders = await orderRepository.findAll();
    expect(orders).toStrictEqual([]);
  });
});
