import AggregateRoot from "../../../@shared/domain/entity/aggregate-root.interface";
import Id from "../../../@shared/domain/value-object/id.value-object";
import { Address } from "../value-object/address.vo";
import { InvoiceItem } from "./invoice-item.entity";

export class Invoice implements AggregateRoot {
  constructor(
    public readonly id: Id,
    public readonly name: string,
    public readonly document: string,
    public readonly address: Address,
    public readonly items: InvoiceItem[],
    public readonly createdAt: Date = new Date(),
    public readonly updatedAt: Date = new Date()
  ) { }

  total(): number {
    return this.items.reduce((total, item) => total + item.price, 0);
  }
}
