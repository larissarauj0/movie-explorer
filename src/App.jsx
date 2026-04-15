import { Outlet, Link } from "react-router-dom";
import { getPopularMovies } from "./services/Api";
import { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import DarkMode from "./components/DarkMode";
import { IoHomeOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadPopularMovies() {
    setLoading(true);
    const results = await getPopularMovies();
    setMovies(results);
    setLoading(false);
  }

  useEffect(() => {
    async function load() {
      await loadPopularMovies();
    }
    load();
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white">
      {/* Header */}
      <header className="border-b border-zinc-400 dark:border-zinc-800 flex flex-col sm:flex-row justify-between items-center p-3 sm:p-4">
        
        {/* esquerda */}
        <div className="flex items-center flex-wrap justify-center sm:justify-start">
          <DarkMode />

          <Link
            onClick={() => loadPopularMovies()}
            to="/"
            className="inline-flex items-center justify-center bg-zinc-100 dark:bg-zinc-950 hover:bg-zinc-300 dark:hover:bg-zinc-900 m-2 sm:m-4 p-2 md:p-2.5 border rounded-xl text-base md:text-lg hover:scale-110 transition cursor-pointer"
          >
            <IoHomeOutline />
          </Link>

          <Link
            to="/profile"
            className="inline-flex items-center justify-center bg-zinc-100 dark:bg-zinc-950 hover:bg-zinc-300 dark:hover:bg-zinc-900 m-2 sm:m-4 p-2 md:p-2.5 border rounded-xl text-base md:text-lg hover:scale-110 transition cursor-pointer"
          >
            <CgProfile />
          </Link>
        </div>

        {/* direita */}
        <div className="w-full sm:w-auto">
          <SearchBar setMovies={setMovies} setLoading={setLoading} />
        </div>
      </header>

      {/* Conteúdo */}
      <main>
        <Outlet context={{ movies, setMovies, loading, setLoading }} />
      </main>
    </div>
  );
};

export default App;