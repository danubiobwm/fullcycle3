import { FindInvoiceUseCase } from "../usecase/find/find-invoice.usecase";
import { GenerateInvoiceUseCase } from "../usecase/generate/generate-invoice.usecase";
import { InvoiceFacadeInterface } from "./invoice.facade.interface";

export class InvoiceFacade implements InvoiceFacadeInterface {
  constructor(
    private readonly findUseCase: FindInvoiceUseCase,
    private readonly generateUseCase: GenerateInvoiceUseCase
  ) { }

  find(input: any) {
    return this.findUseCase.execute(input);
  }

  generate(input: any) {
    return this.generateUseCase.execute(input);
  }
}
