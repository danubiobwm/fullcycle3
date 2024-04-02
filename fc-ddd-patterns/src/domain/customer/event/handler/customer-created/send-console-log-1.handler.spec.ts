import { SendConsoleLog1WhenCustomerCreatedHandler } from './send-console-log-1.handler';
import { CustomerCreatedEvent } from '../../customer-created.event';
import { Address } from '../../../value-object/address';
import { Customer } from '../../../entity/customer';

describe('SendConsoleLog1WhenCustomerCreatedHandler', () => {
  it('should log the customer created event to the console', () => {
    const handler = new SendConsoleLog1WhenCustomerCreatedHandler();
    const customerData = {
      id: '1',
      name: 'John Doe',
      address: new Address({
        street: 'Main Street',
        number: 1920,
        city: 'New York',
        state: 'New York',
        zip: '10044',
      }),
      isActive: false,
      rewardedPoints: 0
    };
    const customer = new Customer(customerData.id, customerData.name);
    customer.address = customerData.address;


    const event = new CustomerCreatedEvent(customer);

    const consoleLogSpy = jest.spyOn(console, 'log');

    handler.handle(event);

    expect(consoleLogSpy).toHaveBeenCalledWith(
      'Esse é o primeiro console.log do evento: CustomerCreated',
      event
    );
  });
});