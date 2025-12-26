import { OrderStatus } from "@/interfaces/Product";

export interface BtnBillProps {
  status: OrderStatus;
}

const PayBtn = () => {
  return <button className="action-btn bg-blue-500">Pay</button>;
};

const ViewBtn = () => {
  return <button className="action-btn bg-green-400">View</button>;
};

export default function BtnBill(props: BtnBillProps) {
  return (
    <>
      {props.status === OrderStatus.PENDING ? (
        <PayBtn />
      ) : props.status === OrderStatus.PAID ? (
        <ViewBtn />
      ) : (
        <></>
      )}
    </>
  );
}
