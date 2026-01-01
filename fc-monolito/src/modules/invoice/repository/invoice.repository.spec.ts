import { InvoiceRepository } from "./invoice.repository";
import { Invoice } from "../domain/entity/invoice.entity";
import { InvoiceItem } from "../domain/entity/invoice-item.entity";
import { Address } from "../domain/value-object/address.vo";
import Id from "../../@shared/domain/value-object/id.value-object";

describe("Invoice Repository", () => {
  it("should persist and retrieve invoice", async () => {
    const repository = new InvoiceRepository();

    const address = new Address(
      "Rua X",
      "1",
      "",
      "São Paulo",
      "SP",
      "00000-000"
    );

    const items = [
      new InvoiceItem(new Id("1"), "Item 1", 100),
    ];

    const invoice = new Invoice(
      new Id("inv-1"),
      "Cliente Repo",
      "123",
      address,
      items
    );

    await repository.generate(invoice);

    const result = await repository.find("inv-1");

    expect(result.id.id).toBe("inv-1");
    expect(result.total()).toBe(100);
  });
});
