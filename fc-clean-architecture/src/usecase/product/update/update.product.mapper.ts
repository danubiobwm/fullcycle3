export default class UpdateProductMapper {
    static toOutputDto(product: { id: string; name: string; price: number; }) {
        return {
            id: product.id,
            name: product.name,
            price: product.price,
        };
    }
}
