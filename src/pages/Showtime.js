import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Showtime = () => {
  const navigate = useNavigate();
  const movie = JSON.parse(localStorage.getItem("selectedMovie"));
  const city = localStorage.getItem("selectedCity");

  // Expanded cinema map for more cities
  const cinemaMap = {
    Delhi: ["PVR Saket", "INOX Nehru Place", "DT Cinemas"],
    Mumbai: ["PVR Andheri", "INOX Malad", "Regal Cinema"],
    Bangalore: ["PVR Orion", "Cinepolis Whitefield", "IMAX"],
    Chennai: ["PVR Sathyam", "Escape Cinemas"],
    Kolkata: ["PVR Mani Square", "INOX Quest"]
  };

  const [cinema, setCinema] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [time, setTime] = useState("");
  const [people, setPeople] = useState(1);

  const PRICE_PER_TICKET = 250;
  const totalPrice = people * PRICE_PER_TICKET;

  useEffect(() => {
    if (!movie || !city) {
      navigate("/dashboard");
    }
  }, [movie, city, navigate]);

  const confirmBooking = () => {
    if (!cinema || !time) {
      alert("Please complete all selections");
      return;
    }

    const booking = {
      bookingId: Math.floor(Math.random() * 1000000), // Random Transaction ID
      user: JSON.parse(localStorage.getItem("currentUser")) || { username: "Guest" },
      movie: movie.title,
      city,
      cinema,
      date,
      time,
      people,
      totalPrice
    };

    // Store current booking for the Invoice page
    localStorage.setItem("currentBooking", JSON.stringify(booking));

    const bookings = JSON.parse(localStorage.getItem("bookings")) || [];
    bookings.push(booking);
    localStorage.setItem("bookings", JSON.stringify(bookings));

    navigate("/success");
  };

  if (!movie || !city) return null;

  return (
    <div className="container">
      <h2>Book Tickets</h2>

      <div className="booking-summary" style={{ background: "#f9f9f9", padding: "15px", borderRadius: "8px", marginBottom: "20px" }}>
        <p><b>Movie:</b> {movie.title}</p>
        <p><b>City:</b> {city}</p>
      </div>

      <label>Cinema</label>
      <select onChange={e => setCinema(e.target.value)}>
        <option value="">Select Cinema</option>
        {(cinemaMap[city] || []).map(c => (
          <option key={c}>{c}</option>
        ))}
      </select>

      <label>Date</label>
      <input type="date" value={date} onChange={e => setDate(e.target.value)} />

      <label>Show Time</label>
      <select onChange={e => setTime(e.target.value)}>
        <option value="">Select Time</option>
        <option>10:00 AM</option>
        <option>1:00 PM</option>
        <option>4:00 PM</option>
        <option>7:00 PM</option>
        <option>10:00 PM</option>
      </select>

      <label>People</label>
      <select onChange={e => setPeople(Number(e.target.value))}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
          <option key={n}>{n}</option>
        ))}
      </select>

      <h3>Total Price: ₹{totalPrice}</h3>

      <button className="confirm-btn" onClick={confirmBooking}>
        Proceed to Payment
      </button>
    </div>
  );
};
