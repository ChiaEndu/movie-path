export default function SearchBar({ search, setSearch }: any) {
  return (
    <input
      placeholder="Search movies..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  );
}