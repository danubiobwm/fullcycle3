import ValidatorInterface from '../../@shared/validator/validator.interface';
import ProductBase from '../entity/product-base.abstract';
import ProductBaseYupValidator from '../validator/product-base.yup.validator';

export default class ProductBaseValidatorFactory {
  static create(): ValidatorInterface<ProductBase> {
    return new ProductBaseYupValidator();
  }
}
