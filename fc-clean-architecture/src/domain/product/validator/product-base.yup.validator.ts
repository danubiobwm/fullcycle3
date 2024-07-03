import ValidatorInterface from '../../@shared/validator/validator.interface';
import * as yup from 'yup';
import ProductBase from '../entity/product-base.abstract';

export default class ProductBaseYupValidator implements ValidatorInterface<ProductBase> {
  validate(entity: ProductBase): void {
    try {
      yup
        .object()
        .shape({
          id: yup.string()
            .required('Id is required')
            .matches(/^[a-zA-Z0-9\-]+$/, 'Id must be alphanumeric with dashes allowed'),
          name: yup.string()
            .required('Name is required')
            .min(3, 'Name must be at least 3 characters')
            .max(50, 'Name must be at most 50 characters'),
          price: yup.number()
            .required('Price is required')
            .min(0, 'Price must be greater than zero'),
        })
        .validateSync(
          {
            id: entity.id,
            name: entity.name,
            price: entity.price,
          },
          {
            abortEarly: false,
          }
        );
    } catch (errors) {
      const e = errors as yup.ValidationError;
      const errorMessages = e.inner.reduce((acc, error) => {
        if (!acc.includes(error.message)) {
          acc.push(`product: ${error.message}`);
        }
        return acc;
      }, [] as string[]);
      const concatenatedErrorMessages = errorMessages.join(',');
      throw new Error(concatenatedErrorMessages);
    }
  }
}
