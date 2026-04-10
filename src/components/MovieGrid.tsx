import MovieCard from "./MovieCard.tsx";

export default function MovieGrid({ movies }: any) {
  return (
    <div className="grid gap-4 grid-cols-5">
      {movies.map((movie: any) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}
