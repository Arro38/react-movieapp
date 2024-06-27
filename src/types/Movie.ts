import { Director } from "./Director";

export interface Movie {
  id: number;
  title: string;
  note: string;
  releaseDate: string;
  description: string;
  director: Director;
}
