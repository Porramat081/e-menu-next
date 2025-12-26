import { useEffect, useState } from "react";

interface FilterOrderProps {
  orders: any[];
  setFunction: (selector: any, filter: any) => void;
}

export enum FilterType {
  LASTUPDATE = "LASTUPDATE",
  EARLYUPDATE = "EARLYUPDATE",
}

export enum SelectorType {
  ALL = "ALL",
  PENDING = "PENDING",
  PAID = "PAID",
  PROCESSING = "PROCESSING",
  FINISHED = "FINISHED",
  DELIVERED = "DELIVERED",
  CANCELLED = "CANCELLED",
}

export default function FilterOrder(props: FilterOrderProps) {
  const [selector, setSelector] = useState<SelectorType>(SelectorType.ALL);
  const [filter, setFilter] = useState<FilterType>(FilterType.LASTUPDATE);

  useEffect(() => {
    props.setFunction(selector, filter);
  }, [selector, filter]);

  return (
    <div className="flex items-center justify-between">
      <div>
        <select
          onChange={(e) => setSelector(e.target.value as SelectorType)}
          className="border rounded-lg py-2 px-3 "
        >
          <option value={SelectorType.ALL}>All</option>
          <option value={SelectorType.PENDING}>Pending</option>
          <option value={SelectorType.PROCESSING}>Processing</option>
          <option value={SelectorType.FINISHED}>Finished</option>
          <option value={SelectorType.DELIVERED}>Delivered</option>
          <option value={SelectorType.CANCELLED}>Cancelled</option>
        </select>
      </div>

      <div>
        <select
          onChange={(e) => setFilter(e.target.value as FilterType)}
          className="border rounded-lg py-2 px-3"
        >
          <option value={FilterType.LASTUPDATE}>Last Update</option>
          <option value={FilterType.EARLYUPDATE}>Early Update</option>
        </select>
      </div>
    </div>
  );
}
