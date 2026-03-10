import type { Movie } from "../../types/movie";
import css from "./MovieCard.module.css";

interface MovieCardProps {
  movie: Movie;
}

const POSTER_BASE_URL = "https://image.tmdb.org/t/p/w500";

export default function MovieCard({ movie }: MovieCardProps) {
  const posterUrl = movie.poster_path
    ? `${POSTER_BASE_URL}${movie.poster_path}`
    : "https://placehold.co/500x750?text=No+Image";

  return (
    <article className={css.card}>
      <img className={css.poster} src={posterUrl} alt={movie.title} />
      <div className={css.content}>
        <h2 className={css.title}>{movie.title}</h2>
        <p className={css.meta}>
          {movie.release_date || "Unknown release date"} | Rating:{" "}
          {movie.vote_average.toFixed(1)}
        </p>
        <p className={css.text}>{movie.overview || "No overview available."}</p>
      </div>
    </article>
  );
}
