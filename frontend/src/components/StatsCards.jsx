function StatsCards() {
  const cards = [
    {
      title: "Traffic Flow",
      value: "845",
      unit: "vehicles / hr",
      delta: "+12.4%",
      up: true,
      color: "#2563EB",
      bg: "rgba(37,99,235,0.06)",
      border: "rgba(37,99,235,0.12)",
      sparkY: [20, 14, 16, 8, 10, 4, 6, 2],
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="3" />
          <path d="M3 9h18M9 21V9" />
        </svg>
      ),
    },
    {
      title: "Avg Speed",
      value: "42",
      unit: "km/h",
      delta: "−3.1%",
      up: false,
      color: "#6366F1",
      bg: "rgba(99,102,241,0.06)",
      border: "rgba(99,102,241,0.12)",
      sparkY: [8, 10, 7, 12, 9, 14, 10, 15],
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="9" />
          <path d="M12 12L16 8" />
          <circle cx="12" cy="12" r="1.5" fill="currentColor" />
        </svg>
      ),
    },
    {
      title: "Congestion",
      value: "Med",
      unit: "AI prediction",
      delta: "Stable",
      up: null,
      color: "#F59E0B",
      bg: "rgba(245,158,11,0.06)",
      border: "rgba(245,158,11,0.12)",
      sparkY: [10, 11, 9, 12, 10, 11, 10, 12],
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
          <line x1="12" y1="9" x2="12" y2="13" />
          <line x1="12" y1="17" x2="12.01" y2="17" strokeWidth="2.5" />
        </svg>
      ),
    },
    {
      title: "Road Status",
      value: "Open",
      unit: "all lanes clear",
      delta: "Normal",
      up: true,
      color: "#10B981",
      bg: "rgba(16,185,129,0.06)",
      border: "rgba(16,185,129,0.12)",
      sparkY: [6, 5, 7, 4, 6, 4, 5, 3],
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20,6 9,17 4,12" />
        </svg>
      ),
    },
  ];

  const sparkPath = (ys) => {
    const xs = [0, 8, 16, 24, 32, 40, 48, 56];
    return ys.map((y, i) => `${i === 0 ? "M" : "L"}${xs[i]},${y}`).join(" ");
  };

  return (
    <>
      <style>{`
        .sc-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
          gap: 18px;
        }
        .sc-card {
          background: #ffffff;
          border-radius: 18px;
          padding: 22px 22px 18px;
          border: 1px solid #F1F5F9;
          box-shadow: 0 2px 12px rgba(0,0,0,0.05);
          position: relative; overflow: hidden;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          cursor: default;
          font-family: 'Inter', system-ui, sans-serif;
        }
        .sc-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 32px rgba(0,0,0,0.09);
        }
        .sc-stripe {
          position: absolute; top: 0; left: 0; right: 0; height: 3px;
          border-radius: 18px 18px 0 0;
        }
        .sc-glow {
          position: absolute; top: -40px; right: -40px;
          width: 120px; height: 120px; border-radius: 50%;
          pointer-events: none;
          filter: blur(30px);
        }
        .sc-top { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 16px; }
        .sc-label { font-size: 11.5px; font-weight: 600; color: #94A3B8; text-transform: uppercase; letter-spacing: 0.7px; margin: 0; }
        .sc-icon-box {
          width: 36px; height: 36px; border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .sc-value { font-size: 32px; font-weight: 800; color: #0F172A; letter-spacing: -1.5px; line-height: 1; margin: 0 0 3px; }
        .sc-unit { font-size: 12px; color: #94A3B8; margin: 0 0 14px; }
        .sc-bottom { display: flex; align-items: center; justify-content: space-between; }
        .sc-delta { font-size: 11.5px; font-weight: 600; padding: 3px 9px; border-radius: 100px; }
      `}</style>
      <div className="sc-grid">
        {cards.map((c, i) => (
          <div key={i} className="sc-card">
            <div className="sc-stripe" style={{ background: `linear-gradient(90deg, ${c.color}, ${c.color}44)` }} />
            <div className="sc-glow" style={{ background: c.bg }} />
            <div className="sc-top">
              <p className="sc-label">{c.title}</p>
              <div className="sc-icon-box" style={{ background: c.bg, color: c.color }}>
                {c.icon}
              </div>
            </div>
            <p className="sc-value">{c.value}</p>
            <p className="sc-unit">{c.unit}</p>
            <div className="sc-bottom">
              <span className="sc-delta" style={{
                background: c.up === true ? "rgba(16,185,129,0.1)" : c.up === false ? "rgba(239,68,68,0.1)" : "rgba(100,116,139,0.1)",
                color: c.up === true ? "#059669" : c.up === false ? "#DC2626" : "#64748B",
              }}>
                {c.up === true ? "↑ " : c.up === false ? "↓ " : "→ "}{c.delta}
              </span>
              <svg width="58" height="22" viewBox="0 0 56 22" fill="none" style={{ opacity: 0.55 }}>
                <path d={sparkPath(c.sparkY)} stroke={c.color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </svg>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default StatsCards;
