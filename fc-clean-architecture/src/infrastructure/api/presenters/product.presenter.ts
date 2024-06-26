import { toXML } from 'jstoxml';
import { OutputListProductDto } from '../../../usecase/product/list/list.product.dto';
import { xmlOptionConfig } from './presenter.config';

export default class ProductPresenter {
  static listXML(data: OutputListProductDto): string {
    return toXML({
      products: {
        product: data.products.map((product) => ({
          id: product.id,
          name: product.name,
          price: product.price,
        })),
      },
    }, xmlOptionConfig);
  }
}
