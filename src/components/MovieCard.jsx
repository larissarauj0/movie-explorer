import React from "react";
import { Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";

const MovieCard = ({ movies, loading }) => {
  return (
    <div className="p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {loading ? (
        <div className="col-span-full flex justify-center items-center">
          <ClipLoader color="#18181b" size={40} />
        </div>
      ) : movies.length > 0 ? (
        movies.map((movie) => (
          <div
            key={movie.id}
            className="bg-zinc-100 dark:bg-zinc-900 rounded-xl p-2 hover:scale-105 transition"
          >
            <Link to={`/movie/${movie.id}`}>
              <img
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : "https://via.placeholder.com/300x450"
                }
                alt={movie.title}
                className="rounded-lg w-full h-auto object-cover"
              />
            </Link>

            <h2 className="mt-2 text-xs sm:text-sm font-bold line-clamp-2">
              {movie.title}
            </h2>
          </div>
        ))
      ) : (
        <p className="col-span-full text-center text-zinc-500">
          Nenhum filme encontrado
        </p>
      )}
    </div>
  );
};

export default MovieCard;