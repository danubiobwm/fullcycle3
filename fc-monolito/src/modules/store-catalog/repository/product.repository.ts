import Id from "../../@shared/domain/value-object/id.value-object";
import Product from "../domain/product.entity";
import ProductGateway from "../gateway/product.gateway";
import ProductStoreModel from "./product.model";

export default class ProductRepository implements ProductGateway {
  async findAll(): Promise<Product[]> {
    try {
      console.log('Buscando todos os produtos na base de dados');
      const products = await ProductStoreModel.findAll();
      if(products.length == 0){ 
        console.error('consulta FindAllProducts nao retornou resultados');
      }
      return products.map(
        (product) =>
          new Product({
            id: new Id(product.id),
            name: product.name,
            description: product.description,
            salesPrice: product.purchasePrice,
          })
      );
    } catch (error) {
      console.error('Erro ao buscar todos os produtos:', error);
      throw error;
    }
  }
  async find(id: string): Promise<Product> {
    console.log('Buscando produto com ID:', id);
    try {
      const product = await ProductStoreModel.findOne({
        where: {
          id: id,
        },
      });
      console.log('Produto encontrado:', product);
      return new Product({
        id: new Id(product.id),
        name: product.name,
        description: product.description,
        salesPrice: product.purchasePrice,
      });
    } catch (error) {
      console.error('Erro ao buscar produto:', error);
      throw error;
    }
  }
}
