"use client";
import BtnBill from "@/components/form/BtnBill";
import EmptyItem from "@/components/items/EmptyItem";
import { CartItemType, OrderType } from "@/interfaces/Menu";
import { formatTime } from "@/utils/format";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const mock_bill_item1: OrderType = {
  id: "Bill1",
  date: new Date(),
  status: "unpaid",
  itemList: [{ id: "1", title: "Demo Item 1", unitPrice: 100, qty: 4 }],
};
const mock_bill_item2: OrderType = {
  id: "Bill2",
  date: new Date(),
  status: "unpaid",
  itemList: [{ id: "2", title: "Demo Item 2", unitPrice: 100, qty: 2 }],
};
const mock_bills = [mock_bill_item1, mock_bill_item2];
export default function Page() {
  const [orders, setOrders] = useState<OrderType[]>(mock_bills);

  const router = useRouter();
  return (
    <div className="container ">
      {orders.length > 0 ? (
        <div className="p-4 flex flex-col gap-4">
          {orders.map((order, index) => (
            <React.Fragment key={"bill-table" + index}>
              <table className="table">
                <caption className="mb-2">
                  <div className="flex items-center justify-between px-2">
                    <h2>{`Order : ${formatTime(order.date)}`}</h2>
                    <div className="px-2 py-1 bg-red-400 text-white text-sm font-semibold rounded-lg">
                      {order.status}
                    </div>
                  </div>
                </caption>
                <thead>
                  <tr>
                    <th>Menu</th>
                    <th>Qty</th>
                    <th>Total Price</th>
                  </tr>
                </thead>
                <tbody>
                  {order.itemList.map((item, index) => (
                    <tr key={"bill-item" + index}>
                      <td>{item.title}</td>
                      <td>{item.qty}</td>
                      <td>{item.qty * item.unitPrice}</td>
                    </tr>
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
                      {order.itemList
                        .reduce(
                          (sum, item) => sum + item.unitPrice * item.qty,
                          0
                        )
                        .toFixed(2)}
                    </td>
                  </tr>
                </tfoot>
              </table>
              <div className="flex justify-end">
                <BtnBill
                  status={
                    order.status as
                      | "unpaid"
                      | "paid"
                      | "inprogress"
                      | "finish"
                      | "delivered"
                  }
                />
              </div>
            </React.Fragment>
          ))}
        </div>
      ) : (
        <EmptyItem message="You still don't have any order" />
      )}
      <div className="flex justify-center">
        <button
          onClick={() => router.replace("/menu")}
          className="action-btn bg-blue-400"
        >
          Menu
        </button>
      </div>
    </div>
  );
}
