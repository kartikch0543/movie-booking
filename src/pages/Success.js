import { useNavigate } from "react-router-dom";

export const Success = () => {
  const navigate = useNavigate();
  const booking = JSON.parse(localStorage.getItem("currentBooking"));

  if (!booking) {
    return (
      <div className="container" style={{ textAlign: "center" }}>
        <h2>No booking found</h2>
        <button onClick={() => navigate("/dashboard")}>Go Home</button>
      </div>
    );
  }

  return (
    <div className="container" style={{ textAlign: "center", maxWidth: "600px", margin: "0 auto" }}>
      <h2 style={{ color: "green" }}>Booking Confirmed! ✅</h2>

      <div className="invoice" style={{
        border: "1px solid #ddd",
        padding: "20px",
        borderRadius: "10px",
        textAlign: "left",
        backgroundColor: "#fff",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)"
      }}>
        <h3 style={{ borderBottom: "1px solid #eee", paddingBottom: "10px" }}>Invoice</h3>
        <p><strong>Transaction ID:</strong> #{booking.bookingId}</p>
        <p><strong>User:</strong> {booking.user.username}</p>
        <p><strong>Movie:</strong> {booking.movie}</p>
        <p><strong>Venue:</strong> {booking.cinema}, {booking.city}</p>
        <p><strong>Date & Time:</strong> {booking.date} at {booking.time}</p>
        <p><strong>Seats:</strong> {booking.people}</p>
        <h3 style={{ borderTop: "1px solid #eee", paddingTop: "10px", marginTop: "10px" }}>
          Total Amount: ₹{booking.totalPrice}
        </h3>
      </div>

      <button
        style={{ marginTop: "20px", padding: "10px 20px", fontSize: "16px", cursor: "pointer" }}
        onClick={() => navigate("/dashboard")}
      >
        Book Another Movie
      </button>
    </div>
  );
};
