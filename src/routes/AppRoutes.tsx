import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home.tsx";
import MovieDetail from "../pages/MovieDetail.tsx";
import Watchlist from "../pages/Watchlist.tsx";
import Navbar from "../components/Navbar.tsx";
import Search from "../pages/Search";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Navbar />
      <Search/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
        <Route path="/watchlist" element={<Watchlist />} />
      </Routes>
    </BrowserRouter>
  );
}