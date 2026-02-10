import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Dashboard } from "./pages/Dashboard";
import { Showtime } from "./pages/Showtime";
import { Success } from "./pages/Success";
import { CitySelection } from "./pages/CitySelection";
import "./App.css";
import "./index.css"
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/city-selection" element={<CitySelection />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/showtime" element={<Showtime />} />
        <Route path="/success" element={<Success />} />
      </Routes>
    </BrowserRouter>
  );
}
