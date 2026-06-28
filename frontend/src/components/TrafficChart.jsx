import {
  LineChart, Line, CartesianGrid, XAxis, YAxis,
  Tooltip, ResponsiveContainer, ReferenceLine,
} from "recharts";

function TrafficChart() {
  const data = [
    { time: "6 AM",  traffic: 120 },
    { time: "8 AM",  traffic: 430 },
    { time: "10 AM", traffic: 320 },
    { time: "12 PM", traffic: 510 },
    { time: "2 PM",  traffic: 400 },
    { time: "4 PM",  traffic: 650 },
    { time: "6 PM",  traffic: 820 },
    { time: "8 PM",  traffic: 470 },
  ];

  const peak = Math.max(...data.map(d => d.traffic));

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const v = payload[0].value;
      const level = v >= 700 ? { color: "#DC2626", label: "High" } : v >= 400 ? { color: "#D97706", label: "Medium" } : { color: "#059669", label: "Low" };
      return (
        <div style={{
          background: "white", border: "1px solid #E2E8F0", borderRadius: 12,
          padding: "12px 16px", boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
          fontFamily: "'Inter', system-ui, sans-serif",
        }}>
          <p style={{ margin: "0 0 6px", fontSize: 12, fontWeight: 700, color: "#64748B", textTransform: "uppercase", letterSpacing: "0.5px" }}>{label}</p>
          <p style={{ margin: "0 0 5px", fontSize: 20, fontWeight: 800, color: "#0F172A", letterSpacing: "-0.5px" }}>{v} <span style={{ fontSize: 11, fontWeight: 500, color: "#94A3B8" }}>vehicles</span></p>
          <span style={{ fontSize: 11, fontWeight: 700, padding: "2px 9px", borderRadius: "100px", background: `${level.color}18`, color: level.color }}>{level.label} Congestion</span>
        </div>
      );
    }
    return null;
  };

  const summaryStats = [
    { label: "Peak Hour", value: "6 PM", sub: "820 vehicles" },
    { label: "Avg Flow", value: "465", sub: "vehicles/hr" },
    { label: "Low Point", value: "6 AM", sub: "120 vehicles" },
    { label: "High Risk", value: "2 slots", sub: "above 600" },
  ];

  return (
    <>
      <style>{`
        .tc-root {
          background: white; border-radius: 20px;
          border: 1px solid #F1F5F9;
          box-shadow: 0 2px 12px rgba(0,0,0,0.05);
          overflow: hidden;
          font-family: 'Inter', system-ui, sans-serif;
        }
        .tc-header {
          padding: 20px 28px 16px;
          border-bottom: 1px solid #F8FAFC;
          display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px;
        }
        .tc-header-left { display: flex; align-items: center; gap: 12px; }
        .tc-header-icon {
          width: 38px; height: 38px; border-radius: 10px;
          background: linear-gradient(135deg,#EFF6FF,#E0E7FF);
          display: flex; align-items: center; justify-content: center; font-size: 18px; flex-shrink: 0;
        }
        .tc-header-title { font-size: 15px; font-weight: 700; color: #0F172A; margin: 0; letter-spacing: -0.3px; }
        .tc-header-sub { font-size: 12px; color: #94A3B8; margin: 2px 0 0; }
        .tc-legend { display: flex; align-items: center; gap: 16px; }
        .tc-legend-item { display: flex; align-items: center; gap: 6px; font-size: 12px; font-weight: 500; color: #64748B; }
        .tc-legend-dot { width: 10px; height: 3px; border-radius: 2px; }
        .tc-period-btn {
          background: #F1F5F9; border: 1px solid #E2E8F0; border-radius: 8px;
          padding: 5px 12px; font-size: 12px; font-weight: 600; color: #475569;
          cursor: pointer; font-family: 'Inter', system-ui, sans-serif;
        }
        .tc-chart-wrap { padding: 16px 24px 8px; }
        .tc-footer {
          display: grid; grid-template-columns: repeat(4,1fr);
          border-top: 1px solid #F8FAFC;
        }
        @media(max-width:640px){ .tc-footer{ grid-template-columns: repeat(2,1fr); } }
        .tc-stat {
          padding: 16px 20px; border-right: 1px solid #F8FAFC;
          transition: background 0.15s;
        }
        .tc-stat:last-child { border-right: none; }
        .tc-stat:hover { background: #F8FAFC; }
        .tc-stat-label { font-size: 10.5px; font-weight: 600; color: #94A3B8; text-transform: uppercase; letter-spacing: 0.6px; margin: 0 0 3px; }
        .tc-stat-value { font-size: 18px; font-weight: 800; color: #0F172A; letter-spacing: -0.5px; margin: 0 0 1px; }
        .tc-stat-sub { font-size: 11px; color: #CBD5E1; margin: 0; }
        .recharts-cartesian-grid-horizontal line { stroke: #F1F5F9 !important; }
        .recharts-cartesian-grid-vertical line { display: none; }
      `}</style>

      <div className="tc-root">
        <div className="tc-header">
          <div className="tc-header-left">
            <div className="tc-header-icon">📈</div>
            <div>
              <h2 className="tc-header-title">Traffic Trend</h2>
              <p className="tc-header-sub">Hourly vehicle volume — today's monitoring cycle</p>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div className="tc-legend">
              <div className="tc-legend-item">
                <div className="tc-legend-dot" style={{ background: "#2563EB" }} />
                Vehicles/hr
              </div>
              <div className="tc-legend-item">
                <div className="tc-legend-dot" style={{ background: "#EF4444", height: 2, borderTop: "2px dashed #EF4444", background: "transparent" }} />
                Peak threshold
              </div>
            </div>
            <button className="tc-period-btn">Today</button>
          </div>
        </div>

        <div className="tc-chart-wrap">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <defs>
                <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#2563EB" />
                  <stop offset="100%" stopColor="#6366F1" />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
              <XAxis
                dataKey="time"
                tick={{ fill: "#94A3B8", fontSize: 12, fontWeight: 500, fontFamily: "'Inter',system-ui,sans-serif" }}
                axisLine={false} tickLine={false}
              />
              <YAxis
                tick={{ fill: "#94A3B8", fontSize: 12, fontWeight: 500, fontFamily: "'Inter',system-ui,sans-serif" }}
                axisLine={false} tickLine={false}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ stroke: "#E2E8F0", strokeWidth: 1.5 }} />
              <ReferenceLine y={600} stroke="#EF4444" strokeDasharray="4 3" strokeWidth={1.5} strokeOpacity={0.5} />
              <Line
                type="monotone"
                dataKey="traffic"
                stroke="url(#lineGrad)"
                strokeWidth={2.8}
                dot={{ r: 4.5, fill: "white", stroke: "#2563EB", strokeWidth: 2.5 }}
                activeDot={{ r: 6.5, fill: "#2563EB", stroke: "white", strokeWidth: 2.5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="tc-footer">
          {summaryStats.map((s) => (
            <div key={s.label} className="tc-stat">
              <p className="tc-stat-label">{s.label}</p>
              <p className="tc-stat-value">{s.value}</p>
              <p className="tc-stat-sub">{s.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default TrafficChart;
