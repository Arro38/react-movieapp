import { useContext } from "react";
import { API_URL, DirectorContext, MovieContext } from "../lib/utils";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Movie } from "../types/Movie";

export default function CreatePage() {
  // Using useContext to get directors from the DirectorContext
  const directors = useContext(DirectorContext);
  const navigate = useNavigate();
  const { movies, setMovies } = useContext(MovieContext);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // convert formData to JSON
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    const jsonData = JSON.stringify(data);

    // Check if the release date is in the correct format
    const releaseDate = formData.get("releaseDate")?.toString();
    if (releaseDate && !releaseDate.match(/^\d{2}-\d{2}-\d{4}$/)) {
      toast.error("Invalid release date format (dd-mm-yyyy)");
      return;
    }

    // Check if the note is a number
    const note = formData.get("note")?.toString();
    if (note && !note.match(/^\d+$/)) {
      toast.error("Note must be a number");
      return;
    }

    // check if all fields are filled
    if (
      !formData.get("title") ||
      !formData.get("releaseDate") ||
      !formData.get("description") ||
      !formData.get("director")
    ) {
      toast.error("All fields are required");
      return;
    }

    // Create the movie in the API
    try {
      const response = await fetch(API_URL + "movies/", {
        method: "POST",
        body: jsonData,
      });
      const data = (await response.json()) as Movie;
      setMovies([...movies, data]);
      toast.success("Movie created successfully", {
        autoClose: 2000,
      });
      navigate("/", {
        replace: true,
        state: { success: true },
      });
    } catch (error) {
      toast.error("Error creating movie");
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 justify-center items-center "
    >
      <h1 className="text-3xl font-bold">Create a new movie</h1>
      <input
        type="text"
        name="title"
        placeholder="Title"
        className="input input-bordered"
        required
      />
      <input
        type="number"
        name="note"
        placeholder="Note"
        className="input input-bordered"
        required
      />
      <input
        type="text"
        required
        name="releaseDate"
        placeholder="Release Date"
        className="input input-bordered"
      />
      <input
        type="text"
        required
        name="description"
        placeholder="Description"
        className="input input-bordered"
      />
      <div className="flex items-center gap-4 justify-center">
        <span>Director : </span>
        <select name="director" className="select select-bordered">
          {directors.map((director) => (
            <option key={director.id} value={director.id}>
              {director.name}
            </option>
          ))}
        </select>
      </div>
      <div className="flex justify-center gap-4">
        <button onClick={() => navigate("/")} className="btn btn-secondary">
          Cancel
        </button>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </div>
    </form>
  );
}
