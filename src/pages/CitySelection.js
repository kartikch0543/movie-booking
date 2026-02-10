import { useNavigate } from "react-router-dom";
import { Navbar } from "../components/common/Navbar";
import "./CitySelection.css";

export const CitySelection = () => {
    const navigate = useNavigate();
    const cities = ["Delhi", "Mumbai", "Bangalore", "Chennai", "Kolkata"];

    const selectCity = (city) => {
        localStorage.setItem("selectedCity", city);
        navigate("/dashboard");
    };

    return (
        <div className="city-selection">
            <Navbar />
            <div className="container">
                <h2 className="city-selection__title">Select Your City</h2>
                <div className="city-grid">
                    {cities.map((city) => (
                        <button
                            key={city}
                            onClick={() => selectCity(city)}
                            className="city-btn"
                        >
                            {city}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};
