import { useState } from "react";
import Navbar from "../components/Navbar";
import StatsCards from "../components/StatsCards";
import PredictionForm from "../components/PredictionForm";
import PredictionResult from "../components/PredictionResult";
import TrafficChart from "../components/TrafficChart";
import GPSMonitor from "../components/GPSMonitor";
import HotspotMap from "../components/HotspotMap";
import PublicTransport from "../components/PublicTransport";
function Dashboard() {
  const [prediction, setPrediction] = useState(null);

  return (
    <>
      <style>{`
        .dash-page {
          background: #F8FAFC;
          min-height: 100vh;
          font-family: 'Inter', system-ui, sans-serif;
        }

        /* ── Hero ── */
        .dash-hero {
          background: linear-gradient(135deg, #0A1628 0%, #0F2040 40%, #1a1060 100%);
          padding: 72px 0 80px;
          position: relative;
          overflow: hidden;
        }
        .dash-hero-grid {
          position: absolute; inset: 0; z-index: 0;
          background-image:
            linear-gradient(rgba(37,99,235,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(37,99,235,0.06) 1px, transparent 1px);
          background-size: 48px 48px;
        }
        .dash-hero-glow-a {
          position: absolute; top: -100px; right: 10%; z-index: 0;
          width: 500px; height: 500px; border-radius: 50%;
          background: radial-gradient(circle, rgba(99,102,241,0.18) 0%, transparent 70%);
          pointer-events: none;
        }
        .dash-hero-glow-b {
          position: absolute; bottom: -80px; left: 5%; z-index: 0;
          width: 360px; height: 360px; border-radius: 50%;
          background: radial-gradient(circle, rgba(37,99,235,0.14) 0%, transparent 70%);
          pointer-events: none;
        }
        /* Animated waveform — the signature element */
        .dash-hero-wave {
          position: absolute; bottom: 0; left: 0; right: 0; z-index: 0;
          height: 60px; opacity: 0.15;
        }
        .dash-hero-inner {
          position: relative; z-index: 2;
          max-width: 1280px; margin: 0 auto; padding: 0 40px;
        }
        .dash-hero-eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          background: rgba(37,99,235,0.15); border: 1px solid rgba(99,149,255,0.25);
          border-radius: 100px; padding: 5px 14px;
          font-size: 11.5px; font-weight: 700; color: #93C5FD;
          text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 22px;
        }
        .dash-hero-eyebrow-dot {
          width: 7px; height: 7px; border-radius: 50%; background: #60A5FA;
          animation: hw-pulse 2s ease-in-out infinite;
        }
        @keyframes hw-pulse {
          0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(0.85)}
        }
        .dash-hero-title {
          font-size: clamp(34px, 5vw, 58px);
          font-weight: 900; color: white; margin: 0 0 16px;
          line-height: 1.05; letter-spacing: -2.5px; max-width: 700px;
        }
        .dash-hero-title-accent {
          background: linear-gradient(90deg,#60A5FA,#A78BFA,#60A5FA);
          background-size: 200%;
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: dash-shimmer 4s linear infinite;
        }
        @keyframes dash-shimmer { 0%{background-position:0%} 100%{background-position:200%} }
        .dash-hero-sub {
          font-size: 16px; color: #94A3B8; max-width: 540px;
          line-height: 1.7; margin: 0 0 36px;
        }
        .dash-hero-pills {
          display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 40px;
        }
        .dash-hero-pill {
          background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1);
          border-radius: 100px; padding: 5px 14px;
          font-size: 12px; font-weight: 500; color: #CBD5E1;
        }
        .dash-hero-metrics {
          display: flex; gap: 0;
          background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.07);
          border-radius: 16px; overflow: hidden; width: fit-content;
        }
        .dash-hero-metric {
          padding: 18px 28px; border-right: 1px solid rgba(255,255,255,0.06);
          min-width: 120px;
        }
        .dash-hero-metric:last-child { border-right: none; }
        .dash-hero-metric-val {
          font-size: 26px; font-weight: 900; color: white;
          letter-spacing: -1px; line-height: 1; display: block; margin-bottom: 4px;
        }
        .dash-hero-metric-lbl { font-size: 11px; font-weight: 500; color: #64748B; }

        /* ── Content ── */
        .dash-content { max-width: 1280px; margin: 0 auto; padding: 0 40px 80px; }
        @media(max-width:768px){ .dash-content{ padding: 0 20px 60px; } .dash-hero-inner{ padding: 0 20px; } .snav{ padding: 0 20px; } }

        /* ── Section header ── */
        .dash-sec-hdr {
          display: flex; align-items: center; gap: 12px;
          margin: 52px 0 20px;
        }
        .dash-sec-num {
          width: 28px; height: 28px; border-radius: 8px;
          background: linear-gradient(135deg,#2563EB,#6366F1);
          color: white; font-size: 12px; font-weight: 800;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .dash-sec-title { font-size: 18px; font-weight: 800; color: #0F172A; margin: 0; letter-spacing: -0.5px; }
        .dash-sec-sub { font-size: 13px; color: #94A3B8; margin: 3px 0 0; }
        .dash-sec-line { flex: 1; height: 1px; background: #E2E8F0; margin-left: 8px; }

        /* ── Prediction 2-col ── */
        .dash-pred-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
          align-items: start;
        }
        @media(max-width:960px){ .dash-pred-grid{ grid-template-columns: 1fr; } }

        /* ── Footer ── */
        .dash-footer {
          background: #0F172A;
          border-top: 1px solid #1E293B;
          padding: 28px 0;
          margin-top: 60px;
        }
        .dash-footer-inner {
          max-width: 1280px; margin: 0 auto; padding: 0 40px;
          display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 16px;
        }
        .dash-footer-brand { display: flex; align-items: center; gap: 10px; }
        .dash-footer-logo {
          width: 28px; height: 28px; border-radius: 7px;
          background: linear-gradient(135deg,#2563EB,#6366F1);
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 2px 8px rgba(37,99,235,0.3);
        }
        .dash-footer-name { font-size: 14px; font-weight: 700; color: white; letter-spacing: -0.2px; }
        .dash-footer-sep { width: 1px; height: 14px; background: #334155; }
        .dash-footer-tag { font-size: 11px; font-weight: 500; color: #475569; }
        .dash-footer-right { display: flex; align-items: center; gap: 20px; }
        .dash-footer-copy { font-size: 12px; color: #334155; }
        .dash-footer-links { display: flex; gap: 16px; }
        .dash-footer-link { font-size: 12px; color: #475569; cursor: pointer; transition: color 0.15s; }
        .dash-footer-link:hover { color: #60A5FA; }

        /* Flow indicator */
        .dash-flow {
          display: flex; align-items: center; justify-content: center;
          gap: 8px; padding: 28px 0 0; flex-wrap: wrap;
        }
        .dash-flow-step {
          display: flex; align-items: center; gap: 6px;
          font-size: 12px; font-weight: 600; color: #94A3B8;
          background: white; border: 1px solid #E2E8F0; border-radius: 100px;
          padding: 5px 14px;
          box-shadow: 0 1px 4px rgba(0,0,0,0.04);
        }
        .dash-flow-step-dot { width: 6px; height: 6px; border-radius: 50%; background: #2563EB; }
        .dash-flow-arrow { color: #CBD5E1; font-size: 14px; }
      `}</style>

      <div className="dash-page">
        <Navbar />

        {/* ── Hero ── */}
        <section className="dash-hero" id="hero">
          <div className="dash-hero-grid" />
          <div className="dash-hero-glow-a" />
          <div className="dash-hero-glow-b" />

          {/* Signature waveform */}
          <svg className="dash-hero-wave" viewBox="0 0 1440 60" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,30 L60,30 L80,10 L100,50 L120,20 L140,40 L160,30 L220,30 L240,8 L260,52 L280,18 L300,42 L320,30 L380,30 L400,12 L420,48 L440,22 L460,38 L480,30 L540,30 L560,6 L580,54 L600,16 L620,44 L640,30 L700,30 L720,10 L740,50 L760,20 L780,40 L800,30 L860,30 L880,8 L900,52 L920,18 L940,42 L960,30 L1020,30 L1040,12 L1060,48 L1080,22 L1100,38 L1120,30 L1180,30 L1200,6 L1220,54 L1240,16 L1260,44 L1280,30 L1440,30"
              stroke="#3B82F6" strokeWidth="2" fill="none" vectorEffect="non-scaling-stroke"/>
          </svg>

          <div className="dash-hero-inner">
            <div className="dash-hero-eyebrow">
              <span className="dash-hero-eyebrow-dot" />
              AI-Powered Urban Mobility Intelligence
            </div>
            <h1 className="dash-hero-title">
              Smart Traffic<br />
              <span className="dash-hero-title-accent">Management</span><br />
              Dashboard
            </h1>
            <p className="dash-hero-sub">
              Real-time congestion prediction and sensor analytics across 6 lanes.
              ML-powered insights for smarter urban traffic operations.
            </p>
            <div className="dash-hero-pills">
              {[
"Machine Learning",
"6-Lane Sensors",
"Real-Time Analytics",
"Scenario Simulation",
"AI Recommendations"
].map(p => (
                <span key={p} className="dash-hero-pill">{p}</span>
              ))}
            </div>
            <div className="dash-hero-metrics">
              {[
                { val: "6", lbl: "Sensor Lanes" },
                { val: "35", lbl: "Input Features" },
                { val: "5", lbl: "Metric Types" },
                { val: "6", lbl: "Scenarios" },
              ].map(m => (
                <div key={m.lbl} className="dash-hero-metric">
                  <span className="dash-hero-metric-val">{m.val}</span>
                  <span className="dash-hero-metric-lbl">{m.lbl}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── User Flow Indicator ── */}
        <div style={{ background: "white", borderBottom: "1px solid #F1F5F9", padding: "0" }}>
          <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 40px" }}>
            <div className="dash-flow">
              {["Hero","Choose Scenario","Sensor Summary","Predict","Result","Analytics","Advanced Inputs"].map((step, i, arr) => (
                <span key={step} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span className="dash-flow-step">
                    <span className="dash-flow-step-dot" />
                    {step}
                  </span>
                  {i < arr.length - 1 && <span className="dash-flow-arrow">›</span>}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="dash-content">
          {/* ── Overview ── */}
          <div id="dashboard">
            <div className="dash-sec-hdr">
              <div className="dash-sec-num">1</div>
              <div>
                <h2 className="dash-sec-title">Live Overview</h2>
                <p className="dash-sec-sub">Current traffic metrics across monitored corridors</p>
              </div>
              <div className="dash-sec-line" />
            </div>
            <StatsCards />
          </div>

          {/* ── Prediction ── */}
          <div id="prediction">
            <div className="dash-sec-hdr">
              <div className="dash-sec-num">2</div>
              <div>
                <h2 className="dash-sec-title">Congestion Prediction</h2>
                <p className="dash-sec-sub">Select a scenario and run the ML model to get traffic analysis</p>
              </div>
              <div className="dash-sec-line" />
            </div>
            <div className="dash-pred-grid">
              <PredictionForm setPrediction={setPrediction} />
              <PredictionResult prediction={prediction} />
            </div>
          </div>

          {/* ── Analytics ── */}
          <div id="analytics">
            <div className="dash-sec-hdr">
              <div className="dash-sec-num">3</div>
              <div>
                <h2 className="dash-sec-title">Traffic Analytics</h2>
                <p className="dash-sec-sub">Hourly vehicle flow trend — today's monitoring cycle</p>
              </div>
              <div className="dash-sec-line" />
            </div>
            <TrafficChart />
          </div>
        </div>
        {/* GPS Monitoring */}

<div id="gps">

  <div className="dash-sec-hdr">
    <div className="dash-sec-num">4</div>

    <div>
      <h2 className="dash-sec-title">
        GPS Vehicle Monitoring
      </h2>

      <p className="dash-sec-sub">
        Simulated live GPS vehicle tracking
      </p>
    </div>

    <div className="dash-sec-line" />
  </div>

<GPSMonitor prediction={prediction} />

</div>

{/* Hotspot Analysis */}

<div id="hotspots">

  <div className="dash-sec-hdr">
    <div className="dash-sec-num">5</div>

    <div>
      <h2 className="dash-sec-title">
        Congestion Hotspots
      </h2>

      <p className="dash-sec-sub">
        AI identified congestion-prone locations
      </p>
    </div>

    <div className="dash-sec-line" />
  </div>

<HotspotMap prediction={prediction} />

</div>

{/* Public Transport */}

<div id="transport">

  <div className="dash-sec-hdr">
    <div className="dash-sec-num">6</div>

    <div>
      <h2 className="dash-sec-title">
        Public Transport Monitor
      </h2>

      <p className="dash-sec-sub">
        Bus and metro service monitoring
      </p>
    </div>

    <div className="dash-sec-line" />
  </div>

<PublicTransport prediction={prediction} />

</div>

        {/* ── Footer ── */}
        <footer className="dash-footer">
          <div className="dash-footer-inner">
            <div className="dash-footer-brand">
              <div className="dash-footer-logo">
                <svg width="14" height="14" viewBox="0 0 18 18" fill="none">
                  <path d="M2 9h3.5l2-5.5 3 11 2-5.5H16" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="dash-footer-name">SmartTrafficAI</span>
              <span className="dash-footer-sep" />
              <span className="dash-footer-tag">AI Traffic Management System</span>
            </div>
            <div className="dash-footer-right">
              <div className="dash-footer-links">
                <span className="dash-footer-link">Dashboard</span>
                <span className="dash-footer-link">Prediction API</span>
                <span className="dash-footer-link">Docs</span>
              </div>
              <span className="dash-footer-copy">© {new Date().getFullYear()} SmartTrafficAI · Built for Hackathon Presentation</span>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

export default Dashboard;
