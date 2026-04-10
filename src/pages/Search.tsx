import { useEffect, useState } from "react";
import { fetchMovies, fetchGenres } from "../api/movieApi";
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
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
        setPage((prev) => prev + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const filtered = selectedGenre
    ? movies.filter((m: any) => m.genre_ids?.includes(selectedGenre))
    : movies;

  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-white">Search</h1>
          <p className="mt-2 text-sm text-slate-400">Quickly discover new movies and filter by genre.</p>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_280px]">
        <input
          className="w-full rounded-full border border-white/10 bg-white/5 px-5 py-4 text-white outline-none placeholder:text-slate-500 focus:border-red-600 focus:ring-2 focus:ring-red-600/20"
          placeholder="Search movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
          <h2 className="mb-4 text-base font-semibold uppercase tracking-[0.2em] text-slate-300">
            Genres
          </h2>
          <div className="flex flex-wrap gap-2">
            <button
              className={`rounded-full px-4 py-2 text-sm transition ${selectedGenre === null ? "bg-red-600 text-white" : "bg-white/10 text-slate-200 hover:bg-white/20"}`}
              onClick={() => setSelectedGenre(null)}
            >
              All
            </button>
            {genres.map((g) => (
              <button
                key={g.id}
                className={`rounded-full px-4 py-2 text-sm transition ${selectedGenre === g.id ? "bg-red-600 text-white" : "bg-white/10 text-slate-200 hover:bg-white/20"}`}
                onClick={() => setSelectedGenre(g.id)}
              >
                {g.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {query ? (
        <section className="mt-10">
          <h2 className="mb-6 text-2xl font-semibold text-white">Results</h2>
          <MovieGrid movies={filtered} />
        </section>
      ) : (
        <section className="mt-12 rounded-[2rem] border border-white/10 bg-white/5 p-12 text-center text-slate-300 shadow-netflix">
          Enter a title to explore movie results.
        </section>
      )}
    </main>
  );
}
