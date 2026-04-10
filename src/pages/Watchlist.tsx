import { useContext } from "react";
import { WatchlistContext } from "../context/WatchlistContext.tsx";
import MovieGrid from "../components/MovieGrid.tsx";

export default function Watchlist() {
  const { watchlist } = useContext(WatchlistContext);

  return (
    <div>
      <h2>Your Watchlist</h2>
      <MovieGrid movies={watchlist} />
    </div>
  );
}