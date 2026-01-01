import { InvoiceFacadeFactory } from "../factory/invoice.facade.factory";

describe("Invoice Facade", () => {
  it("should generate and find an invoice", async () => {
    const facade = InvoiceFacadeFactory.create();

    const input = {
      name: "Cliente Facade",
      document: "999999999",
      street: "Rua Facade",
      number: "123",
      complement: "Bloco A",
      city: "São Paulo",
      state: "SP",
      zipCode: "00000-000",
      items: [
        { id: "1", name: "Item 1", price: 150 },
        { id: "2", name: "Item 2", price: 250 },
      ],
    };

    const generated = await facade.generate(input);

    expect(generated.id).toBeDefined();
    expect(generated.total).toBe(400);

    const found = await facade.find({ id: generated.id });

    expect(found.id).toBe(generated.id);
    expect(found.name).toBe(input.name);
    expect(found.items.length).toBe(2);
    expect(found.total).toBe(400);
  });
});
