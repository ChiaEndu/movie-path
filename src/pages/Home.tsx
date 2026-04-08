import { useEffect, useState } from "react";
import { fetchMovies, fetchPopular } from "../api/movieApi";
import MovieGrid from "../components/MovieGrid";
import SearchBar from "../components/SearchBar";
import Loader from "../components/Loader";

export default function Home() {
  const [movies, setMovies] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true);

      const data = search
        ? await fetchMovies(search)
        : await fetchPopular();

      setMovies(data);
      setLoading(false);
    };

    load();
  }, [search]);

  return (
    <div>
      <SearchBar search={search} setSearch={setSearch} />
      {loading ? <Loader /> : <MovieGrid movies={movies} />}
    </div>
  );
}