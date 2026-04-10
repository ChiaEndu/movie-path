import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: any) => {
    e.preventDefault();

    if (query.trim()) {
      navigate(`/search?q=${query}`);
      setQuery("");
    }
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-black/95 backdrop-blur-md shadow-black/20 shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        <Link to="/" className="flex items-center gap-3">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-red-600 text-sm font-black uppercase tracking-[0.35em] text-black">
            
          </span>
          <h1 className="text-red-500 text-2xl font-extrabold tracking-[0.3em] uppercase transition hover:text-red-400">
            MOVIE-PATH
          </h1>
        </Link>

        <div className="hidden items-center gap-10 text-sm text-slate-200 sm:flex">
          <Link
            to="/"
            className="inline-flex items-center rounded-full px-3 py-2 transition hover:bg-white/10 hover:text-white"
          >
            Home
          </Link>

          <Link
            to="/watchlist"
            className="inline-flex items-center rounded-full px-3 py-2 transition hover:bg-white/10 hover:text-white"
          >
            My List
          </Link>
        </div>

        <form onSubmit={handleSearch} className="relative">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search movies..."
            className="w-56 rounded-md border border-white/10 bg-white/10 px-4 py-2 text-sm text-white placeholder:text-slate-400 outline-none focus:border-red-600"
          />
        </form>

      </div>
    </nav>
  );
}