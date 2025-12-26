import { deleteOrder, updateOrderStatus } from "@/apis/order";
import { OrderStatus } from "@/interfaces/Product";
import { confirmBox, errorAlert, successAlert } from "@/utils/alertSwal";
import { Trash, X } from "lucide-react";
import { useEffect, useState } from "react";

export default function BtnOrder({
  orderId,
  orderStatus,
  orderFetch,
}: {
  orderId: string;
  orderStatus: OrderStatus;
  orderFetch: () => void;
}) {
  const [label, setLabel] = useState("");

  const handleClick = async (isCancel?: boolean) => {
    try {
      if (isCancel) {
        const res = await updateOrderStatus(orderId, OrderStatus.CANCELLED);
        if (res.data) {
          successAlert("Cancel Order Successfully");
          await orderFetch();
        }
        return;
      }

      let newOrder: OrderStatus | "" = "";

      switch (orderStatus) {
        case OrderStatus.PAID:
          newOrder = OrderStatus.PROCESSING;
          break;
        case OrderStatus.PROCESSING:
          newOrder = OrderStatus.FINISHED;
          break;
        case OrderStatus.FINISHED:
          newOrder = OrderStatus.DELIVERED;
          break;
        case OrderStatus.CANCELLED:
          newOrder = OrderStatus.PENDING;
          break;
        default:
          newOrder = "";
      }

      if (newOrder) {
        const res = await updateOrderStatus(orderId, newOrder);
        if (res.data) {
          successAlert("Update Order Successfully");
          await orderFetch();
        }
        return;
      }
    } catch (err) {
      errorAlert("Update Order Unsuccessfully", err);
    }
  };

  useEffect(() => {
    switch (orderStatus) {
      case OrderStatus.PAID:
        setLabel("Start Order");
        break;
      case OrderStatus.PROCESSING:
        setLabel("Finish Order");
        break;
      case OrderStatus.FINISHED:
        setLabel("Delivery Order");
        break;
      case OrderStatus.CANCELLED:
        setLabel("Revoke Order");
        break;
      default:
        setLabel("Order Complete");
        break;
    }
  }, [orderStatus]);

  return (
    <>
      {orderStatus !== OrderStatus.CANCELLED && (
        <div className="flex justify-center items-center gap-2">
          {orderStatus !== OrderStatus.DELIVERED && (
            <button
              onClick={() => handleClick(true)}
              type="button"
              className="action-btn"
            >
              Cancel
            </button>
          )}
          {orderStatus !== OrderStatus.PENDING && (
            <button
              onClick={() => handleClick()}
              type="button"
              className="action-btn bg-blue-400"
            >
              {label}
            </button>
          )}
        </div>
      )}
    </>
  );
}

export const DeleteOrderBtn = ({
  orderId,
  fetchData,
}: {
  orderId: string;
  fetchData: () => void;
}) => {
  const handleClick = async () => {
    try {
      const result = await confirmBox("Do you want to delete this order?");
      if (result.isConfirmed) {
        const res = await deleteOrder(orderId);
        if (res.message) {
          successAlert("Delete Successfully", res.message);
          await fetchData();
        }
      }
    } catch (err) {
      errorAlert("Delete Unsuccessfully", err);
    }
  };
  return (
    <button className="cursor-pointer" onClick={handleClick}>
      <Trash size={16} />
    </button>
  );
};
