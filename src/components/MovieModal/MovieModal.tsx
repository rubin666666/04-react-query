import {
  useEffect,
  type KeyboardEvent as ReactKeyboardEvent,
  type MouseEvent,
} from "react";
import { createPortal } from "react-dom";
import type { Movie } from "../../types/movie";
import css from "./MovieModal.module.css";

interface MovieModalProps {
  movie: Movie;
  onClose: () => void;
}

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";
const POSTER_BASE_URL = "https://image.tmdb.org/t/p/w500";
const modalRoot = document.body;

export default function MovieModal({ movie, onClose }: MovieModalProps) {
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  const handleBackdropClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const handleCloseButtonKeyDown = (
    event: ReactKeyboardEvent<HTMLButtonElement>,
  ) => {
    if (event.key === "Enter" || event.key === " ") {
      onClose();
    }
  };

  const imageUrl = movie.backdrop_path
    ? `${IMAGE_BASE_URL}${movie.backdrop_path}`
    : movie.poster_path
      ? `${POSTER_BASE_URL}${movie.poster_path}`
      : "https://placehold.co/1200x675?text=No+Image";

  return createPortal(
    <div className={css.backdrop} onClick={handleBackdropClick}>
      <div className={css.modal}>
        <button
          className={css.closeButton}
          type="button"
          onClick={onClose}
          onKeyDown={handleCloseButtonKeyDown}
          aria-label="Close modal"
        >
          ×
        </button>
        <img className={css.poster} src={imageUrl} alt={movie.title} />
        <div className={css.content}>
          <h2 className={css.title}>{movie.title}</h2>
          <p className={css.meta}>
            {movie.release_date || "Unknown release date"} | Rating:{" "}
            {movie.vote_average.toFixed(1)}
          </p>
          <p className={css.text}>
            {movie.overview || "No overview available."}
          </p>
        </div>
      </div>
    </div>,
    modalRoot,
  );
}
