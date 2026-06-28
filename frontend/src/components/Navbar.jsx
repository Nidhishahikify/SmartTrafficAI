function Navbar() {
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) section.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        *, *::before, *::after { box-sizing: border-box; }
        body { margin: 0; font-family: 'Inter', system-ui, sans-serif; background: #F8FAFC; }

        .snav {
          position: sticky; top: 0; z-index: 9999;
          height: 64px;
          display: flex; align-items: center; justify-content: space-between;
          padding: 0 40px;
          background: rgba(255,255,255,0.92);
          backdrop-filter: blur(20px) saturate(180%);
          border-bottom: 1px solid rgba(37,99,235,0.08);
          box-shadow: 0 1px 12px rgba(0,0,0,0.06);
          font-family: 'Inter', system-ui, sans-serif;
        }
        .snav-left { display: flex; align-items: center; gap: 12px; cursor: pointer; }
        .snav-logo-mark {
          width: 36px; height: 36px; border-radius: 10px;
          background: linear-gradient(135deg, #2563EB 0%, #6366F1 100%);
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 4px 14px rgba(37,99,235,0.35);
        }
        .snav-brand { display: flex; flex-direction: column; }
        .snav-name { font-size: 15px; font-weight: 800; color: #0F172A; letter-spacing: -0.4px; line-height: 1.1; }
        .snav-tag {
          font-size: 9.5px; font-weight: 700; color: #2563EB;
          text-transform: uppercase; letter-spacing: 1px; line-height: 1;
        }
        .snav-divider { width: 1px; height: 24px; background: #E2E8F0; margin: 0 8px; }
        .snav-env {
          font-size: 11px; font-weight: 600; color: #64748B;
          background: #F1F5F9; border: 1px solid #E2E8F0;
          border-radius: 6px; padding: 3px 9px;
        }
        .snav-menu { display: flex; align-items: center; gap: 2px; list-style: none; margin: 0; padding: 0; }
        .snav-item {
          font-size: 13.5px; font-weight: 500; color: #475569;
          padding: 6px 14px; border-radius: 8px; cursor: pointer;
          transition: all 0.15s ease; letter-spacing: -0.1px;
          position: relative;
        }
        .snav-item:hover { color: #2563EB; background: rgba(37,99,235,0.06); }
        .snav-right { display: flex; align-items: center; gap: 10px; }
        .snav-badge {
          display: flex; align-items: center; gap: 6px;
          padding: 5px 12px;
          background: rgba(16,185,129,0.07);
          border: 1px solid rgba(16,185,129,0.2);
          border-radius: 100px;
          font-size: 11.5px; font-weight: 600; color: #059669;
        }
        .snav-dot {
          width: 6px; height: 6px; border-radius: 50%; background: #10B981;
          animation: snav-pulse 2.2s ease-in-out infinite;
        }
        @keyframes snav-pulse {
          0%,100%{box-shadow:0 0 0 0 rgba(16,185,129,0.4)}
          50%{box-shadow:0 0 0 4px rgba(16,185,129,0)}
        }
        .snav-cta {
          padding: 7px 16px;
          background: linear-gradient(135deg,#2563EB,#6366F1);
          color: white; border: none; border-radius: 8px;
          font-size: 13px; font-weight: 600; cursor: pointer;
          transition: all 0.15s ease; letter-spacing: -0.1px;
          font-family: 'Inter', system-ui, sans-serif;
          box-shadow: 0 2px 10px rgba(37,99,235,0.25);
        }
        .snav-cta:hover { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(37,99,235,0.35); }
      `}</style>
      <nav className="snav">
        <div className="snav-left" onClick={() => scrollToSection("hero")}>
          <div className="snav-logo-mark">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M2 9h3.5l2-5.5 3 11 2-5.5H16" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="snav-brand">
            <span className="snav-name">SmartTrafficAI</span>
            <span className="snav-tag">Management Console</span>
          </div>
          <div className="snav-divider" />
          <span className="snav-env">v2.0 · Production</span>
        </div>

        <ul className="snav-menu">
          {[
            { label: "Overview", id: "dashboard" },
            { label: "Prediction", id: "prediction" },
            { label: "Analytics", id: "analytics" },
            { label: "Sensors", id: "sensors" },
          ].map((item) => (
            <li key={item.id} className="snav-item" onClick={() => scrollToSection(item.id)}>
              {item.label}
            </li>
          ))}
        </ul>

        <div className="snav-right">
          <div className="snav-badge">
            <span className="snav-dot" />
            All Systems Operational
          </div>
          <button className="snav-cta" onClick={() => scrollToSection("prediction")}>
            Run Prediction
          </button>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
