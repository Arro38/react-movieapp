import { Movie } from "./../types/Movie";
import { createContext } from "react";
import { Director } from "../types/Director";

export const API_URL = "https://127.0.0.1:8000/api/";
// export const API_URL = "https://symfo-movieapp.formaterz.fr/api/";

export const DirectorContext = createContext<Director[]>([]);

export const MovieContext = createContext<{
  movies: Movie[];
  setMovies: (movies: Movie[]) => void;
}>({
  movies: [],
  setMovies: () => {},
});

export function formatDate(isoString: string) {
  const date = new Date(isoString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Les mois sont indexés de 0 à 11
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}
