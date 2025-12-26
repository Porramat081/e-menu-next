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
  category?: string;
}

export interface ProductFetchType {
  id: string;
  name: string;
  price: number;
  stock: number;
  description: string;
  category: { name: string };
  images: { downloadUrl: string }[];
}

export interface ProductListType {
  id: string;
  name: string;
  price: number;
  stock: number;
  status?: ProductStatus;
  description: string;
  category: string;
  picUrl: string;
  images: any;
}

export enum OrderStatus {
  PENDING = "PENDING",
  PAID = "PAID",
  PROCESSING = "PROCESSING",
  FINISHED = "FINISHED",
  DELIVERED = "DELIVERED",
  CANCELLED = "CANCELLED",
}
