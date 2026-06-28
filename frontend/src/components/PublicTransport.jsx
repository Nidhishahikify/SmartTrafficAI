function PublicTransport({ prediction }) {

    const level = prediction?.prediction || "Low Congestion";

    let transport = [];

    if (level === "High Congestion") {

        transport = [
            {
                id: 1,
                route: "Bus Route 21",
                status: "Delayed",
                delay: "12 mins",
                passengers: 52,
                color: "#DC2626"
            },
            {
                id: 2,
                route: "Metro Line 2",
                status: "Delayed",
                delay: "8 mins",
                passengers: 180,
                color: "#DC2626"
            },
            {
                id: 3,
                route: "School Bus",
                status: "Heavy Delay",
                delay: "15 mins",
                passengers: 36,
                color: "#DC2626"
            }
        ];

    }

    else if (level === "Medium Congestion") {

        transport = [
            {
                id: 1,
                route: "Bus Route 21",
                status: "Moderate Delay",
                delay: "5 mins",
                passengers: 46,
                color: "#F59E0B"
            },
            {
                id: 2,
                route: "Metro Line 2",
                status: "On Time",
                delay: "2 mins",
                passengers: 150,
                color: "#16A34A"
            },
            {
                id: 3,
                route: "School Bus",
                status: "Slight Delay",
                delay: "4 mins",
                passengers: 32,
                color: "#F59E0B"
            }
        ];

    }

    else {

        transport = [
            {
                id: 1,
                route: "Bus Route 21",
                status: "On Time",
                delay: "0 mins",
                passengers: 38,
                color: "#16A34A"
            },
            {
                id: 2,
                route: "Metro Line 2",
                status: "On Time",
                delay: "0 mins",
                passengers: 120,
                color: "#16A34A"
            },
            {
                id: 3,
                route: "School Bus",
                status: "On Time",
                delay: "0 mins",
                passengers: 28,
                color: "#16A34A"
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
            padding:"20px",
            borderRadius:"16px",
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

        status:(color)=>({

            display:"inline-block",
            marginTop:"15px",
            padding:"6px 15px",
            background:color,
            color:"white",
            borderRadius:"20px",
            fontWeight:"bold"

        })

    };

    return(

        <div style={styles.container}>

            <div style={styles.header}>

                <h2 style={styles.heading}>
                    🚌 Public Transport Status
                </h2>

                <span style={styles.badge}>
                    Live Simulation
                </span>

            </div>

            <div style={styles.grid}>

                {transport.map(bus=>(

                    <div key={bus.id} style={styles.card}>

                        <div style={styles.title}>
                            🚌 {bus.route}
                        </div>

                        <div style={styles.row}>
                            <span style={styles.label}>Status</span>
                            <span>{bus.status}</span>
                        </div>

                        <div style={styles.row}>
                            <span style={styles.label}>Delay</span>
                            <span>{bus.delay}</span>
                        </div>

                        <div style={styles.row}>
                            <span style={styles.label}>Passengers</span>
                            <span>{bus.passengers}</span>
                        </div>

                        <div style={styles.row}>
                            <span style={styles.label}>Traffic Level</span>
                            <span>{level}</span>
                        </div>

                        <div style={styles.status(bus.color)}>
                            {bus.status}
                        </div>

                    </div>

                ))}

            </div>

        </div>

    );

}

export default PublicTransport;