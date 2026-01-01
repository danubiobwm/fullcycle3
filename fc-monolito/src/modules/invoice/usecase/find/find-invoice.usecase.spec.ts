import { InvoiceRepository } from "../../repository/invoice.repository";
import { GenerateInvoiceUseCase } from "../generate/generate-invoice.usecase";
import { FindInvoiceUseCase } from "./find-invoice.usecase";

describe("FindInvoiceUseCase", () => {
  it("should find an invoice", async () => {
    const repository = new InvoiceRepository();

    const generateUseCase = new GenerateInvoiceUseCase(repository);
    const findUseCase = new FindInvoiceUseCase(repository);

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

    const generated = await generateUseCase.execute(input);

    const result = await findUseCase.execute({
      id: generated.id,
    });

    expect(result.id).toBe(generated.id);
    expect(result.name).toBe(input.name);
    expect(result.document).toBe(input.document);
    expect(result.total).toBe(300);
    expect(result.items.length).toBe(2);
    expect(result.createdAt).toBeInstanceOf(Date);
  });

  it("should throw error when invoice not found", async () => {
    const repository = new InvoiceRepository();
    const useCase = new FindInvoiceUseCase(repository);

    await expect(
      useCase.execute({ id: "not-found" })
    ).rejects.toThrow("Invoice not found");
  });
});
