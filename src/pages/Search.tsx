import { useEffect, useState } from "react";
import {
  fetchMovies,
  fetchGenres,
} from "../api/movieApi";
import MovieGrid from "../components/MovieGrid";

export default function Search() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState<any[]>([]);
  const [genres, setGenres] = useState<any[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchGenres().then(setGenres);
  }, []);

  useEffect(() => {
    setMovies([]);
    setPage(1);
  }, [query]);

  useEffect(() => {
    if (!query) return;

    fetchMovies(query, page).then((data) => {
      setMovies((prev) => [...prev, ...data.results]);
    });
  }, [query, page]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 100
      ) {
        setPage((prev) => prev + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const filtered = selectedGenre
    ? movies.filter((m: any) =>
        m.genre_ids?.includes(selectedGenre)
      )
    : movies;

  return (
    <div className="container">
      <h2 className="section-title">Search</h2>

      <input
        className="search-input"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <div className="genre-row">
        <button
          className={`genre-btn ${selectedGenre === null ? "active" : ""}`}
          onClick={() => setSelectedGenre(null)}
        >
          All
        </button>

        {genres.map((g) => (
          <button
            key={g.id}
            className={`genre-btn ${
              selectedGenre === g.id ? "active" : ""
            }`}
            onClick={() => setSelectedGenre(g.id)}
          >
            {g.name}
          </button>
        ))}
      </div>

      {query ? (
        <>
          <h3 className="section-title">Results</h3>
          <MovieGrid movies={filtered} />
        </>
      ) : (
        <p style={{ opacity: 0.6 }}>Start typing to search movies</p>
      )}
    </div>
  );
}