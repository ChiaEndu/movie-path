import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieDetails } from "../api/movieApi";
import { config } from "../config/config";

export default function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState<any>(null);

  useEffect(() => {
    fetchMovieDetails(id!).then(setMovie);
  }, [id]);

  if (!movie) return <p>Loading...</p>;

  return (
    <div style={{
      backgroundImage: `url(${config.IMG_URL}${movie.backdrop_path})`,
      backgroundSize: "cover",
      padding: "50px"
    }}>
      <h1>{movie.title}</h1>
      <p>{movie.overview}</p>

      <p>⭐ {movie.vote_average}</p>

      <button>▶ Play</button>
      <button>+ My List</button>
    </div>
  );
}