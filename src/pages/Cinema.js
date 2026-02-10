import { useNavigate } from "react-router-dom";

export const Cinema = () => {
  const navigate = useNavigate();

  const cinemas = ["PVR Cinemas", "INOX", "Cinepolis"];

  return (
    <div className="container">
      <h2>Select Cinema</h2>
      {cinemas.map(c => (
        <div
          key={c}
          className="cinema-card"
          onClick={() => {
            localStorage.setItem("selectedCinema", c);
            navigate("/showtime");
          }}
        >
          {c}
        </div>
      ))}
    </div>
  );
};
