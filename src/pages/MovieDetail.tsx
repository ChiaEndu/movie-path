import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchMovieDetails } from "../api/movieApi";
import { motion } from "framer-motion";
import { config } from "../config/config";

export default function MovieDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState<any>(null);

  useEffect(() => {
    fetchMovieDetails(id!).then(setMovie);
  }, [id]);

  if (!movie) return <p>Loading...</p>;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <button onClick={() => navigate(-1)}>Back</button>
      <img src={`${config.IMG_URL}${movie.poster_path}`} />
      <h1>{movie.title}</h1>
      <p>{movie.overview}</p>
      <p>⭐ {movie.vote_average}</p>
    </motion.div>
  );
}