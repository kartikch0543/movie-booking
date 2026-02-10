import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../components/common/Navbar";
import { fetchTrending, fetchMoviesByGenre } from "../api/tmdb";
import "./Dashboard.css";

export const Dashboard = () => {
  const navigate = useNavigate();
  const selectedCity = localStorage.getItem("selectedCity");

  const [trending, setTrending] = useState([]);
  const [action, setAction] = useState([]);
  const [animation, setAnimation] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔐 Guard route
  useEffect(() => {
    if (!selectedCity) {
      navigate("/city-selection");
    }
  }, [selectedCity, navigate]);

  // 🎬 Fetch movies ONCE
  useEffect(() => {
    const loadMovies = async () => {
      try {
        const [trendRes, actionRes, animationRes] = await Promise.all([
          fetchTrending(),
          fetchMoviesByGenre(28),   // Action
          fetchMoviesByGenre(16),   // Animation
        ]);

        setTrending(trendRes.data.results);
        setAction(actionRes.data.results);
        setAnimation(animationRes.data.results);
      } catch (error) {
        console.error("TMDB fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, []);

  const selectMovie = (movie) => {
    localStorage.setItem("selectedMovie", JSON.stringify(movie));
    navigate("/showtime");
  };

  if (loading) {
    return <h2 style={{ textAlign: "center" }}>Loading movies...</h2>;
  }

  const renderSection = (title, movies) => (
    <section className="movie-section">
      <h2 className="category-title">{title}</h2>
      <div className="movie-grid">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="movie-card-simple"
            onClick={() => selectMovie(movie)}
          >
            <img
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : "/no-poster.png"
              }
              alt={movie.title}
              className="movie-poster"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/no-poster.png";
              }}
            />
            <div className="movie-info">
              <h4>{movie.title}</h4>
              <p>⭐ {movie.vote_average?.toFixed(1)}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );

  return (
    <div className="dashboard">
      <Navbar />
      <div className="container">
        <h1 className="main-title">Movies in {selectedCity}</h1>

        {renderSection("Trending", trending)}
        {renderSection("Action", action)}
        {renderSection("Animation", animation)}
      </div>
    </div>
  );
};
