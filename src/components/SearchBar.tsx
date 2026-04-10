export default function SearchBar({ search, setSearch }: any) {
  return (
    <div className="relative w-full">
      <span className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 text-lg">
        🔍
      </span>
      <input
        placeholder="Search movies, shows, or genres"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full rounded-full border border-white/15 bg-black/40 px-14 py-4 text-sm text-white placeholder:text-slate-400 outline-none transition focus:border-red-600 focus:ring-2 focus:ring-red-600/25"
      />
    </div>
  );
}