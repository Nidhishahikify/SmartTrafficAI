import { useState } from "react";
import API from "../services/api";

/* ─── Scenario preset data ──────────────────────────────────────────── */
const SCENARIOS = {
  morning: {
    label: "Morning Peak",
    emoji: "🌅",
    desc: "7–9 AM weekday rush",
    color: "#F59E0B",
    glow: "rgba(245,158,11,0.08)",
    border: "rgba(245,158,11,0.2)",
    values: {
      "VEHS(ALL)_1":420,"VEHS(ALL)_2":380,"VEHS(ALL)_3":350,"VEHS(ALL)_4":310,"VEHS(ALL)_5":290,"VEHS(ALL)_6":260,
      "SPEEDAVGARITH(ALL)_1":28,"SPEEDAVGARITH(ALL)_2":30,"SPEEDAVGARITH(ALL)_3":32,"SPEEDAVGARITH(ALL)_4":34,"SPEEDAVGARITH(ALL)_5":36,"SPEEDAVGARITH(ALL)_6":38,
      "SPEEDAVGHARM(ALL)_1":25,"SPEEDAVGHARM(ALL)_2":27,"SPEEDAVGHARM(ALL)_3":29,"SPEEDAVGHARM(ALL)_4":31,"SPEEDAVGHARM(ALL)_5":33,"SPEEDAVGHARM(ALL)_6":35,
      "QUEUEDELAY(ALL)_1":45,"QUEUEDELAY(ALL)_2":40,"QUEUEDELAY(ALL)_3":35,"QUEUEDELAY(ALL)_4":30,"QUEUEDELAY(ALL)_5":25,"QUEUEDELAY(ALL)_6":20,
      "OCCUPRATE(ALL)_1":85,"OCCUPRATE(ALL)_2":80,"OCCUPRATE(ALL)_3":75,"OCCUPRATE(ALL)_4":70,"OCCUPRATE(ALL)_5":65,"OCCUPRATE(ALL)_6":60,
      Hour:8,Minute:30,Day:15,Month:6,DayOfWeek:2,
    },
  },
  evening: {
    label: "Evening Peak",
    emoji: "🌇",
    desc: "5–7 PM return traffic",
    color: "#EF4444",
    glow: "rgba(239,68,68,0.08)",
    border: "rgba(239,68,68,0.2)",
    values: {
      "VEHS(ALL)_1":480,"VEHS(ALL)_2":450,"VEHS(ALL)_3":420,"VEHS(ALL)_4":390,"VEHS(ALL)_5":360,"VEHS(ALL)_6":330,
      "SPEEDAVGARITH(ALL)_1":22,"SPEEDAVGARITH(ALL)_2":24,"SPEEDAVGARITH(ALL)_3":26,"SPEEDAVGARITH(ALL)_4":28,"SPEEDAVGARITH(ALL)_5":30,"SPEEDAVGARITH(ALL)_6":32,
      "SPEEDAVGHARM(ALL)_1":20,"SPEEDAVGHARM(ALL)_2":22,"SPEEDAVGHARM(ALL)_3":24,"SPEEDAVGHARM(ALL)_4":26,"SPEEDAVGHARM(ALL)_5":28,"SPEEDAVGHARM(ALL)_6":30,
      "QUEUEDELAY(ALL)_1":60,"QUEUEDELAY(ALL)_2":55,"QUEUEDELAY(ALL)_3":50,"QUEUEDELAY(ALL)_4":45,"QUEUEDELAY(ALL)_5":40,"QUEUEDELAY(ALL)_6":35,
      "OCCUPRATE(ALL)_1":92,"OCCUPRATE(ALL)_2":88,"OCCUPRATE(ALL)_3":84,"OCCUPRATE(ALL)_4":80,"OCCUPRATE(ALL)_5":76,"OCCUPRATE(ALL)_6":72,
      Hour:17,Minute:45,Day:15,Month:6,DayOfWeek:4,
    },
  },
  rainy: {
    label: "Rainy Day",
    emoji: "🌧",
    desc: "Reduced speed, wet roads",
    color: "#6366F1",
    glow: "rgba(99,102,241,0.08)",
    border: "rgba(99,102,241,0.2)",
    values: {
      "VEHS(ALL)_1":300,"VEHS(ALL)_2":280,"VEHS(ALL)_3":260,"VEHS(ALL)_4":240,"VEHS(ALL)_5":220,"VEHS(ALL)_6":200,
      "SPEEDAVGARITH(ALL)_1":20,"SPEEDAVGARITH(ALL)_2":22,"SPEEDAVGARITH(ALL)_3":24,"SPEEDAVGARITH(ALL)_4":26,"SPEEDAVGARITH(ALL)_5":28,"SPEEDAVGARITH(ALL)_6":30,
      "SPEEDAVGHARM(ALL)_1":18,"SPEEDAVGHARM(ALL)_2":20,"SPEEDAVGHARM(ALL)_3":22,"SPEEDAVGHARM(ALL)_4":24,"SPEEDAVGHARM(ALL)_5":26,"SPEEDAVGHARM(ALL)_6":28,
      "QUEUEDELAY(ALL)_1":50,"QUEUEDELAY(ALL)_2":45,"QUEUEDELAY(ALL)_3":40,"QUEUEDELAY(ALL)_4":35,"QUEUEDELAY(ALL)_5":30,"QUEUEDELAY(ALL)_6":25,
      "OCCUPRATE(ALL)_1":70,"OCCUPRATE(ALL)_2":65,"OCCUPRATE(ALL)_3":60,"OCCUPRATE(ALL)_4":55,"OCCUPRATE(ALL)_5":50,"OCCUPRATE(ALL)_6":45,
      Hour:14,Minute:0,Day:20,Month:7,DayOfWeek:3,
    },
  },
  accident: {
    label: "Accident",
    emoji: "🚨",
    desc: "Incident — lane blocked",
    color: "#DC2626",
    glow: "rgba(220,38,38,0.08)",
    border: "rgba(220,38,38,0.2)",
    values: {
      "VEHS(ALL)_1":150,"VEHS(ALL)_2":400,"VEHS(ALL)_3":380,"VEHS(ALL)_4":360,"VEHS(ALL)_5":340,"VEHS(ALL)_6":320,
      "SPEEDAVGARITH(ALL)_1":5,"SPEEDAVGARITH(ALL)_2":18,"SPEEDAVGARITH(ALL)_3":22,"SPEEDAVGARITH(ALL)_4":28,"SPEEDAVGARITH(ALL)_5":32,"SPEEDAVGARITH(ALL)_6":36,
      "SPEEDAVGHARM(ALL)_1":4,"SPEEDAVGHARM(ALL)_2":15,"SPEEDAVGHARM(ALL)_3":20,"SPEEDAVGHARM(ALL)_4":25,"SPEEDAVGHARM(ALL)_5":30,"SPEEDAVGHARM(ALL)_6":34,
      "QUEUEDELAY(ALL)_1":120,"QUEUEDELAY(ALL)_2":90,"QUEUEDELAY(ALL)_3":70,"QUEUEDELAY(ALL)_4":50,"QUEUEDELAY(ALL)_5":35,"QUEUEDELAY(ALL)_6":20,
      "OCCUPRATE(ALL)_1":98,"OCCUPRATE(ALL)_2":80,"OCCUPRATE(ALL)_3":75,"OCCUPRATE(ALL)_4":68,"OCCUPRATE(ALL)_5":60,"OCCUPRATE(ALL)_6":50,
      Hour:11,Minute:20,Day:10,Month:5,DayOfWeek:1,
    },
  },
  festival: {
    label: "Festival / Event",
    emoji: "🎉",
    desc: "High volume, event zone",
    color: "#8B5CF6",
    glow: "rgba(139,92,246,0.08)",
    border: "rgba(139,92,246,0.2)",
    values: {
      "VEHS(ALL)_1":500,"VEHS(ALL)_2":480,"VEHS(ALL)_3":460,"VEHS(ALL)_4":440,"VEHS(ALL)_5":420,"VEHS(ALL)_6":400,
      "SPEEDAVGARITH(ALL)_1":15,"SPEEDAVGARITH(ALL)_2":17,"SPEEDAVGARITH(ALL)_3":19,"SPEEDAVGARITH(ALL)_4":21,"SPEEDAVGARITH(ALL)_5":23,"SPEEDAVGARITH(ALL)_6":25,
      "SPEEDAVGHARM(ALL)_1":13,"SPEEDAVGHARM(ALL)_2":15,"SPEEDAVGHARM(ALL)_3":17,"SPEEDAVGHARM(ALL)_4":19,"SPEEDAVGHARM(ALL)_5":21,"SPEEDAVGHARM(ALL)_6":23,
      "QUEUEDELAY(ALL)_1":80,"QUEUEDELAY(ALL)_2":75,"QUEUEDELAY(ALL)_3":70,"QUEUEDELAY(ALL)_4":65,"QUEUEDELAY(ALL)_5":60,"QUEUEDELAY(ALL)_6":55,
      "OCCUPRATE(ALL)_1":95,"OCCUPRATE(ALL)_2":92,"OCCUPRATE(ALL)_3":89,"OCCUPRATE(ALL)_4":86,"OCCUPRATE(ALL)_5":83,"OCCUPRATE(ALL)_6":80,
      Hour:19,Minute:0,Day:25,Month:12,DayOfWeek:6,
    },
  },
  night: {
    label: "Night Traffic",
    emoji: "🌙",
    desc: "Low volume, open roads",
    color: "#0EA5E9",
    glow: "rgba(14,165,233,0.08)",
    border: "rgba(14,165,233,0.2)",
    values: {
      "VEHS(ALL)_1":80,"VEHS(ALL)_2":70,"VEHS(ALL)_3":60,"VEHS(ALL)_4":50,"VEHS(ALL)_5":40,"VEHS(ALL)_6":30,
      "SPEEDAVGARITH(ALL)_1":65,"SPEEDAVGARITH(ALL)_2":68,"SPEEDAVGARITH(ALL)_3":70,"SPEEDAVGARITH(ALL)_4":72,"SPEEDAVGARITH(ALL)_5":74,"SPEEDAVGARITH(ALL)_6":76,
      "SPEEDAVGHARM(ALL)_1":62,"SPEEDAVGHARM(ALL)_2":65,"SPEEDAVGHARM(ALL)_3":67,"SPEEDAVGHARM(ALL)_4":69,"SPEEDAVGHARM(ALL)_5":71,"SPEEDAVGHARM(ALL)_6":73,
      "QUEUEDELAY(ALL)_1":5,"QUEUEDELAY(ALL)_2":4,"QUEUEDELAY(ALL)_3":3,"QUEUEDELAY(ALL)_4":2,"QUEUEDELAY(ALL)_5":2,"QUEUEDELAY(ALL)_6":1,
      "OCCUPRATE(ALL)_1":20,"OCCUPRATE(ALL)_2":18,"OCCUPRATE(ALL)_3":15,"OCCUPRATE(ALL)_4":12,"OCCUPRATE(ALL)_5":10,"OCCUPRATE(ALL)_6":8,
      Hour:1,Minute:30,Day:15,Month:6,DayOfWeek:5,
    },
  },
};

const SCENARIO_LIST = [
  { key: "morning", ...SCENARIOS.morning },
  { key: "evening", ...SCENARIOS.evening },
  { key: "rainy",   ...SCENARIOS.rainy },
  { key: "accident",...SCENARIOS.accident },
  { key: "festival",...SCENARIOS.festival },
  { key: "night",   ...SCENARIOS.night },
];

const EMPTY = {
  "VEHS(ALL)_1":"","VEHS(ALL)_2":"","VEHS(ALL)_3":"","VEHS(ALL)_4":"","VEHS(ALL)_5":"","VEHS(ALL)_6":"",
  "SPEEDAVGARITH(ALL)_1":"","SPEEDAVGARITH(ALL)_2":"","SPEEDAVGARITH(ALL)_3":"","SPEEDAVGARITH(ALL)_4":"","SPEEDAVGARITH(ALL)_5":"","SPEEDAVGARITH(ALL)_6":"",
  "SPEEDAVGHARM(ALL)_1":"","SPEEDAVGHARM(ALL)_2":"","SPEEDAVGHARM(ALL)_3":"","SPEEDAVGHARM(ALL)_4":"","SPEEDAVGHARM(ALL)_5":"","SPEEDAVGHARM(ALL)_6":"",
  "QUEUEDELAY(ALL)_1":"","QUEUEDELAY(ALL)_2":"","QUEUEDELAY(ALL)_3":"","QUEUEDELAY(ALL)_4":"","QUEUEDELAY(ALL)_5":"","QUEUEDELAY(ALL)_6":"",
  "OCCUPRATE(ALL)_1":"","OCCUPRATE(ALL)_2":"","OCCUPRATE(ALL)_3":"","OCCUPRATE(ALL)_4":"","OCCUPRATE(ALL)_5":"","OCCUPRATE(ALL)_6":"",
  Hour:"",Minute:"",Day:"",Month:"",DayOfWeek:"",
};

function avg(obj, prefix) {
  const vals = [1,2,3,4,5,6].map(i => Number(obj[`${prefix}_${i}`])||0);
  return (vals.reduce((a,b)=>a+b,0)/6).toFixed(0);
}

function PredictionForm({ setPrediction }) {
  const [formData, setFormData] = useState({ ...EMPTY });
  const [activeScenario, setActiveScenario] = useState(null);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePredict = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const payload = { data: {} };
      Object.keys(formData).forEach((key) => {
        payload.data[key] = formData[key] === "" ? 0 : Number(formData[key]);
      });
      console.log("Sending:", payload);
      const response = await API.post("/predict", payload);
      setPrediction(response.data);
    } catch (err) {
      console.error(err);
      alert("Prediction Failed");
    } finally {
      setIsLoading(false);
    }
  };

  const selectScenario = (sc) => {
    setActiveScenario(sc.key);
    setFormData({ ...EMPTY, ...sc.values });
  };

  const hasData = activeScenario !== null;
  const activeSc = SCENARIO_LIST.find(s => s.key === activeScenario);

  const vehicleFields   = ["VEHS(ALL)_1","VEHS(ALL)_2","VEHS(ALL)_3","VEHS(ALL)_4","VEHS(ALL)_5","VEHS(ALL)_6"];
  const arithmeticSpeed = ["SPEEDAVGARITH(ALL)_1","SPEEDAVGARITH(ALL)_2","SPEEDAVGARITH(ALL)_3","SPEEDAVGARITH(ALL)_4","SPEEDAVGARITH(ALL)_5","SPEEDAVGARITH(ALL)_6"];
  const harmonicSpeed   = ["SPEEDAVGHARM(ALL)_1","SPEEDAVGHARM(ALL)_2","SPEEDAVGHARM(ALL)_3","SPEEDAVGHARM(ALL)_4","SPEEDAVGHARM(ALL)_5","SPEEDAVGHARM(ALL)_6"];
  const queueFields     = ["QUEUEDELAY(ALL)_1","QUEUEDELAY(ALL)_2","QUEUEDELAY(ALL)_3","QUEUEDELAY(ALL)_4","QUEUEDELAY(ALL)_5","QUEUEDELAY(ALL)_6"];
  const occupancyFields = ["OCCUPRATE(ALL)_1","OCCUPRATE(ALL)_2","OCCUPRATE(ALL)_3","OCCUPRATE(ALL)_4","OCCUPRATE(ALL)_5","OCCUPRATE(ALL)_6"];

  return (
    <>
      <style>{`
        .pf-wrap { font-family: 'Inter', system-ui, sans-serif; }

        /* Scenario Grid */
        .pf-scenarios {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
          margin-bottom: 24px;
        }
        @media(max-width:640px){ .pf-scenarios{ grid-template-columns: repeat(2,1fr); } }
        .pf-sc-card {
          background: white;
          border: 2px solid #E2E8F0;
          border-radius: 16px;
          padding: 16px 14px 14px;
          cursor: pointer;
          transition: all 0.18s ease;
          display: flex; flex-direction: column; gap: 6px;
          position: relative; overflow: hidden;
          user-select: none;
        }
        .pf-sc-card:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,0.08); }
        .pf-sc-card.active { box-shadow: 0 6px 24px rgba(0,0,0,0.08); }
        .pf-sc-emoji { font-size: 26px; line-height: 1; }
        .pf-sc-name { font-size: 13px; font-weight: 700; color: #0F172A; }
        .pf-sc-desc { font-size: 11px; color: #94A3B8; line-height: 1.3; }
        .pf-sc-check {
          position: absolute; top: 10px; right: 10px;
          width: 18px; height: 18px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 9px; color: white; opacity: 0;
          transition: opacity 0.15s;
        }
        .pf-sc-card.active .pf-sc-check { opacity: 1; }
        .pf-sc-glow {
          position: absolute; bottom: -20px; right: -20px;
          width: 80px; height: 80px; border-radius: 50%;
          filter: blur(20px); opacity: 0.4;
          pointer-events: none;
        }

        /* Sensor Summary */
        .pf-summary {
          background: #F8FAFC;
          border: 1px solid #E2E8F0;
          border-radius: 16px;
          padding: 20px;
          margin-bottom: 20px;
          transition: all 0.2s;
        }
        .pf-summary-title {
          font-size: 11px; font-weight: 700; color: #64748B;
          text-transform: uppercase; letter-spacing: 0.8px;
          margin: 0 0 14px; display: flex; align-items: center; gap: 8px;
        }
        .pf-summary-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 12px;
        }
        @media(max-width:640px){ .pf-summary-grid{ grid-template-columns: repeat(2,1fr); } }
        .pf-sum-item { display: flex; flex-direction: column; gap: 3px; }
        .pf-sum-label { font-size: 10px; font-weight: 600; color: #94A3B8; text-transform: uppercase; letter-spacing: 0.5px; }
        .pf-sum-value { font-size: 20px; font-weight: 800; color: #0F172A; letter-spacing: -0.8px; }
        .pf-sum-unit { font-size: 10px; color: #CBD5E1; }

        /* Predict Button */
        .pf-predict-btn {
          width: 100%; padding: 15px 20px;
          background: linear-gradient(135deg, #2563EB 0%, #6366F1 100%);
          color: white; border: none; border-radius: 14px;
          font-size: 15px; font-weight: 700; cursor: pointer;
          display: flex; align-items: center; justify-content: center; gap: 10px;
          transition: all 0.18s ease;
          font-family: 'Inter', system-ui, sans-serif;
          box-shadow: 0 4px 20px rgba(37,99,235,0.3);
          letter-spacing: -0.2px;
          margin-bottom: 20px;
        }
        .pf-predict-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(37,99,235,0.4);
        }
        .pf-predict-btn:disabled { opacity: 0.65; cursor: not-allowed; }
        .pf-spinner {
          width: 16px; height: 16px;
          border: 2.5px solid rgba(255,255,255,0.35);
          border-top-color: white; border-radius: 50%;
          animation: pfspin 0.7s linear infinite;
          flex-shrink: 0;
        }
        @keyframes pfspin { to { transform: rotate(360deg); } }

        /* Advanced toggle */
        .pf-adv-toggle {
          display: flex; align-items: center; justify-content: space-between;
          padding: 14px 18px;
          background: white; border: 1px solid #E2E8F0; border-radius: 14px;
          cursor: pointer; transition: all 0.15s;
          font-family: 'Inter', system-ui, sans-serif;
          margin-bottom: 4px;
        }
        .pf-adv-toggle:hover { border-color: #CBD5E1; background: #F8FAFC; }
        .pf-adv-toggle-left { display: flex; align-items: center; gap: 10px; }
        .pf-adv-toggle-label { font-size: 13.5px; font-weight: 600; color: #334155; }
        .pf-adv-toggle-sub { font-size: 11px; color: #94A3B8; }
        .pf-adv-count {
          background: #EFF6FF; color: #2563EB;
          border-radius: 6px; padding: 2px 8px;
          font-size: 11px; font-weight: 700;
        }
        .pf-adv-chevron {
          width: 20px; height: 20px; color: #94A3B8;
          transition: transform 0.2s ease;
        }
        .pf-adv-chevron.open { transform: rotate(180deg); }

        /* Advanced body */
        .pf-adv-body {
          background: white; border: 1px solid #E2E8F0;
          border-radius: 0 0 14px 14px; border-top: none;
          overflow: hidden;
          transition: max-height 0.3s ease, opacity 0.2s ease;
          max-height: 0; opacity: 0; pointer-events: none;
        }
        .pf-adv-body.open { max-height: 2000px; opacity: 1; pointer-events: auto; }
        .pf-adv-inner { padding: 20px 20px 16px; }

        /* Sections inside advanced */
        .pf-sec { margin-bottom: 20px; }
        .pf-sec-hdr {
          display: flex; align-items: center; gap: 8px;
          margin-bottom: 10px;
        }
        .pf-sec-dot { width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0; }
        .pf-sec-lbl { font-size: 11px; font-weight: 700; color: #475569; text-transform: uppercase; letter-spacing: 0.7px; }
        .pf-sec-line { flex: 1; height: 1px; background: #F1F5F9; }
        .pf-lane-grid { display: grid; grid-template-columns: repeat(6,1fr); gap: 8px; }
        @media(max-width:480px){ .pf-lane-grid{ grid-template-columns: repeat(3,1fr); } }
        .pf-lane-cell { display: flex; flex-direction: column; gap: 3px; }
        .pf-lane-lbl { font-size: 9px; font-weight: 700; color: #CBD5E1; text-align: center; text-transform: uppercase; }
        .pf-inp {
          width: 100%; box-sizing: border-box;
          background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 8px;
          padding: 8px 6px; font-size: 12.5px; color: #0F172A;
          text-align: center; font-family: 'Inter', system-ui, sans-serif;
          transition: all 0.15s;
          -moz-appearance: textfield;
        }
        .pf-inp::-webkit-inner-spin-button,.pf-inp::-webkit-outer-spin-button { -webkit-appearance: none; }
        .pf-inp::placeholder { color: #CBD5E1; }
        .pf-inp:focus { outline: none; border-color: #2563EB; box-shadow: 0 0 0 3px rgba(37,99,235,0.1); background: white; }
        .pf-dt-grid { display: grid; grid-template-columns: repeat(5,1fr); gap: 8px; }
        @media(max-width:480px){ .pf-dt-grid{ grid-template-columns: repeat(2,1fr); } }
        .pf-dt-inp {
          width: 100%; box-sizing: border-box;
          background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 8px;
          padding: 9px 10px; font-size: 12.5px; color: #0F172A;
          font-family: 'Inter', system-ui, sans-serif; transition: all 0.15s;
          -moz-appearance: textfield;
        }
        .pf-dt-inp::-webkit-inner-spin-button,.pf-dt-inp::-webkit-outer-spin-button { -webkit-appearance: none; }
        .pf-dt-inp::placeholder { color: #CBD5E1; font-size: 11px; }
        .pf-dt-inp:focus { outline: none; border-color: #2563EB; box-shadow: 0 0 0 3px rgba(37,99,235,0.1); background: white; }
      `}</style>

      <form className="pf-wrap" onSubmit={handlePredict}>

        {/* ── Step 1: Choose Scenario ── */}
        <div style={{ marginBottom: 8 }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: "#94A3B8", textTransform: "uppercase", letterSpacing: "0.8px", margin: "0 0 12px", display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ width: 18, height: 18, borderRadius: "50%", background: "#2563EB", color: "white", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 800, flexShrink: 0 }}>1</span>
            Choose a Traffic Scenario
          </p>
          <div className="pf-scenarios">
            {SCENARIO_LIST.map((sc) => (
              <div
                key={sc.key}
                className={`pf-sc-card${activeScenario === sc.key ? " active" : ""}`}
                style={activeScenario === sc.key ? { borderColor: sc.color, background: sc.glow } : {}}
                onClick={() => selectScenario(sc)}
              >
                <div className="pf-sc-glow" style={{ background: sc.color }} />
                <div className="pf-sc-check" style={{ background: sc.color }}>✓</div>
                <div className="pf-sc-emoji">{sc.emoji}</div>
                <div className="pf-sc-name">{sc.label}</div>
                <div className="pf-sc-desc">{sc.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Step 2: Sensor Summary ── */}
        <div style={{ marginBottom: 8 }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: "#94A3B8", textTransform: "uppercase", letterSpacing: "0.8px", margin: "0 0 12px", display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ width: 18, height: 18, borderRadius: "50%", background: hasData ? "#2563EB" : "#CBD5E1", color: "white", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 800, flexShrink: 0 }}>2</span>
            Sensor Summary
          </p>
          <div className="pf-summary" style={hasData && activeSc ? { borderColor: activeSc.border, background: activeSc.glow } : {}}>
            {!hasData ? (
              <p style={{ margin: 0, fontSize: 13, color: "#94A3B8", textAlign: "center", padding: "12px 0" }}>
                Select a scenario above to populate sensor data
              </p>
            ) : (
              <>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                  <span style={{ fontSize: 20 }}>{activeSc?.emoji}</span>
                  <span style={{ fontSize: 14, fontWeight: 700, color: "#0F172A" }}>{activeSc?.label}</span>
                  <span style={{
                    fontSize: 11, fontWeight: 600, padding: "2px 10px", borderRadius: "100px",
                    background: activeSc?.glow, color: activeSc?.color,
                    border: `1px solid ${activeSc?.border}`,
                  }}>Auto-populated</span>
                </div>
                <div className="pf-summary-grid">
                  {[
                    { label: "Avg Vehicles", value: avg(formData, "VEHS(ALL)"), unit: "veh/lane" },
                    { label: "Arith Speed", value: avg(formData, "SPEEDAVGARITH(ALL)"), unit: "km/h" },
                    { label: "Queue Delay", value: avg(formData, "QUEUEDELAY(ALL)"), unit: "sec" },
                    { label: "Occupancy", value: avg(formData, "OCCUPRATE(ALL)"), unit: "%" },
                    { label: "Time", value: `${String(formData.Hour||0).padStart(2,"0")}:${String(formData.Minute||0).padStart(2,"0")}`, unit: "hh:mm" },
                  ].map((s) => (
                    <div key={s.label} className="pf-sum-item">
                      <span className="pf-sum-label">{s.label}</span>
                      <span className="pf-sum-value">{s.value}</span>
                      <span className="pf-sum-unit">{s.unit}</span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* ── Step 3: Predict ── */}
        <div style={{ marginBottom: 20 }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: "#94A3B8", textTransform: "uppercase", letterSpacing: "0.8px", margin: "0 0 12px", display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ width: 18, height: 18, borderRadius: "50%", background: hasData ? "#2563EB" : "#CBD5E1", color: "white", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 800, flexShrink: 0 }}>3</span>
            Run Prediction
          </p>
          <button type="submit" className="pf-predict-btn" disabled={isLoading}>
            {isLoading ? (
              <>
                <span className="pf-spinner" />
                Analyzing traffic data…
              </>
            ) : (
              <>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="13,2 3,14 12,14 11,22 21,10 12,10"/>
                </svg>
                🚦 Predict Traffic Congestion
              </>
            )}
          </button>
        </div>

        {/* ── Collapsible Advanced Inputs ── */}
        <div id="sensors">
          <div className="pf-adv-toggle" onClick={() => setShowAdvanced(!showAdvanced)}>
            <div className="pf-adv-toggle-left">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 010 14.14M4.93 4.93a10 10 0 000 14.14"/>
              </svg>
              <div>
                <div className="pf-adv-toggle-label">Advanced Sensor Inputs</div>
                <div className="pf-adv-toggle-sub">Manual override — all 6 lanes × 5 metrics + time</div>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span className="pf-adv-count">35 fields</span>
              <svg className={`pf-adv-chevron${showAdvanced ? " open" : ""}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6,9 12,15 18,9"/>
              </svg>
            </div>
          </div>

          <div className={`pf-adv-body${showAdvanced ? " open" : ""}`}>
            <div className="pf-adv-inner">

              {/* Date & Time */}
              <div className="pf-sec">
                <div className="pf-sec-hdr">
                  <div className="pf-sec-dot" style={{ background: "#2563EB" }} />
                  <span className="pf-sec-lbl">Date &amp; Time</span>
                  <div className="pf-sec-line" />
                </div>
                <div className="pf-dt-grid">
                  {[
                    { name: "Hour", placeholder: "Hour (0–23)" },
                    { name: "Minute", placeholder: "Minute (0–59)" },
                    { name: "Day", placeholder: "Day (1–31)" },
                    { name: "Month", placeholder: "Month (1–12)" },
                    { name: "DayOfWeek", placeholder: "Weekday (0–6)" },
                  ].map(f => (
                    <input key={f.name} className="pf-dt-inp" type="number"
                      placeholder={f.placeholder} name={f.name}
                      value={formData[f.name]} onChange={handleChange} />
                  ))}
                </div>
              </div>

              {/* Sensor groups */}
              {[
                { label: "Vehicle Count", fields: vehicleFields, color: "#2563EB" },
                { label: "Arithmetic Speed", fields: arithmeticSpeed, color: "#6366F1" },
                { label: "Harmonic Speed", fields: harmonicSpeed, color: "#8B5CF6" },
                { label: "Queue Delay", fields: queueFields, color: "#F59E0B" },
                { label: "Occupancy Rate", fields: occupancyFields, color: "#10B981" },
              ].map(g => (
                <div key={g.label} className="pf-sec">
                  <div className="pf-sec-hdr">
                    <div className="pf-sec-dot" style={{ background: g.color }} />
                    <span className="pf-sec-lbl">{g.label}</span>
                    <div className="pf-sec-line" />
                  </div>
                  <div className="pf-lane-grid">
                    {g.fields.map((field, idx) => (
                      <div key={field} className="pf-lane-cell">
                        <span className="pf-lane-lbl">Lane {idx+1}</span>
                        <input className="pf-inp" type="number" placeholder="—"
                          name={field} value={formData[field]||""} onChange={handleChange} />
                      </div>
                    ))}
                  </div>
                </div>
              ))}

            </div>
          </div>
        </div>

      </form>
    </>
  );
}

export default PredictionForm;
