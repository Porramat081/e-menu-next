export interface BtnBillProps {
  status: "unpaid" | "paid" | "inprogress" | "finish" | "delivered";
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
      {props.status === "unpaid" ? (
        <PayBtn />
      ) : props.status === "paid" ? (
        <ViewBtn />
      ) : (
        <></>
      )}
    </>
  );
}
