import Entity from '../../@shared/entity/entity.abstract';
import NotificationError from '../../@shared/notification/notification.error';
import ProductBaseValidatorFactory from '../factory/product-base.validator.factory';
import ProductInterface from './product.interface';

export default abstract class ProductBase extends Entity implements ProductInterface {
  protected _name: string;
  protected _price: number;

  constructor(id: string, name: string, price: number) {
    super();
    this._id = id;
    this._name = name;
    this._price = price;
    this.validate();
    if (this.notification.hasErrors()) {
      throw new NotificationError(this.notification.getErrors());
    }
  }
  get name(): string {
    return this._name;
  }

  get price(): number {
    return this._price;
  }

  changeName(name: string): this {
    this._name = name;
    this.validate();
    return this;
  }

  changePrice(price: number): this {
    this._price = price;
    this.validate();
    return this;
  }

  validate(): void {
    ProductBaseValidatorFactory.create().validate(this);
  }
}
