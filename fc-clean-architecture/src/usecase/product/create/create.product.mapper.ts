export default class CreateProductMapper {
    static toOutputDto(product: { id: string; name: string; price: number; }) {
        return {
            id: product.id,
            name: product.name,
            price: product.price,
        };
    }
}
