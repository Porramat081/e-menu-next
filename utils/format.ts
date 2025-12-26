import { FilterType, SelectorType } from "@/components/items/FilterOrder";

export const formatTime = (date: string) => {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  })
    .format(new Date(date))
    .replace(",", "")
    .toUpperCase();
};

export function toYMD(d: Date) {
  // local date -> YYYY-MM-DD
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

export const sortOrderFunction = (order1: any, order2: any, filter?: any) => {
  const updateDate1 = new Date(order1.updateDateTime);
  const updateDate2 = new Date(order2.updateDateTime);

  if (
    filter === FilterType.LASTUPDATE || !filter
      ? updateDate1 > updateDate2
      : updateDate1 < updateDate2
  ) {
    return -1;
  }
  return 1;
};
