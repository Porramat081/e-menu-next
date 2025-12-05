interface EmptyItemProps {
  message: string;
}

export default function EmptyItem(props: EmptyItemProps) {
  return (
    <div className="mx-auto container my-4">
      <div className="text-center text-xl font-semibold">{props.message}</div>
    </div>
  );
}
