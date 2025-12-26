"use client";
import BtnBill from "@/components/form/BtnBill";
import EmptyItem from "@/components/items/EmptyItem";
import { CartItemType, OrderType } from "@/interfaces/Menu";
import { errorAlert } from "@/utils/alertSwal";
import { formatTime } from "@/utils/format";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import useLoading from "@/stores/loader";
import { getOrder } from "@/apis/order";
import ThumbnailPic from "@/components/ui/ThumbnailPic";
import Loader from "@/components/structure/Loader";
import Image from "next/image";
import QRCode from "react-qr-code";
import { OrderStatus } from "@/interfaces/Product";

export default function Page() {
  const [order, setOrder] = useState<OrderType | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<"Cash" | "PromptPay">(
    "PromptPay"
  );
  const { isLoading, startLoading, stopLoading } = useLoading();
  const { id } = useParams();
  const router = useRouter();

  const fetchOrder = async () => {
    try {
      startLoading();
      const res = await getOrder(id as string);
      console.log(res.data);
      if (res.data) {
        setOrder(res.data);
      }
    } catch (err) {
      errorAlert("Fetch Order Unsuccessfully", err);
    } finally {
      stopLoading();
    }
  };

  useEffect(() => {
    fetchOrder();
  }, [id]);

  return (
    <div className="container pb-8">
      {order ? (
        <div className="p-4 flex flex-col gap-4">
          <table className="table">
            <caption className="mb-2">
              <div className="flex items-center justify-between px-2">
                <h2>{`Order : ${formatTime(order.orderDateTime)}`}</h2>
                <div className="px-2 py-1 bg-red-400 text-white text-sm font-semibold rounded-lg">
                  {order.orderStatus}
                </div>
              </div>
            </caption>
            <thead>
              <tr>
                <th></th>
                <th>Menu</th>
                <th>Qty</th>
                <th>Total Price</th>
              </tr>
            </thead>
            <tbody>
              {order.orderItems.map((item, index) => (
                <tr key={"bill-item" + index}>
                  <td className="pl-4">
                    <ThumbnailPic
                      imgUrl={item.product.images[0].downloadUrl}
                      alt="thumbnail-image"
                    />
                  </td>
                  <td>{item.product.name}</td>
                  <td>{item.quantity}</td>
                  <td>{item.quantity * item.unitPrice}</td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-gray-50 border-t border-gray-400">
              <tr>
                <td
                  className="px-4 py-2 text-right text-sm font-medium text-gray-700"
                  colSpan={3}
                >
                  Total
                </td>

                <td className="px-4 py-2 text-center text-sm font-semibold text-gray-900">
                  {order.orderItems
                    .reduce(
                      (sum, item) => sum + item.unitPrice * item.quantity,
                      0
                    )
                    .toFixed(2)}
                </td>
              </tr>
            </tfoot>
          </table>
          <div>{order.queue}</div>
          <>
            {paymentMethod === "PromptPay" ? (
              <div className="flex h-[450px] bg-gray-200 mx-auto w-[300px] relative justify-center">
                <Image
                  src={order.paymentResponse.paymentRef}
                  alt="payment-ref"
                  fill
                  unoptimized
                  className="object-contain object-center origin-center"
                />
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2 font-semibold text-2xl">
                <span>Pay By Cash</span>
                <div>
                  <QRCode value={order.orderRef || "demo"} />
                </div>
              </div>
            )}
          </>
        </div>
      ) : (
        <>
          {isLoading ? (
            <div className="flex justify-center items-center py-4">
              <Loader isPage />
            </div>
          ) : (
            <EmptyItem message="You still don't have any order" />
          )}
        </>
      )}

      <div className="flex items-center gap-4 flex-col">
        <div>
          <select
            onChange={(e) =>
              setPaymentMethod(e.target.value as "PromptPay" | "Cash")
            }
            value={paymentMethod}
            className="border rounded-lg py-2 px-3 "
          >
            <option value="PromptPay">QR PromptPay</option>
            <option value="Cash">Cash</option>
          </select>
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => router.replace("/menu")}
            className="action-btn bg-blue-400"
          >
            Menu
          </button>
        </div>
      </div>
    </div>
  );
}
