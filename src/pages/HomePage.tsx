import { useContext, useEffect, useState } from "react";
import { Movie } from "../types/Movie";
import { MovieContext } from "../lib/utils";
import MovieCard from "../components/MovieCard";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { FaEraser } from "react-icons/fa";
import { IoMdAddCircle } from "react-icons/io";
import { ImCross } from "react-icons/im";
import { Director } from "../types/Director";
import { MdLocalMovies } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export default function HomePage({ success }: { success: boolean }) {
  const { movies } = useContext(MovieContext);
  const [search, setSearch] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Movie[]>(movies);
  const [directorsFilter, setDirectorsFilter] = useState<Director[]>([]);
  const navigate = useNavigate();

  // Show a toast when the movie is created successfully
  useEffect(() => {
    if (success) {
      toast.success("Movie created successfully", {
        autoClose: 2000,
      });
    }
  }, [success]);

  useEffect(() => {
    setSearchResults(movies);
  }, [movies]);

  const handleClearSearch = () => {
    setSearch("");
    setSearchResults(movies);
  };

  const handleClickDirectorFilter = (director: Director) => {
    // remove the director from the directorsFilter if it's already in the filter
    const newDirectorsFilter = directorsFilter.filter(
      (d) => d.id !== director.id
    );
    setDirectorsFilter(newDirectorsFilter);
  };

  return (
    <div className="flex flex-col items-center my-4 gap-4">
      <div className="flex flex-col gap-4 items-center w-full">
        <h1 className="text-4xl font-bold flex items-center gap-2">
          <MdLocalMovies />
          Movie App
        </h1>
        <div className="flex w-full justify-center md:justify-between  p-4 items-center md:flex-row flex-col gap-4 md:gap-0">
          <button
            onClick={() => navigate("/create")}
            className="btn btn-info md:ml-8"
          >
            <IoMdAddCircle /> New Movie
          </button>
          <div className="flex space-x-4 ">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input input-bordered"
              placeholder="Name of movie ..."
            />
            <button
              onClick={handleClearSearch}
              className="btn btn-accent hidden md:inline-flex"
            >
              <FaEraser />
              Clear
            </button>
          </div>
        </div>
      </div>

      <div className="flex gap-4 items-center">
        {directorsFilter.length > 0 &&
          directorsFilter.map((director) => (
            <div
              key={director.id}
              className="badge badge-info gap-2 p-4 hover:cursor-pointer hover:bg-accent"
              onClick={() => handleClickDirectorFilter(director)}
            >
              <ImCross />
              {director.name}
            </div>
          ))}
      </div>
      <div className="flex flex-wrap gap-4 items-center justify-center">
        {searchResults
          .filter((movie) => {
            if (directorsFilter.length === 0) return true;
            return directorsFilter.find(
              (director) => director.id === movie.director.id
            );
          })
          .filter((movie) =>
            movie.title.toLowerCase().includes(search.toLowerCase())
          )
          .map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              setDirectorsFilter={setDirectorsFilter}
              directorsFilter={directorsFilter}
            />
          ))}
      </div>
    </div>
  );
}
