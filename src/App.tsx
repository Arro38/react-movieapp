import { useEffect, useState } from "react";
import { Movie } from "./types/Movie";
import HomePage from "./pages/HomePage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CreatePage from "./pages/CreatePage";
import { API_URL, DirectorContext, MovieContext } from "./lib/utils";
import { ToastContainer } from "react-toastify";
import Footer from "./components/Footer";
import { Director } from "./types/Director";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage success={false} />,
  },
  {
    path: "/create",
    element: <CreatePage />,
  },
]);

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [directors, setDirectors] = useState<Director[]>([]);

  useEffect(() => {
    const fetchDirectors = async () => {
      const directorsData = await fetch(API_URL + "directors/")
        .then((res) => res.json())
        .then((directors) => directors);
      setDirectors(directorsData);
    };
    fetchDirectors();
  }, []);

  useEffect(() => {
    const fetchMovies = async () => {
      const moviesData = await fetch(API_URL + "movies/")
        .then((res) => res.json())
        .then((movies) => movies);
      setMovies(moviesData);
    };
    fetchMovies();
  }, []);

  return (
    <div className="h-screen flex flex-col justify-between bg-secondary-content ">
      <main className="my-auto rounded-lg ">
        <MovieContext.Provider value={{ movies: movies, setMovies: setMovies }}>
          <DirectorContext.Provider value={directors}>
            <RouterProvider router={router} />
            <ToastContainer />
          </DirectorContext.Provider>
        </MovieContext.Provider>
      </main>
      <Footer />
    </div>
  );
}
