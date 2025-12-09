import LineChartOne from "./LineChart";

export default function DashboardContainer() {
  return (
    <div className="w-full bg-amber-50">
      {/* header */}
      <div className="w-full grid grid-cols-1 px-8 sm:px-0 sm:grid-cols-4 gap-4">
        <div className="dash-card">
          <div>Topic 1</div>
          <div>250</div>
        </div>
        <div className="dash-card">
          <div>Topic 1</div>
          <div>250</div>
        </div>
        <div className="dash-card">
          <div>Topic 1</div>
          <div>250</div>
        </div>
        <div className="dash-card">
          <div>Topic 1</div>
          <div>250</div>
        </div>
      </div>

      {/* body */}
      <div>
        <LineChartOne />
      </div>

      {/* footer */}
      <div>
        <div className="dash-card">
          <div>Topic 1</div>
          <div>250</div>
        </div>
        <div className="dash-card">
          <div>Topic 1</div>
          <div>250</div>
        </div>
      </div>
    </div>
  );
}
