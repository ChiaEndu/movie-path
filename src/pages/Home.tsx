import { useEffect, useState } from "react";
import { fetchPopular, fetchGenres, fetchMovies } from "../api/movieApi";
import MovieGrid from "../components/MovieGrid";
import { config } from "../config/config";
import { Link } from "react-router-dom";

export default function Home() {
  const [movies, setMovies] = useState<any[]>([]);
  const [genres, setGenres] = useState<any[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchGenres().then(setGenres);
  }, []);

  useEffect(() => {
    setMovies([]);
    setPage(1);
  }, [query]);

  useEffect(() => {
    const fetchData = async () => {
      const data = query
        ? await fetchMovies(query, page)
        : await fetchPopular(page);

      setMovies((prev) =>
        page === 1 ? data.results : [...prev, ...data.results]
      );
    };

    fetchData();
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

  if (!movies.length)
    return (
      <div className="flex min-h-screen items-center justify-center px-6 text-slate-300">
        Loading popular movies...
      </div>
    );

  const featured = movies[0];
  const rest = movies.slice(1);

  const gridMovies = rest.length ? rest : movies;

  const displayedMovies = selectedGenre
    ? gridMovies.filter((movie) =>
        movie.genre_ids?.includes(selectedGenre)
      )
    : gridMovies;

  const sectionTitle = query ? "Search Results" : "Popular Movies";

  const sectionDescription = query
    ? "Browse movies matching your search and filter by genre."
    : "Browse the most watched films right now.";

  return (
    <div>

      <section className="relative min-h-[70vh] overflow-hidden">
        <img
          src={`${config.IMG_URL}${featured.backdrop_path}`}
          alt={featured.title}
          className="absolute inset-0 h-full w-full object-cover opacity-80"
        />

        <div className="absolute inset-0 bg-black/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

        <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-end px-6 pb-20 text-white">
          <span className="mb-4 inline-flex rounded-full bg-red-600 px-4 py-2 text-xs uppercase tracking-[0.35em] text-white">
            Popular on MoviePath
          </span>

          <h1 className="max-w-3xl text-5xl font-bold leading-tight sm:text-6xl">
            {featured.title}
          </h1>

          <p className="mt-6 max-w-2xl text-sm leading-7 text-slate-200 sm:text-base">
            {featured.overview}
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to={`/movie/${featured.id}`}
              className="rounded bg-red-600 px-6 py-3 font-semibold hover:bg-red-700 transition"
            >
              ▶ Play
            </Link>

            <Link
              to={`/movie/${featured.id}`}
              className="rounded bg-white/20 px-6 py-3 font-semibold hover:bg-white/30 transition"
            >
              More Info
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10 mt-4">

        <div className="mb-8 flex flex-col gap-6">

          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">

            <div>
              <h2 className="text-3xl font-bold tracking-tight text-white">
                {sectionTitle}
              </h2>

              <p className="mt-2 text-sm text-slate-400">
                {sectionDescription}
              </p>
            </div>

            <div className="w-full max-w-md sm:max-w-lg">
              <div className="relative shadow-2xl shadow-black/30">
                <span className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 text-lg">
                  🔍
                </span>
                <input
                  className="w-full rounded-full border border-white/15 bg-white/10 px-14 py-5 text-lg text-white outline-none placeholder:text-slate-400 transition focus:border-red-500 focus:ring-2 focus:ring-red-500/25"
                  placeholder="Search movies, shows, or genres"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>
            </div>

          </div>

          <div className="flex flex-wrap gap-4">

            <button
              className={`rounded-full px-5 py-3 text-sm sm:text-base font-semibold transition ${
                selectedGenre === null
                  ? "bg-red-600 text-white"
                  : "border border-white/20 bg-white/5 text-slate-200 hover:bg-white/10"
              }`}
              onClick={() => setSelectedGenre(null)}
            >
              All Genres
            </button>

            {genres.map((genre) => (
              <button
                key={genre.id}
                className={`rounded-full px-5 py-3 text-sm sm:text-base font-semibold transition ${
                  selectedGenre === genre.id
                    ? "bg-red-600 text-white"
                    : "border border-white/20 bg-white/5 text-slate-200 hover:bg-white/10"
                }`}
                onClick={() => setSelectedGenre(genre.id)}
              >
                {genre.name}
              </button>
            ))}

          </div>

        </div>

        <MovieGrid movies={displayedMovies} />

      </section>

    </div>
  );
}