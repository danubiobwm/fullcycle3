import Product from "../../../domain/product/entity/product";
import { OutputListProductDto } from "./list.product.dto";

export class ListProductMapper {
    static toOutput(products: Product[]): OutputListProductDto {
        return {
            products: products.map(product => ({
                id: product.id,
                name: product.name,
                price: product.price
            }))
        };
    }
}