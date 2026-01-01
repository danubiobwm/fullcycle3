import { InvoiceRepository } from "../repository/invoice.repository";
import { FindInvoiceUseCase } from "../usecase/find/find-invoice.usecase";
import { GenerateInvoiceUseCase } from "../usecase/generate/generate-invoice.usecase";
import { InvoiceFacade } from "../facade/invoice.facade";

export class InvoiceFacadeFactory {
  static create() {
    const repository = new InvoiceRepository();
    const findUseCase = new FindInvoiceUseCase(repository);
    const generateUseCase = new GenerateInvoiceUseCase(repository);

    return new InvoiceFacade(findUseCase, generateUseCase);
  }
}
