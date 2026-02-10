import axios from "axios";

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

const tmdb = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: API_KEY,
    language: "en-US",
  },
});

export const fetchMoviesByGenre = (genreId) =>
  tmdb.get("/discover/movie", {
    params: {
      with_genres: genreId,
    },
  });

export const fetchTrending = () =>
  tmdb.get("/trending/movie/week");

export default tmdb;
