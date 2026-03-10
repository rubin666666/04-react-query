import axios from "axios";
import type { Movie } from "../types/movie";

export interface MovieSearchResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

const tmdbApi = axios.create({
  baseURL: "https://api.themoviedb.org/3",
});

const tmdbToken = import.meta.env.VITE_TMDB_TOKEN;

export const fetchMovies = async (
  query: string,
  page: number,
): Promise<MovieSearchResponse> => {
  if (!tmdbToken) {
    throw new Error("Missing VITE_TMDB_TOKEN environment variable.");
  }

  const response = await tmdbApi.get<MovieSearchResponse>("/search/movie", {
    params: {
      query,
      page,
      include_adult: false,
      language: "en-US",
    },
    headers: {
      Authorization: `Bearer ${tmdbToken}`,
    },
  });

  return response.data;
};
