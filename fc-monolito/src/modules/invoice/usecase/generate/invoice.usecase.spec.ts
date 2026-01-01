import { InvoiceRepository } from "../../repository/invoice.repository";
import { GenerateInvoiceUseCase } from "./generate-invoice.usecase";

describe("GenerateInvoiceUseCase", () => {
  it("should generate an invoice", async () => {
    const repository = new InvoiceRepository();
    const useCase = new GenerateInvoiceUseCase(repository);

    const input = {
      name: "Cliente 1",
      document: "123456789",
      street: "Rua A",
      number: "10",
      complement: "Casa",
      city: "São Paulo",
      state: "SP",
      zipCode: "00000-000",
      items: [
        { id: "1", name: "Item 1", price: 100 },
        { id: "2", name: "Item 2", price: 200 },
      ],
    };

    const result = await useCase.execute(input);

    expect(result.id).toBeDefined();
    expect(result.name).toBe(input.name);
    expect(result.document).toBe(input.document);
    expect(result.total).toBe(300);
    expect(result.items.length).toBe(2);
  });
});
