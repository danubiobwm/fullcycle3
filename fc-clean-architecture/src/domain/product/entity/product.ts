import NotificationError from '../../@shared/notification/notification.error';
import ProductBaseYupValidator from '../validator/product-base.yup.validator';
import ProductBase from './product-base.abstract';

export default class Product extends ProductBase {
  constructor(id: string, name: string, price: number) {
    super(id, name, price);
    this.validate();
    if (this.notification.hasErrors()) {
      throw new NotificationError(this.notification.getErrors());
    }
  }

  validate(): void {
    const validator = new ProductBaseYupValidator();
    validator.validate(this);
  }

  changeName(newName: string): this {
    this._name = newName;
    this.validate();
    if (this.notification.hasErrors()) {
      throw new NotificationError(this.notification.getErrors());
    }
    return this;
  }

  changePrice(newPrice: number): this {
    this._price = newPrice;
    this.validate();
    if (this.notification.hasErrors()) {
      throw new NotificationError(this.notification.getErrors());
    }
    return this;
  }
}