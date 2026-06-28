function HotspotMap({ prediction }) {

    const level = prediction?.prediction || "Low Congestion";

    let hotspots = [];

    if (level === "High Congestion") {

        hotspots = [
            {
                id: 1,
                location: "City Junction",
                congestion: "High",
                vehicles: 420,
                avgSpeed: "12 km/h",
                color: "#DC2626",
                recommendation: "Increase signal timing"
            },
            {
                id: 2,
                location: "Railway Circle",
                congestion: "High",
                vehicles: 380,
                avgSpeed: "15 km/h",
                color: "#DC2626",
                recommendation: "Divert traffic"
            },
            {
                id: 3,
                location: "Market Road",
                congestion: "Medium",
                vehicles: 260,
                avgSpeed: "24 km/h",
                color: "#F59E0B",
                recommendation: "Monitor continuously"
            }
        ];

    }

    else if (level === "Medium Congestion") {

        hotspots = [
            {
                id: 1,
                location: "City Junction",
                congestion: "Medium",
                vehicles: 250,
                avgSpeed: "30 km/h",
                color: "#F59E0B",
                recommendation: "Optimize signals"
            },
            {
                id: 2,
                location: "Railway Circle",
                congestion: "Medium",
                vehicles: 220,
                avgSpeed: "32 km/h",
                color: "#F59E0B",
                recommendation: "Monitor traffic"
            },
            {
                id: 3,
                location: "Market Road",
                congestion: "Low",
                vehicles: 140,
                avgSpeed: "48 km/h",
                color: "#16A34A",
                recommendation: "Normal operation"
            }
        ];

    }

    else {

        hotspots = [
            {
                id: 1,
                location: "City Junction",
                congestion: "Low",
                vehicles: 120,
                avgSpeed: "58 km/h",
                color: "#16A34A",
                recommendation: "No action required"
            },
            {
                id: 2,
                location: "Railway Circle",
                congestion: "Low",
                vehicles: 110,
                avgSpeed: "55 km/h",
                color: "#16A34A",
                recommendation: "Normal operation"
            },
            {
                id: 3,
                location: "Market Road",
                congestion: "Low",
                vehicles: 95,
                avgSpeed: "60 km/h",
                color: "#16A34A",
                recommendation: "Smooth traffic"
            }
        ];

    }

    const styles = {

        container:{
            background:"#fff",
            padding:"25px",
            borderRadius:"20px",
            boxShadow:"0 8px 25px rgba(0,0,0,.08)",
            marginBottom:"30px"
        },

        header:{
            display:"flex",
            justifyContent:"space-between",
            alignItems:"center",
            marginBottom:"20px"
        },

        heading:{
            color:"#1E3A8A",
            fontSize:"24px",
            fontWeight:"bold"
        },

        badge:{
            background:"#DBEAFE",
            color:"#2563EB",
            padding:"8px 14px",
            borderRadius:"20px",
            fontWeight:"bold",
            fontSize:"13px"
        },

        grid:{
            display:"grid",
            gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",
            gap:"20px"
        },

        card:{
            background:"#F8FAFC",
            borderRadius:"16px",
            padding:"20px",
            border:"1px solid #E5E7EB"
        },

        title:{
            fontSize:"20px",
            fontWeight:"bold",
            color:"#1E3A8A",
            marginBottom:"15px"
        },

        row:{
            display:"flex",
            justifyContent:"space-between",
            marginBottom:"10px"
        },

        label:{
            color:"#64748B",
            fontWeight:"600"
        },

        value:{
            color:"#111827"
        },

        status:(color)=>({

            display:"inline-block",
            background:color,
            color:"white",
            padding:"6px 15px",
            borderRadius:"20px",
            fontWeight:"bold",
            marginTop:"15px"

        })

    };

    return(

        <div style={styles.container}>

            <div style={styles.header}>

                <h2 style={styles.heading}>
                    🚦 Congestion Hotspots
                </h2>

                <span style={styles.badge}>
                    AI Generated
                </span>

            </div>

            <div style={styles.grid}>

                {hotspots.map((spot)=>(

                    <div key={spot.id} style={styles.card}>

                        <div style={styles.title}>
                            📍 {spot.location}
                        </div>

                        <div style={styles.row}>
                            <span style={styles.label}>Congestion</span>
                            <span>{spot.congestion}</span>
                        </div>

                        <div style={styles.row}>
                            <span style={styles.label}>Vehicles</span>
                            <span>{spot.vehicles}</span>
                        </div>

                        <div style={styles.row}>
                            <span style={styles.label}>Average Speed</span>
                            <span>{spot.avgSpeed}</span>
                        </div>

                        <div style={styles.row}>
                            <span style={styles.label}>Recommendation</span>
                            <span>{spot.recommendation}</span>
                        </div>

                        <div style={styles.status(spot.color)}>
                            {spot.congestion} Priority
                        </div>

                    </div>

                ))}

            </div>

        </div>

    );

}

export default HotspotMap;