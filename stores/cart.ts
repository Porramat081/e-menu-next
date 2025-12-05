import { CartItemType } from "@/interfaces/Menu";
import { create } from "zustand";

export enum DirectionQty {
  Plus = "Plus",
  Minus = "Minus",
}

interface Store {
  cartItems: CartItemType[];
  addCartItem: (newItem: CartItemType) => void;
  removeCartItem: (itemId: string) => void;
  updateQty: (itemInput: CartItemType, num: number, dir: DirectionQty) => void;
  clearCart: () => void;
}

export default create<Store>()((set) => ({
  cartItems: [],
  addCartItem: (newItem) =>
    set((state) => ({ cartItems: [...state.cartItems, newItem] })),
  removeCartItem: (itemId) =>
    set((state) => ({
      cartItems: state.cartItems.filter((item) => item.id !== itemId),
    })),
  updateQty: (itemInput, num, dir) =>
    set((state) => {
      if (dir == "Plus") {
        if (state.cartItems.find((item) => item.id === itemInput.id)) {
          return {
            cartItems: state.cartItems.map((item) =>
              item.id === itemInput.id ? { ...item, qty: item.qty + num } : item
            ),
          };
        } else {
          console.log("add");
          return { cartItems: [...state.cartItems, itemInput] };
        }
      } else if (dir == "Minus") {
        return {
          cartItems: state.cartItems.map((item) =>
            item.id === itemInput.id && item.qty - num >= 0
              ? { ...item, qty: item.qty - num }
              : item
          ),
        };
      }
      return { cartItems: state.cartItems };
    }),
  clearCart: () => set(() => ({ cartItems: [] })),
}));
