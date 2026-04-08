import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { config } from "../config/config";

export default function MovieCard({ movie }: any) {
  return (
    <motion.div whileHover={{ scale: 1.05 }}>
      <Link to={`/movie/${movie.id}`}>
        <img src={`${config.IMG_URL}${movie.poster_path}`} />
        <h3>{movie.title}</h3>
        <p>{movie.release_date?.slice(0, 4)}</p>
        <p>⭐ {movie.vote_average}</p>
      </Link>
    </motion.div>
  );
}