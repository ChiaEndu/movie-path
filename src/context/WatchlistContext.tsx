import { createContext, useEffect, useState } from "react";

export const WatchlistContext = createContext<any>(null);

export const WatchlistProvider = ({ children }: any) => {
  const [watchlist, setWatchlist] = useState<any[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("watchlist");
    if (stored) setWatchlist(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
  }, [watchlist]);

  const toggleWatchlist = (movie: any) => {
    setWatchlist((prev) =>
      prev.find((m) => m.id === movie.id)
        ? prev.filter((m) => m.id !== movie.id)
        : [...prev, movie]
    );
  };

  return (
    <WatchlistContext.Provider value={{ watchlist, toggleWatchlist }}>
      {children}
    </WatchlistContext.Provider>
  );
};