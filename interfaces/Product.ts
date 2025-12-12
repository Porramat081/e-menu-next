export enum ProductStatus {
  ACTIVE,
  SUSPEND,
  UNAVALIABLE,
}

export interface ProductObjType {
  name: string;
  price: number;
  stock: number;
  status: ProductStatus;
  description?: string;
}
