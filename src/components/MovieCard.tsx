import { useContext, useState } from "react";
import {
  API_URL,
  DirectorContext,
  MovieContext,
  formatDate,
} from "../lib/utils";
import { Movie } from "../types/Movie";
import { toast } from "react-toastify";
import { Director } from "../types/Director";

export default function MovieCard({
  movie,
  setDirectorsFilter,
  directorsFilter,
}: {
  movie: Movie;
  setDirectorsFilter: React.Dispatch<React.SetStateAction<Director[]>>;
  directorsFilter: Director[];
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(movie.title);
  const [description, setDescription] = useState(movie.description);
  const [note, setNote] = useState(movie.note);
  const [director, setDirector] = useState(movie.director);
  const [releaseDate, setReleaseDate] = useState(formatDate(movie.releaseDate));
  const directors = useContext(DirectorContext);
  const movies = useContext(MovieContext);

  const handleDeleteMovie = async () => {
    const confirmed = confirm("Are you sure you want to delete this movie?");
    if (!confirmed) return;
    try {
      await fetch(API_URL + "movies/" + movie.id, {
        method: "DELETE",
      });
      // Remove the movie from the state
      const newMovies = movies.movies.filter(
        (m) => m.id !== movie.id
      ) as Movie[];
      movies.setMovies(newMovies);
      toast.success("Movie deleted successfully");
    } catch (error) {
      toast.error("Error deleting movie");
    }
  };

  const handleEditMovie = async () => {
    // check if the release date is in the correct format
    if (!releaseDate.match(/^\d{2}-\d{2}-\d{4}$/)) {
      toast.error("Invalid release date format (dd-mm-yyyy)");
      setReleaseDate(formatDate(movie.releaseDate));
      return;
    }
    // JSON.stringify the data
    const data = JSON.stringify({
      title: title,
      note: note,
      releaseDate: releaseDate,
      description: description,
      director: director.id,
    });
    // Update the movie in the API
    await fetch(API_URL + "movies/" + movie.id, {
      method: "PUT",
      body: data,
    });
    toast.success("Movie updated successfully");
    setIsEditing(false);
  };

  const handleSelectDirector = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const d = directors.find(
      (director) => director.id.toString() === e.target.value
    );
    if (d) setDirector(d);
  };

  const handleSelectDirectorFilter = (director: Director) => {
    // add the director to the directorsFilter if it's not already in the filter
    if (!directorsFilter.find((d) => d.id === director.id)) {
      setDirectorsFilter([...directorsFilter, director]);
    }
  };

  return (
    <div className="flex flex-col justify-center gap-4 bg-neutral-content text-secondary-content p-4 rounded-lg items-center w-[300px] h-[550px]">
      {isEditing ? (
        <div className="text-white flex flex-col justify-center gap-4">
          <input
            type="text"
            className="input input-bordered"
            defaultValue={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            className="input input-bordered"
            defaultValue={note}
            onChange={(e) => setNote(e.target.value)}
          />
          <input
            type="text"
            className="input input-bordered"
            defaultValue={releaseDate}
            placeholder="dd-mm-yyyy"
            onChange={(e) => setReleaseDate(e.target.value)}
          />
          <input
            type="text"
            className="input input-bordered"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <select
            className="select select-bordered"
            value={director.id}
            onChange={handleSelectDirector}
          >
            {directors.map((director) => (
              <option key={director.id} value={director.id}>
                {director.name}
              </option>
            ))}
          </select>
          <div className="flex gap-4">
            <button
              onClick={() => setIsEditing(false)}
              className="btn btn-secondary"
            >
              Cancel
            </button>
            <button onClick={handleEditMovie} className="btn btn-primary">
              Update
            </button>
          </div>
        </div>
      ) : (
        <>
          <h2 className="text-2xl font-bold text-center">{title}</h2>
          <p>
            <span className="text-xl">Note :</span> {note}
          </p>
          <p>
            {" "}
            <span className="text-xl">Release date:</span> {releaseDate}
          </p>
          <p> {description}</p>
          <p>
            <span className="text-xl">Director : </span>
            <span
              className="badge badge-info p-3 hover:cursor-pointer hover:bg-accent"
              onClick={() => handleSelectDirectorFilter(director)}
            >
              {director.name}
            </span>
          </p>
          <div className="flex gap-4">
            <button
              className="btn btn-primary"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </button>
            <button className="btn btn-error " onClick={handleDeleteMovie}>
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
}
