import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_KEY = "5155153b70cd6a74e302e44b2f6e55f9";

export const Dashboard = () => {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}`)
      .then(res => res.json())
      .then(data => setMovies(data.results || []))
      .catch(err => console.error(err));
  }, []);

  const selectMovie = (movie) => {
    localStorage.setItem("selectedMovie", JSON.stringify(movie));
    navigate("/showtime"); // go to city selection
  };

  return (
    <div className="container">
      <h2>Now Showing</h2>

      {movies.length === 0 && (
        <p style={{ textAlign: "center" }}>Loading movies...</p>
      )}

      <div className="movie-grid">
        {movies.map(movie => (
          <div
            key={movie.id}
            className="movie-card"
            onClick={() => selectMovie(movie)}
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
            <h3>{movie.title}</h3>
            <p>⭐ {movie.vote_average}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
