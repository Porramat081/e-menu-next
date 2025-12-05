"use client";

import EmptyItem from "@/components/items/EmptyItem";
import { CartItemType } from "@/interfaces/Menu";
import useCart, { DirectionQty } from "@/stores/cart";
import { Minus, Plus } from "lucide-react";
import { useRouter } from "next/navigation";

const ItemRow = (props: CartItemType) => {
  const { updateQty } = useCart();
  const handlePlus = () => {
    updateQty(props.id, 1, DirectionQty.Plus);
  };

  const handleMinus = () => {
    updateQty(props.id, 1, DirectionQty.Minus);
  };
  return (
    <tr>
      <td>{props.title}</td>
      <td>{`${props.unitPrice} x ${props.qty} = ${
        props.unitPrice * props.qty
      }`}</td>
      <td className="flex justify-center">
        <div className="flex items-center gap-2">
          <button
            onClick={handleMinus}
            className="qty-btn bg-red-500 text-white"
          >
            <Minus size={14} />
          </button>
          <span>{props.qty}</span>
          <button
            onClick={handlePlus}
            className="qty-btn bg-green-500 text-white"
          >
            <Plus size={14} />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default function CartPage() {
  const { cartItems, clearCart } = useCart();
  const router = useRouter();
  const handleSubmitOrder = () => {
    console.log("call submit order api");
    clearCart();
  };
  const totalQty = () => {
    return cartItems.reduce((sum, item) => sum + item.qty, 0);
  };
  return (
    <div>
      {cartItems.length > 0 ? (
        <>
          <div className="px-5 pt-2">
            <h1 className="font-semibold text-lg">Cart</h1>
          </div>
          <div className="p-4">
            <table className="table">
              <thead>
                <tr>
                  <th>Menu</th>
                  <th>Price</th>
                  <th>Qty</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item, index) => (
                  <ItemRow key={"ItemRow" + index} {...item} />
                ))}
              </tbody>
              <tfoot className="bg-gray-50 border-t border-gray-400">
                <tr>
                  <td
                    className="px-4 py-2 text-right text-sm font-medium text-gray-700"
                    colSpan={2}
                  >
                    Total
                  </td>

                  <td className="px-4 py-2 text-center text-sm font-semibold text-gray-900">
                    {cartItems
                      .reduce((sum, item) => sum + item.unitPrice * item.qty, 0)
                      .toFixed(2)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </>
      ) : (
        <EmptyItem message="Your Cart Is Empty" />
      )}

      <div className="flex items-center justify-center gap-4">
        {totalQty() > 0 && (
          <button
            onClick={handleSubmitOrder}
            className="action-btn w-[100px] bg-blue-300"
          >
            Submit
          </button>
        )}
        <button
          className="action-btn bg-gray-300 w-[100px]"
          onClick={() => router.replace("/menu")}
        >
          Menu
        </button>
      </div>
    </div>
  );
}
