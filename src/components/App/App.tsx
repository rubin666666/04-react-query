import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import ReactPaginate from "react-paginate";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Loader from "../Loader/Loader";
import MovieGrid from "../MovieGrid/MovieGrid";
import MovieModal from "../MovieModal/MovieModal";
import SearchBar from "../SearchBar/SearchBar";
import { fetchMovies } from "../../services/movieService";
import type { Movie } from "../../types/movie";
import css from "./App.module.css";

interface PageChangeEvent {
  selected: number;
}

export default function App() {
  const [submittedQuery, setSubmittedQuery] = useState("");
  const [page, setPage] = useState(1);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const { data, isError, error, isFetching } = useQuery({
    queryKey: ["movies", submittedQuery, page],
    queryFn: () => fetchMovies(submittedQuery, page),
    enabled: submittedQuery.trim().length > 0,
    placeholderData: keepPreviousData,
  });

  const handleSearch = (nextQuery: string) => {
    setSubmittedQuery(nextQuery);
    setPage(1);
    setSelectedMovie(null);
  };

  const totalPages = data?.total_pages ?? 0;
  const movies = data?.results ?? [];

  return (
    <main className={css.app}>
      <div className={css.container}>
        <h1 className={css.title}>Movie Search</h1>
        <SearchBar onSubmit={handleSearch} />

        {isFetching && <Loader />}

        {isError && (
          <ErrorMessage message={error.message || "Something went wrong."} />
        )}

        {!isError && submittedQuery && !isFetching && movies.length === 0 && (
          <p className={css.status}>No movies found for your request.</p>
        )}

        {movies.length > 0 && (
          <MovieGrid movies={movies} onSelect={setSelectedMovie} />
        )}

        {totalPages > 1 && (
          <ReactPaginate
            pageCount={totalPages}
            pageRangeDisplayed={5}
            marginPagesDisplayed={1}
            onPageChange={({ selected }: PageChangeEvent) =>
              setPage(selected + 1)
            }
            forcePage={page - 1}
            containerClassName={css.pagination}
            activeClassName={css.active}
            nextLabel=">"
            previousLabel="<"
          />
        )}

        {selectedMovie && (
          <MovieModal
            movie={selectedMovie}
            onClose={() => setSelectedMovie(null)}
          />
        )}
      </div>
    </main>
  );
}
