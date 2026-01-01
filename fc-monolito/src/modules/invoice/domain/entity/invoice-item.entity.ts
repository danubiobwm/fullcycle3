import Id from "../../../@shared/domain/value-object/id.value-object";

export class InvoiceItem {
  constructor(
    public readonly id: Id,
    public readonly name: string,
    public readonly price: number
  ) { }
}
