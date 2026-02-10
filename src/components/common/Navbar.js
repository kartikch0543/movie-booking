import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

export const Navbar = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 80);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`nav ${show ? "nav__black" : ""}`}>
      <div className="nav__contents">
        {/* LEFT */}
        <h1 className="nav__logo" onClick={() => navigate("/dashboard")}>
          BOOK<span>your</span>MOVIE
        </h1>

        {/* RIGHT */}
        <nav className="nav__links">
          <Link to="/dashboard" className="nav__link">Home</Link>
          <Link to="/city-selection" className="nav__link">Location</Link>
          <button className="nav__avatar" onClick={() => navigate("/")}>
            Log Out
          </button>
        </nav>
      </div>
    </header>
  );
};
