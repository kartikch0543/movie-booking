import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './MovieCard.css';
import './MovieCardPlaceholder.css';

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

export const MovieCard = ({ movie, isLargeRow }) => {
    const navigate = useNavigate();
    const [loaded, setLoaded] = useState(false);

    const handleSelect = () => {
        // Save to local storage for persistence across refreshes (legacy support)
        localStorage.setItem("selectedMovie", JSON.stringify(movie));
        // Also use navigate state for cleaner access if we refactor pages
        navigate("/showtime", { state: { movie } });
    };

    return (
        <div
            className={`movie-card ${isLargeRow ? "movie-card--large" : ""}`}
            onClick={handleSelect}
            role="button"
            tabIndex={0}
            onKeyPress={(e) => e.key === 'Enter' && handleSelect()}
        >
            {!loaded && (
                <div className="movie-card__placeholder">
                    <span>🎬</span>
                </div>
            )}
            <img
                src={movie.poster_path?.startsWith('/mock')
                    ? `https://via.placeholder.com/500x750/f84464/ffffff?text=${encodeURIComponent(movie.title || movie.name)}`
                    : `${IMAGE_BASE_URL}${movie.poster_path}`}
                alt={movie.name || movie.title}
                className={`movie-card__poster movie-card__image ${loaded ? 'movie-card__image--loaded' : ''}`}
                loading="lazy"
                onLoad={() => setLoaded(true)}
                onError={(e) => {
                    e.target.src = "https://via.placeholder.com/500x750/f84464/ffffff?text=Movie+Poster";
                    setLoaded(true);
                }}
            />
            <div className="movie-card__overlay">
                <h4 className="movie-card__title">{movie.title || movie.name}</h4>
                <p className="movie-card__rating">⭐ {movie.vote_average?.toFixed(1)}</p>
            </div>
        </div>
    );
};
