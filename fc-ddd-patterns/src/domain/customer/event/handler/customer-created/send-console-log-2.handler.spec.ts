import { SendConsoloLog2WhenCustomerCreatedHandler } from './send-console-log-2.handler';
import { CustomerCreatedEvent } from '../../customer-created.event';
import { Address } from '../../../value-object/address';
import { Customer } from '../../../entity/customer';

describe('SendConsoloLog2WhenCustomerCreatedHandler', () => {
  it('should log the second console log for customer created event to the console', () => {
    const handler = new SendConsoloLog2WhenCustomerCreatedHandler();
    const eventData = {
      dateTimeOccurred: new Date(),
      eventData: {
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
      }
    };

    const customer = new Customer(eventData.eventData.id, eventData.eventData.name);
    customer.address = eventData.eventData.address;

    const event = new CustomerCreatedEvent(customer);

    const consoleLogSpy = jest.spyOn(console, 'log');

    handler.handle(event);

    expect(consoleLogSpy).toHaveBeenCalledWith(
      'Esse é o segundo console.log do evento: CustomerCreated',
      event
    );
  });
});