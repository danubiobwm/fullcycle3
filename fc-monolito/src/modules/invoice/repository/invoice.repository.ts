import { InvoiceGateway } from "../gateway/invoice.gateway";
import { Invoice } from "../domain/entity/invoice.entity";

export class InvoiceRepository implements InvoiceGateway {
  private invoices: Invoice[] = [];

  async generate(invoice: Invoice): Promise<void> {
    this.invoices.push(invoice);
  }

  async find(id: string): Promise<Invoice> {
    const invoice = this.invoices.find((inv) => inv.id.id === id);

    if (!invoice) {
      throw new Error("Invoice not found");
    }

    return invoice;
  }
}
