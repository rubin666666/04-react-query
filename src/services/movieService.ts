import axios from "axios";
import type { MovieSearchResponse } from "../types/movie";

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
