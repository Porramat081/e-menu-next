"use client";

import { createOrder } from "@/apis/order";
import EmptyItem from "@/components/items/EmptyItem";
import ImageProduct from "@/components/ui/ImageProduct";
import { CartItemType } from "@/interfaces/Menu";
import useCart, { DirectionQty } from "@/stores/cart";
import { errorAlert } from "@/utils/alertSwal";
import { Minus, Plus } from "lucide-react";
import { useRouter } from "next/navigation";

const ItemRow = (props: CartItemType) => {
  const { updateQty } = useCart();
  const handlePlus = () => {
    updateQty(props, 1, DirectionQty.Plus);
  };

  const handleMinus = () => {
    updateQty(props, 1, DirectionQty.Minus);
  };
  return (
    <tr className="grid grid-cols-2">
      <td className="col-span-1">
        <div className="flex items-center gap-2 pl-2">
          <div className="relative w-[50px] h-[50px] overflow-clip rounded-full">
            <ImageProduct imageUrl={props.imageUrl} />
          </div>
          <span className="">{props.title}</span>
        </div>
      </td>
      <td className="col-span-1">
        <div>
          {`${props.unitPrice} x ${props.qty} = ${props.unitPrice * props.qty}`}
        </div>
        <div className="flex justify-center mt-2 items-center gap-2">
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
  const handleSubmitOrder = async () => {
    try {
      const res = await createOrder({
        productLists: cartItems.map((item) => ({
          productId: item.id,
          quantity: item.qty,
        })),
      });
    } catch (err) {
      errorAlert("Create Order Failure", err);
    }
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
            <table className="table max-w-[800px] mx-auto">
              <thead>
                <tr className="grid grid-cols-2">
                  <th>Menu</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item, index) => (
                  <ItemRow key={"ItemRow" + index} {...item} />
                ))}
              </tbody>
              <tfoot className="bg-gray-50 border-t border-gray-400">
                <tr className="grid grid-cols-2">
                  <td className="px-4 py-2 text-right text-sm font-medium text-gray-700">
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
