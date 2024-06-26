export interface ListProductOutputDto {
  products: {
    id: string;
    name: string;
    price: number;
    createdAt: Date;
  }[];
}
