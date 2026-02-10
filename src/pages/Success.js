import { useNavigate } from "react-router-dom";
import { Navbar } from "../components/common/Navbar";
import "./Success.css";

export const Success = () => {
  const navigate = useNavigate();
  const booking = JSON.parse(localStorage.getItem("currentBooking"));

  if (!booking) {
    return (
      <div className="success-page">
        <Navbar />
        <div className="container success-container">
          <h2>No booking found</h2>
          <button className="primary-btn" onClick={() => navigate("/dashboard")}>
            Go Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="success-page">
      <Navbar />
      <div className="container success-container">
        <h1 className="auth-logo">BOOKyourMOVIE</h1>
        <div className="success-header">
          <h2 className="success-title">Booking Confirmed! ✅</h2>
          <p>Your ticket details have been sent to your email.</p>
        </div>

        <div className="invoice">
          <div className="invoice__header">
            <h3>Invoice</h3>
            <span className="invoice__id">#{booking.bookingId}</span>
          </div>

          <div className="invoice__details">
            <div className="invoice__row">
              <strong>User</strong>
              <span>{booking.user.username}</span>
            </div>
            <div className="invoice__row">
              <strong>Movie</strong>
              <span>{booking.movie}</span>
            </div>
            <div className="invoice__row">
              <strong>Venue</strong>
              <span>{booking.cinema}, {booking.city}</span>
            </div>
            <div className="invoice__row">
              <strong>Date & Time</strong>
              <span>{booking.date} at {booking.time}</span>
            </div>
            <div className="invoice__row">
              <strong>Seats</strong>
              <span>{booking.people}</span>
            </div>
          </div>

          <div className="invoice__total">
            <span>Total Amount</span>
            <strong>₹{booking.totalPrice}</strong>
          </div>
        </div>

        <button className="primary-btn home-btn" onClick={() => navigate("/dashboard")}>
          Book Another Movie
        </button>
      </div>
    </div>
  );
};
