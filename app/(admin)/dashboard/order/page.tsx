"use client";

import { getAllOrder } from "@/apis/order";
import BtnOrder, { DeleteOrderBtn } from "@/components/items/BtnOrder";
import DayRangeFilter from "@/components/items/DayRangeFilter";
import FilterOrder, { SelectorType } from "@/components/items/FilterOrder";
import ThumbnailPic from "@/components/ui/ThumbnailPic";
import { errorAlert } from "@/utils/alertSwal";
import { formatTime, sortOrderFunction, toYMD } from "@/utils/format";
import { useCallback, useEffect, useMemo, useState } from "react";

export default function Page() {
  const [orders, setOrders] = useState<any[]>([]);
  const [finalOrders, setFinalOrders] = useState<any[]>([]);

  const today = useMemo(() => new Date(), []);
  const [from, setFrom] = useState(() => {
    const d = new Date(today);
    d.setDate(d.getDate());
    return toYMD(d);
  });
  const [to, setTo] = useState(() => toYMD(today));

  const handleChangeSort = (selector: any, filter: any) => {
    setFinalOrders(() =>
      orders
        .filter((item) =>
          selector !== SelectorType.ALL ? item.orderStatus === selector : item
        )
        .sort((item1, item2) => sortOrderFunction(item1, item2, filter))
    );
  };
  const fetchData = async (from, to) => {
    try {
      const res = await getAllOrder(from, to);
      if (res.data) {
        setOrders(res.data.sort(sortOrderFunction));
        setFinalOrders(res.data.sort(sortOrderFunction));
      }
    } catch (err) {
      errorAlert("Fetch Order Unsuccessfully", err);
    }
  };

  useEffect(() => {
    fetchData(from, to);
  }, [from, to]);

  return (
    <div className="space-y-3 py-4 w-full max-w-[500px] mx-auto">
      <h1 className="font-semibold text-xl mb-6 text-center">
        Order Summary Page
      </h1>

      <div className="space-y-3 mb-4">
        <FilterOrder orders={orders} setFunction={handleChangeSort} />
        <DayRangeFilter from={from} to={to} setFrom={setFrom} setTo={setTo} />
      </div>
      <>
        {finalOrders.length > 0 ? (
          <>
            {finalOrders.map((order, index) => (
              <div key={index} className="font-medium">
                <div className="flex justify-between px-4 mb-3">
                  <h2>
                    {formatTime(order.updateDateTime || order.orderDateTime)}
                  </h2>
                  <div className="flex justify-center items-center gap-2">
                    <span>{order.orderStatus}</span>
                    <DeleteOrderBtn
                      orderId={order.id}
                      fetchData={async () => await fetchData(from, to)}
                    />
                  </div>
                </div>
                <table className="table">
                  <thead>
                    <tr>
                      <th></th>
                      <th>Name</th>
                      <th>Unit Price</th>
                      <th>Qty</th>
                    </tr>
                  </thead>

                  <tbody>
                    {order.orderItems.map((item, index2) => (
                      <tr key={index + "" + index2}>
                        <td className="flex justify-center items-center">
                          <ThumbnailPic
                            imgUrl={item.product.images[0].downloadUrl}
                            alt={"order-thumbnail"}
                          />
                        </td>
                        <td>{item.product.name}</td>
                        <td>{item.product.price}</td>
                        <td>{item.quantity}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="bg-gray-50 border-t border-gray-400">
                      <td
                        className="px-4 py-2 text-right text-sm font-medium text-gray-700"
                        colSpan={4}
                      >
                        {"Total Amount = " + order.totalAmount}
                      </td>
                    </tr>
                  </tfoot>
                </table>

                <div className="p-4 flex justify-center">
                  <BtnOrder
                    orderFetch={async () => await fetchData(from, to)}
                    orderStatus={order.orderStatus}
                    orderId={order.id}
                  />
                </div>
              </div>
            ))}
          </>
        ) : (
          <div className="flex justify-center">No avaliable order</div>
        )}
      </>
    </div>
  );
}
