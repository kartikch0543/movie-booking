import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Showtime = () => {
  const navigate = useNavigate();
  const movie = JSON.parse(localStorage.getItem("selectedMovie"));

  const cinemaMap = {
    Delhi: ["PVR Saket", "INOX Nehru Place"],
    Mumbai: ["PVR Andheri", "INOX Malad"],
    Bangalore: ["PVR Orion", "Cinepolis Whitefield"]
  };

  const [city, setCity] = useState("");
  const [cinema, setCinema] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [time, setTime] = useState("");
  const [people, setPeople] = useState(1);

  const PRICE_PER_TICKET = 250;
  const totalPrice = people * PRICE_PER_TICKET;

  const confirmBooking = () => {
    if (!city || !cinema || !time) {
      alert("Please complete all selections");
      return;
    }

    const booking = {
      user: JSON.parse(localStorage.getItem("currentUser")),
      movie: movie.title,
      city,
      cinema,
      date,
      time,
      people,
      totalPrice
    };

    const bookings = JSON.parse(localStorage.getItem("bookings")) || [];
    bookings.push(booking);
    localStorage.setItem("bookings", JSON.stringify(bookings));

    navigate("/success");
  };

  return (
    <div className="container">
      <h2>Book Tickets</h2>

      <p><b>Movie:</b> {movie.title}</p>

      <label>City</label>
      <select onChange={e => setCity(e.target.value)}>
        <option value="">Select City</option>
        <option>Delhi</option>
        <option>Mumbai</option>
        <option>Bangalore</option>
      </select>

      {city && (
        <>
          <label>Cinema</label>
          <select onChange={e => setCinema(e.target.value)}>
            <option value="">Select Cinema</option>
            {cinemaMap[city].map(c => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </>
      )}

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
        {[1,2,3,4,5,6].map(n => (
          <option key={n}>{n}</option>
        ))}
      </select>

      <h3>Total Price: ₹{totalPrice}</h3>

      <button className="confirm-btn" onClick={confirmBooking}>
        Confirm Booking
      </button>
    </div>
  );
};
