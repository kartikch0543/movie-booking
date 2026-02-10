import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Mock data to ensure movies always display
const MOCK_MOVIES = [
  {
    id: 1,
    title: "Avatar: The Way of Water",
    poster_path: "https://image.tmdb.org/t/p/w500/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg",
    vote_average: 7.7
  },
  {
    id: 2,
    title: "Puss in Boots: The Last Wish",
    poster_path: "https://image.tmdb.org/t/p/w500/kuf6dutpsT0vSVehic3EZIqkOBt.jpg",
    vote_average: 8.4
  },
  {
    id: 3,
    title: "M3GAN",
    poster_path: "https://image.tmdb.org/t/p/w500/d9nBoowhjiiYc4FBNtQkPY7c11H.jpg",
    vote_average: 7.4
  },
  {
    id: 4,
    title: "Black Panther: Wakanda Forever",
    poster_path: "https://image.tmdb.org/t/p/w500/sv1xJUazXeYqALzczSZ3O6nkH75.jpg",
    vote_average: 7.3
  }
];

export const Dashboard = () => {
  const [movies, setMovies] = useState(MOCK_MOVIES);
  const navigate = useNavigate();
  const selectedCity = localStorage.getItem("selectedCity");

  useEffect(() => {
    if (!selectedCity) {
      navigate("/city-selection");
    }
    // We are using mock data, so no need to fetch from API for now to ensure stability
  }, [navigate, selectedCity]);

  const selectMovie = (movie) => {
    localStorage.setItem("selectedMovie", JSON.stringify(movie));
    navigate("/showtime");
  };

  return (
    <div className="container">
      <h2>Now Showing in {selectedCity}</h2>

      <div className="movie-grid">
        {movies.map(movie => (
          <div
            key={movie.id}
            className="movie-card"
            onClick={() => selectMovie(movie)}
          >
            <img
              src={movie.poster_path.startsWith("http") ? movie.poster_path : `https://image.tmdb.org/t/p/w500${movie.poster_path}`}
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
