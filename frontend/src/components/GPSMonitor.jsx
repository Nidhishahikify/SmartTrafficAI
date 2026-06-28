function GPSMonitor({ prediction }) {

    const level = prediction?.prediction || "Low Congestion";

    let vehicles = [];

    if (level === "High Congestion") {

        vehicles = [
            {
                id: 1,
                name: "Vehicle A",
                latitude: "12.8790",
                longitude: "74.8425",
                speed: "12 km/h",
                status: "Stopped",
                color: "#DC2626"
            },
            {
                id: 2,
                name: "Vehicle B",
                latitude: "12.8812",
                longitude: "74.8441",
                speed: "18 km/h",
                status: "Slow Moving",
                color: "#DC2626"
            },
            {
                id: 3,
                name: "Vehicle C",
                latitude: "12.8835",
                longitude: "74.8468",
                speed: "15 km/h",
                status: "Slow Moving",
                color: "#EAB308"
            }
        ];

    }

    else if (level === "Medium Congestion") {

        vehicles = [
            {
                id: 1,
                name: "Vehicle A",
                latitude: "12.8790",
                longitude: "74.8425",
                speed: "32 km/h",
                status: "Moving",
                color: "#EAB308"
            },
            {
                id: 2,
                name: "Vehicle B",
                latitude: "12.8812",
                longitude: "74.8441",
                speed: "28 km/h",
                status: "Moderate",
                color: "#EAB308"
            },
            {
                id: 3,
                name: "Vehicle C",
                latitude: "12.8835",
                longitude: "74.8468",
                speed: "35 km/h",
                status: "Moving",
                color: "#16A34A"
            }
        ];

    }

    else {

        vehicles = [
            {
                id: 1,
                name: "Vehicle A",
                latitude: "12.8790",
                longitude: "74.8425",
                speed: "58 km/h",
                status: "Moving",
                color: "#16A34A"
            },
            {
                id: 2,
                name: "Vehicle B",
                latitude: "12.8812",
                longitude: "74.8441",
                speed: "55 km/h",
                status: "Moving",
                color: "#16A34A"
            },
            {
                id: 3,
                name: "Vehicle C",
                latitude: "12.8835",
                longitude: "74.8468",
                speed: "60 km/h",
                status: "Moving",
                color: "#16A34A"
            }
        ];

    }

    const styles = {

        container: {
            background: "#fff",
            padding: "25px",
            borderRadius: "20px",
            boxShadow: "0 8px 25px rgba(0,0,0,.08)",
            marginBottom: "30px"
        },

        header: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px"
        },

        heading: {
            color: "#1E3A8A",
            fontSize: "24px",
            fontWeight: "bold"
        },

        badge: {
            background: "#DBEAFE",
            color: "#2563EB",
            padding: "8px 15px",
            borderRadius: "20px",
            fontSize: "13px",
            fontWeight: "bold"
        },

        grid: {
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
            gap: "20px"
        },

        card: {
            background: "#F8FAFC",
            borderRadius: "16px",
            padding: "20px",
            border: "1px solid #E2E8F0",
            transition: ".3s"
        },

        vehicle: {
            fontSize: "20px",
            fontWeight: "bold",
            color: "#1E3A8A",
            marginBottom: "15px"
        },

        row: {
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "10px",
            fontSize: "15px"
        },

        label: {
            color: "#64748B",
            fontWeight: "600"
        },

        value: {
            color: "#111827"
        },

        status: (color) => ({
            display: "inline-block",
            background: color,
            color: "white",
            padding: "6px 14px",
            borderRadius: "20px",
            fontWeight: "bold",
            marginTop: "15px"
        })

    };

    return (

        <div style={styles.container}>

            <div style={styles.header}>

                <h2 style={styles.heading}>
                    📍 GPS Vehicle Monitoring
                </h2>

                <span style={styles.badge}>
                    Simulated Live Data
                </span>

            </div>

            <div style={styles.grid}>

                {vehicles.map((vehicle) => (

                    <div key={vehicle.id} style={styles.card}>

                        <div style={styles.vehicle}>
                            🚗 {vehicle.name}
                        </div>

                        <div style={styles.row}>
                            <span style={styles.label}>Latitude</span>
                            <span style={styles.value}>{vehicle.latitude}</span>
                        </div>

                        <div style={styles.row}>
                            <span style={styles.label}>Longitude</span>
                            <span style={styles.value}>{vehicle.longitude}</span>
                        </div>

                        <div style={styles.row}>
                            <span style={styles.label}>Speed</span>
                            <span style={styles.value}>{vehicle.speed}</span>
                        </div>

                        <div style={styles.row}>
                            <span style={styles.label}>Prediction</span>
                            <span style={styles.value}>{level}</span>
                        </div>

                        <div style={styles.status(vehicle.color)}>
                            {vehicle.status}
                        </div>

                    </div>

                ))}

            </div>

        </div>

    );

}

export default GPSMonitor;