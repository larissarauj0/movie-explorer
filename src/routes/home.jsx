import { useOutletContext, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getPopularMovies } from "../services/api.jsx";
import { ClipLoader } from "react-spinners";
import { FaStar } from "react-icons/fa";

const Home = () => {
  const { movies: initialMovies, loading: initialLoading } = useOutletContext();


  const [extendedMovies, setExtendedMovies] = useState([]);
  const [apiPage, setApiPage] = useState(2); 
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    setExtendedMovies([]);
    setApiPage(2);
  }, [initialMovies]);

  if (initialLoading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <ClipLoader color="#18181b" size={50} />
      </div>
    );
  }

  if (!initialMovies || initialMovies.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <p className="text-zinc-500">Nenhum filme encontrado.</p>
      </div>
    );
  }

  const topTenMovies = initialMovies.slice(0, 10);
  const remainingFromFirstPage = initialMovies.slice(10);
  

  const allOtherMovies = [...remainingFromFirstPage, ...extendedMovies];

  
  async function handleLoadMore() {
    if (loadingMore) return;
    
    setLoadingMore(true);
    try {
    
      const nextMovies = await getPopularMovies(apiPage); 
      
      if (nextMovies && nextMovies.length > 0) {
        setExtendedMovies((prev) => [...prev, ...nextMovies]);
        setApiPage((prevPage) => prevPage + 1);
      }
    } catch (error) {
      console.error("Erro ao carregar mais filmes da API:", error);
    } finally {
      setLoadingMore(false);
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      

      <section className="mb-16">
        <h2 className="text-2xl md:text-3xl font-extrabold mb-8 border-l-4 border-amber-500 pl-3">
          Top 10 Mais Assistidos
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {topTenMovies.map((movie, index) => (
            <Link 
              to={`/movie/${movie.id}`} 
              key={`top-${movie.id}-${index}`}
              className="group relative flex flex-col bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden hover:scale-105 transition duration-300 shadow-sm hover:shadow-lg"
            >
              <div className="absolute top-3 left-3 bg-amber-500 text-black font-black text-xl w-10 h-10 flex items-center justify-center rounded-xl shadow-md z-10">
                #{index + 1}
              </div>

              <div className="aspect-2/3 w-full overflow-hidden bg-zinc-300 dark:bg-zinc-800">
                <img
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                      : "https://placeholder.com"
                  }
                  alt={movie.title}
                  className="w-full h-full object-cover group-hover:opacity-95 transition"
                />
              </div>

              <div className="p-4 flex flex-col grow justify-between">
                <h3 className="font-bold text-sm md:text-base line-clamp-2 mb-2 group-hover:text-amber-500 transition">
                  {movie.title}
                </h3>
                <div className="flex items-center gap-1.5 text-sm text-zinc-600 dark:text-zinc-400">
                  <FaStar className="text-amber-500 text-xs" />
                  <span>{movie.vote_average?.toFixed(1) || "N/A"}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

  
      {allOtherMovies.length > 0 && (
        <section className="mb-12">
          <h2 className="text-xl md:text-2xl font-bold mb-6 text-zinc-800 dark:text-zinc-200">
            Outros filmes que possam te interessar
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {allOtherMovies.map((movie, index) => (
              <Link
                to={`/movie/${movie.id}`}
                key={`other-${movie.id}-${index}`}
                className="group flex flex-col bg-zinc-50 dark:bg-zinc-950 border border-zinc-200/60 dark:border-zinc-800/60 rounded-xl overflow-hidden hover:scale-102 transition shadow-sm"
              >
                <div className="aspect-2/3 w-full overflow-hidden bg-zinc-300 dark:bg-zinc-800">
                  <img
                    src={
                      movie.poster_path
                        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                        : "https://placeholder.com"
                    }
                    alt={movie.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                </div>
                <div className="p-2.5 grow flex items-center bg-zinc-100 dark:bg-zinc-900">
                  <h4 className="font-semibold text-xs md:text-sm line-clamp-2 group-hover:text-amber-500 dark:group-hover:text-amber-500 transition duration-200">
                    {movie.title}
                  </h4>
                </div>
              </Link>
            ))}
          </div>

          <div className="flex flex-col items-center justify-center mt-10 gap-4">
            <button
              onClick={handleLoadMore}
              disabled={loadingMore}
              className="px-6 py-2.5 font-semibold text-sm bg-zinc-900 dark:bg-zinc-100 text-white dark:text-black rounded-xl border border-zinc-700 dark:border-zinc-300 hover:bg-zinc-800 dark:hover:bg-zinc-200 active:scale-95 transition-all duration-200 cursor-pointer shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loadingMore ? "Buscando mais filmes..." : "Carregar mais filmes"}
            </button>
          </div>
        </section>
      )}

    </div>
  );
};

export default Home;
