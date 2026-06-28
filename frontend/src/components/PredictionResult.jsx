function PredictionResult({ prediction }) {
  const getLevel = (status) => {
    if (!status) return "neutral";
    const s = status.toLowerCase();
    if (s.includes("high") || s.includes("heavy") || s.includes("severe") || s.includes("congested")) return "high";
    if (s.includes("medium") || s.includes("moderate") || s.includes("med")) return "medium";
    if (s.includes("low") || s.includes("light") || s.includes("free") || s.includes("open")) return "low";
    return "neutral";
  };

  const parseConf = (conf) => {
    if (!conf) return 0;
    const n = parseFloat(conf);
    if (isNaN(n)) return 0;
    return Math.min(100, Math.round(n > 1 ? n : n * 100));
  };

  const LEVEL_CONFIG = {
    high:    { bg: "#FEF2F2", border: "#FECACA", badge: "#DC2626", badgeBg: "#FEE2E2", label: "High Congestion",  icon: "🔴", barColor: "#EF4444" },
    medium:  { bg: "#FFFBEB", border: "#FDE68A", badge: "#D97706", badgeBg: "#FEF3C7", label: "Moderate Traffic", icon: "🟡", barColor: "#F59E0B" },
    low:     { bg: "#F0FDF4", border: "#BBF7D0", badge: "#059669", badgeBg: "#DCFCE7", label: "Low Congestion",   icon: "🟢", barColor: "#10B981" },
    neutral: { bg: "#F8FAFC", border: "#E2E8F0", badge: "#475569", badgeBg: "#F1F5F9", label: "Unknown",          icon: "⚪", barColor: "#94A3B8" },
  };

  if (!prediction || Object.keys(prediction).length === 0) {
    return (
      <>
        <style>{`
          .pr-empty {
            background: white; border: 1px solid #F1F5F9; border-radius: 20px;
            display: flex; flex-direction: column; align-items: center; justify-content: center;
            padding: 60px 30px; text-align: center; min-height: 320px;
            font-family: 'Inter', system-ui, sans-serif;
            box-shadow: 0 2px 12px rgba(0,0,0,0.04);
          }
          .pr-empty-icon {
            width: 72px; height: 72px; border-radius: 20px;
            background: linear-gradient(135deg,#EFF6FF,#E0E7FF);
            display: flex; align-items: center; justify-content: center;
            font-size: 32px; margin-bottom: 20px;
          }
          .pr-empty-title { font-size: 17px; font-weight: 700; color: #1E293B; margin: 0 0 8px; }
          .pr-empty-sub { font-size: 13.5px; color: #94A3B8; line-height: 1.6; max-width: 260px; margin: 0; }
          .pr-empty-hint {
            margin-top: 20px; padding: 10px 18px;
            background: #EFF6FF; border-radius: 10px;
            font-size: 12px; font-weight: 600; color: #2563EB;
          }
        `}</style>
        <div className="pr-empty">
          <div className="pr-empty-icon">📋</div>
          <h3 className="pr-empty-title">No Prediction Yet</h3>
          <p className="pr-empty-sub">Select a traffic scenario and click <strong>Predict Traffic Congestion</strong> to see AI analysis here.</p>
          <div className="pr-empty-hint">← Configure and run prediction</div>
        </div>
      </>
    );
  }

  const level = getLevel(prediction.traffic_status);
  const cfg = LEVEL_CONFIG[level];
  const confPct = parseConf(prediction.confidence);

  return (
    <>
      <style>{`
        .pr-root {
          background: white; border-radius: 20px;
          border: 1px solid #F1F5F9;
          box-shadow: 0 2px 12px rgba(0,0,0,0.05);
          overflow: hidden;
          font-family: 'Inter', system-ui, sans-serif;
        }
        .pr-header {
          padding: 20px 24px;
          border-bottom: 1px solid #F1F5F9;
          display: flex; align-items: center; gap: 12px;
          background: linear-gradient(180deg, rgba(37,99,235,0.03) 0%, transparent 100%);
        }
        .pr-header-icon {
          width: 38px; height: 38px; border-radius: 10px;
          background: linear-gradient(135deg,#EFF6FF,#E0E7FF);
          display: flex; align-items: center; justify-content: center; font-size: 18px; flex-shrink: 0;
        }
        .pr-header-title { font-size: 15px; font-weight: 700; color: #0F172A; margin: 0; letter-spacing: -0.3px; }
        .pr-header-sub { font-size: 12px; color: #94A3B8; margin: 2px 0 0; }
        .pr-success-bar { height: 3px; background: linear-gradient(90deg,#10B981,#34D399); }

        .pr-body { padding: 22px 24px; display: flex; flex-direction: column; gap: 16px; }

        /* Status card */
        .pr-status-card {
          border-radius: 14px; padding: 18px 20px;
          display: flex; align-items: center; gap: 16px;
        }
        .pr-status-icon { font-size: 36px; line-height: 1; flex-shrink: 0; }
        .pr-status-level { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.8px; margin: 0 0 4px; }
        .pr-status-value { font-size: 22px; font-weight: 800; color: #0F172A; margin: 0; letter-spacing: -0.5px; }
        .pr-status-badge {
          margin-left: auto; padding: 5px 14px; border-radius: 100px;
          font-size: 12px; font-weight: 700;
        }

        /* Prediction row */
        .pr-row {
          background: #F8FAFC; border: 1px solid #F1F5F9; border-radius: 12px; padding: 14px 16px;
        }
        .pr-row-label { font-size: 10.5px; font-weight: 700; color: #94A3B8; text-transform: uppercase; letter-spacing: 0.7px; margin: 0 0 5px; }
        .pr-row-value { font-size: 16px; font-weight: 700; color: #1E293B; margin: 0; }

        /* Confidence */
        .pr-conf { background: #F8FAFC; border: 1px solid #F1F5F9; border-radius: 12px; padding: 14px 16px; }
        .pr-conf-top { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 10px; }
        .pr-conf-label { font-size: 10.5px; font-weight: 700; color: #94A3B8; text-transform: uppercase; letter-spacing: 0.7px; margin: 0; }
        .pr-conf-pct { font-size: 22px; font-weight: 800; color: #0F172A; letter-spacing: -0.5px; }
        .pr-conf-track { height: 8px; background: #E2E8F0; border-radius: 100px; overflow: hidden; }
        .pr-conf-fill { height: 100%; border-radius: 100px; transition: width 1s cubic-bezier(.4,0,.2,1); }
        .pr-conf-desc { font-size: 11px; color: #94A3B8; margin: 7px 0 0; }

        /* Recommendations */
        .pr-recs-title { font-size: 11px; font-weight: 700; color: #64748B; text-transform: uppercase; letter-spacing: 0.8px; margin: 0 0 10px; display: flex; align-items: center; gap: 7px; }
        .pr-rec-card {
          display: flex; align-items: flex-start; gap: 12px;
          background: #F8FAFC; border: 1px solid #F1F5F9; border-radius: 11px;
          padding: 12px 14px; margin-bottom: 8px;
          transition: all 0.15s;
        }
        .pr-rec-card:hover { border-color: #DBEAFE; background: #EFF6FF; }
        .pr-rec-num {
          width: 22px; height: 22px; border-radius: 50%; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          font-size: 10px; font-weight: 800; color: white; margin-top: 1px;
          background: linear-gradient(135deg,#2563EB,#6366F1);
        }
        .pr-rec-text { font-size: 13px; color: #334155; line-height: 1.55; margin: 0; }
      `}</style>

      <div className="pr-root">
        <div className="pr-success-bar" />
        <div className="pr-header">
          <div className="pr-header-icon">🎯</div>
          <div>
            <h2 className="pr-header-title">Prediction Result</h2>
            <p className="pr-header-sub">AI model output · analysis complete</p>
          </div>
        </div>

        <div className="pr-body">
          {/* Status */}
          <div className="pr-status-card" style={{ background: cfg.bg, border: `1.5px solid ${cfg.border}` }}>
            <span className="pr-status-icon">{cfg.icon}</span>
            <div>
              <p className="pr-status-level" style={{ color: cfg.badge }}>{cfg.label}</p>
              <p className="pr-status-value">{prediction.traffic_status}</p>
            </div>
            <span className="pr-status-badge" style={{ background: cfg.badgeBg, color: cfg.badge }}>
              {level.charAt(0).toUpperCase() + level.slice(1)} Level
            </span>
          </div>

          {/* Prediction label */}
          <div className="pr-row">
            <p className="pr-row-label">Prediction</p>
            <p className="pr-row-value">{prediction.prediction}</p>
          </div>

          {/* Confidence */}
          <div className="pr-conf">
            <div className="pr-conf-top">
              <p className="pr-conf-label">Model Confidence</p>
              <span className="pr-conf-pct">{prediction.confidence}</span>
            </div>
            <div className="pr-conf-track">
              <div className="pr-conf-fill" style={{ width: `${confPct}%`, background: `linear-gradient(90deg,${cfg.barColor},${cfg.barColor}aa)` }} />
            </div>
            <p className="pr-conf-desc">
              {confPct >= 80 ? "High confidence — results are reliable for operational decisions."
                : confPct >= 60 ? "Moderate confidence — results are informative, review recommended."
                : "Low confidence — consider providing more sensor data for accuracy."}
            </p>
          </div>

          {/* Recommendations */}
          <div>
            <p className="pr-recs-title">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/>
              </svg>
              Recommendations
            </p>
            {prediction.recommendations.map((item, index) => (
              <div key={index} className="pr-rec-card">
                <div className="pr-rec-num">{index + 1}</div>
                <p className="pr-rec-text">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default PredictionResult;
