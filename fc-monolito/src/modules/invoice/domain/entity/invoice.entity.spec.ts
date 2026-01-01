import Id from "../../../@shared/domain/value-object/id.value-object";
import { Invoice } from "./invoice.entity";
import { InvoiceItem } from "./invoice-item.entity";
import { Address } from "../value-object/address.vo";

describe("Invoice Entity", () => {
  it("should calculate total correctly", () => {
    const address = new Address(
      "Rua 1",
      "100",
      "Apto 1",
      "São Paulo",
      "SP",
      "00000-000"
    );

    const items = [
      new InvoiceItem(new Id("1"), "Item 1", 100),
      new InvoiceItem(new Id("2"), "Item 2", 200),
    ];

    const invoice = new Invoice(
      new Id("invoice-1"),
      "Cliente",
      "123",
      address,
      items
    );

    expect(invoice.total()).toBe(300);
  });
});
