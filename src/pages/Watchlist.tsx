import { useContext } from "react";
import { WatchlistContext } from "../context/WatchlistContext";
import MovieGrid from "../components/MovieGrid";

export default function Watchlist() {
  const { watchlist } = useContext(WatchlistContext);

  return (
    <div>
      <h2>Your Watchlist</h2>
      <MovieGrid movies={watchlist} />
    </div>
  );
}