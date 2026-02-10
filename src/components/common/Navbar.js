import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

export const Navbar = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const transitionNavBar = () => {
    if (window.scrollY > 50) {
      setShow(true);
    } else {
      setShow(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", transitionNavBar);
    return () => window.removeEventListener("scroll", transitionNavBar);
  }, []);

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className={`nav ${show ? "nav__black" : ""}`}>
      <div className="nav__contents">
        {/* LOGO */}
        <h1 className="nav__logo" onClick={() => navigate("/dashboard")}>
          BOOK<span>your</span>MOVIE
        </h1>

        {/* LINKS */}
        <div className="nav__links">
          <Link to="/dashboard" className="nav__link">
            Home
          </Link>
          <Link to="/city-selection" className="nav__link">
            Location
          </Link>
          <button className="nav__avatar" onClick={logout}>
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};
