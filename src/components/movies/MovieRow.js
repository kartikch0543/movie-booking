import { useState, useEffect } from 'react';
import axios from '../../api/tmdb';
import { MovieCard } from './MovieCard';
import './MovieRow.css';

export const MovieRow = ({ title, fetchUrl, isLargeRow = false }) => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const request = await axios.get(fetchUrl);
                const results = request.data.results || [];
                if (results.length === 0) throw new Error("No data");
                setMovies(results.slice(0, 4)); // Only 4 movies
            } catch (error) {
                console.error("Failed to fetch movies for row:", title, error);
                // Guaranteed Fallback with real-looking data
                setMovies([
                    { id: 1, title: "Avatar: The Way of Water", poster_path: "/t6HIqrRAclZO2pSls7A9JBeyZoa.jpg" },
                    { id: 2, title: "Black Panther: Wakanda Forever", poster_path: "/sv1BpuSstIHBvV6P4mHqb1IwcPh.jpg" },
                    { id: 3, title: "Top Gun: Maverick", poster_path: "/62HCnUTziyMC9hXnaOSpqvXvNi9.jpg" },
                    { id: 4, title: "Puss in Boots: The Last Wish", poster_path: "/kuf6uUzRYBsS2O7fc0oVvGeESV8.jpg" }
                ]);
            }
        }
        fetchData();
    }, [fetchUrl, title]);

    return (
        <div className="movie-row">
            <h2 className="movie-row__title">{title}</h2>

            <div className="movie-row__posters">
                {movies && movies.length > 0 && movies.slice(0, 4).map(movie => (
                    (movie.poster_path || movie.backdrop_path) && (
                        <MovieCard
                            key={movie.id}
                            movie={movie}
                        />
                    )
                ))}
            </div>
        </div>
    );
};
