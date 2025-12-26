export default function DayRangeFilter({ to, from, setTo, setFrom }: any) {
  return (
    <div className="flex items-center justify-between gap-2">
      <label htmlFor="from-input" className="flex items-center gap-2">
        <span>From</span>
        <input
          name="from-input"
          className="border px-2 py-1 rounded-md"
          type="date"
          value={from}
          max={to}
          onChange={(e) => setFrom(e.target.value)}
        />
      </label>

      <label className="flex items-center gap-2">
        <span>To</span>
        <input
          className="border px-2 py-1 rounded-md"
          type="date"
          value={to}
          min={from}
          onChange={(e) => setTo(e.target.value)}
        />
      </label>
    </div>
  );
}
