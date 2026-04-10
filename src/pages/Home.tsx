import { useEffect, useState } from "react";
import { fetchPopular } from "../api/movieApi";
import MovieGrid from "../components/MovieGrid";
import { config } from "../config/config";
import { Link } from "react-router-dom";

export default function Home() {
  const [movies, setMovies] = useState<any[]>([]);
  const [page, setPage] = useState(1); 

  
  useEffect(() => {
    fetchPopular(page).then((data) => {
      setMovies((prev) => [...prev, ...data.results]);
    });
  }, [page]);

  
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

  if (!movies.length) return <p>Loading...</p>;

  const featured = movies[0];
  const rest = movies.slice(1);

  return (
    <div>
      <div
        style={{
          height: "70vh",
          backgroundImage: `url(${config.IMG_URL}${featured.backdrop_path})`,
          backgroundSize: "cover",
          backgroundColor: "black",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          padding: "40px"
        }}
      >
        <div style={{ maxWidth: "500px" }}>
          <h1 style={{ fontSize: "3rem" }}>{featured.title}</h1>
          <p>{featured.overview}</p>

          <Link to={`/movie/${featured.id}`}>
            <button style={{ marginRight: "10px" }}>▶ Play</button>
          </Link>

          <Link to={`/movie/${featured.id}`}>
            <button>More Info</button>
          </Link>
        </div>
      </div>

      
      <div className="container">
        <h2>Popular Movies</h2>
        <MovieGrid movies={rest} />
      </div>
    </div>
  );
}