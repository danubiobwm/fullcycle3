import { SendConsoleLogWhenCustomerChangedAddressHandler } from './send-console-log-1.handler';
import { CustomerChangedAddressEvent } from '../../customer-changed-address.event'
import { Customer } from '../../../entity/customer';
import { Address } from '../../../value-object/address';

describe('SendConsoleLogWhenCustomerChangedAddressHandler', () => {
  it('should log the customer address change event to the console', () => {
    const handler = new SendConsoleLogWhenCustomerChangedAddressHandler();
    const customerData = {
      id: '1',
      name: 'John Doe',
      address: new Address({
        street: 'Main Street',
        number: 1920,
        city: 'New York',
        state: 'New York',
        zip: '10044',
      })
    };

    const customer = new Customer(customerData.id, customerData.name);
    customer.address = customerData.address;
    customer.activate();
    const event = new CustomerChangedAddressEvent(customer);

    const consoleLogSpy = jest.spyOn(console, 'log');

    handler.handle(event);

    expect(consoleLogSpy).toHaveBeenCalledWith(`Endereço do cliente: ${customer.id}, ${customer.name} alterado para ${customer.address}`);
  });
});