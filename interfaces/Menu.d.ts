export interface MenuItemType {
  id: string;
  imageUrl: string;
  name: string;
  price: number;
}

export interface CartItemType {
  id: string;
  title: string;
  unitPrice: number;
  qty: number;
}

export interface OrderType {
  id: string;
  status: string;
  date: Date;
  itemList: CartItemType[];
}
