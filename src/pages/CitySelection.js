import { useNavigate } from "react-router-dom";

export const CitySelection = () => {
    const navigate = useNavigate();
    const cities = ["Delhi", "Mumbai", "Bangalore", "Chennai", "Kolkata"];

    const selectCity = (city) => {
        localStorage.setItem("selectedCity", city);
        navigate("/dashboard");
    };

    return (
        <div className="container" style={{ textAlign: "center", marginTop: "50px" }}>
            <h2>Select Your City</h2>
            <div className="city-grid" style={{ display: "flex", gap: "20px", justifyContent: "center", flexWrap: "wrap", marginTop: "30px" }}>
                {cities.map((city) => (
                    <button
                        key={city}
                        onClick={() => selectCity(city)}
                        style={{
                            padding: "15px 30px",
                            fontSize: "18px",
                            cursor: "pointer",
                            backgroundColor: "#f0f0f0",
                            border: "1px solid #ccc",
                            borderRadius: "8px",
                            transition: "0.3s"
                        }}
                        onMouseOver={(e) => e.target.style.backgroundColor = "#e0e0e0"}
                        onMouseOut={(e) => e.target.style.backgroundColor = "#f0f0f0"}
                    >
                        {city}
                    </button>
                ))}
            </div>
        </div>
    );
};
