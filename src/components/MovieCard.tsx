import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { config } from "../config/config.ts";

export default function MovieCard({ movie }: any) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="overflow-hidden rounded-[1.5rem] bg-white/5 shadow-netflix transition duration-300 hover:-translate-y-1"
    >
      <Link to={`/movie/${movie.id}`} className="block">
        <div className="overflow-hidden rounded-t-[1.5rem]">
          <img
            src={`${config.IMG_URL}${movie.poster_path}`}
            alt={movie.title}
            className="h-[340px] w-full object-cover transition duration-500 hover:scale-105"
          />
        </div>
        <div className="space-y-3 p-4">
          <h3 className="truncate text-lg font-semibold text-white md:text-xl">{movie.title}</h3>
          <p className="text-sm text-slate-400 md:text-base">{movie.release_date?.slice(0, 4)}</p>
          <p className="text-sm text-slate-200 md:text-base">⭐ {movie.vote_average}</p>
        </div>
      </Link>
    </motion.div>
  );
}
