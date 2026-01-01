import Id from "../../../@shared/domain/value-object/id.value-object";
import { Invoice } from "../../domain/entity/invoice.entity";
import { InvoiceItem } from "../../domain/entity/invoice-item.entity";
import { Address } from "../../domain/value-object/address.vo";
import { InvoiceGateway } from "../../gateway/invoice.gateway";
import {
  GenerateInvoiceUseCaseInputDto,
  GenerateInvoiceUseCaseOutputDto,
} from "./generate-invoice.dto";

export class GenerateInvoiceUseCase {
  constructor(private invoiceRepository: InvoiceGateway) { }

  async execute(
    input: GenerateInvoiceUseCaseInputDto
  ): Promise<GenerateInvoiceUseCaseOutputDto> {
    const address = new Address(
      input.street,
      input.number,
      input.complement,
      input.city,
      input.state,
      input.zipCode
    );

    const items = input.items.map(
      (item) =>
        new InvoiceItem(
          item.id ? new Id(item.id) : new Id(),
          item.name,
          item.price
        )
    );

    const invoice = new Invoice(
      new Id(),
      input.name,
      input.document,
      address,
      items
    );

    await this.invoiceRepository.generate(invoice);

    return {
      id: invoice.id.id,
      name: invoice.name,
      document: invoice.document,
      street: address.street,
      number: address.number,
      complement: address.complement,
      city: address.city,
      state: address.state,
      zipCode: address.zipCode,
      items: input.items,
      total: invoice.total(),
    };
  }
}
