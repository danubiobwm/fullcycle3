export class ProductTypeNotSupportedException extends Error {
    constructor() {
        super("Product type not supported yet");
    }
}
