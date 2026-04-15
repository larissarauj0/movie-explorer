import { useState } from "react";
import { MdSearch } from "react-icons/md";
import { searchMovies } from "../services/Api";

export default function SearchBar({ setMovies, setLoading }) {
  const [query, setQuery] = useState("");

  async function handleSearch(e) {
    e.preventDefault();

    if (!query.trim()) return;
    setLoading(true);
    const results = await searchMovies(query);
    setMovies(results);
    setLoading(false);
  }

  return (
    <form
      onSubmit={handleSearch}
      className="flex flex-col sm:flex-row items-center w-full"
    >
      <input
        type="text"
        placeholder="Buscar filmes..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full sm:w-auto flex-1 p-2 rounded-xl h-10 m-2 sm:m-4 
        bg-zinc-100 dark:bg-zinc-800 text-black dark:text-white outline-none"
      />

      <button
        type="submit"
        className="m-2 sm:m-4 p-2 border rounded-xl text-base sm:text-lg 
        hover:scale-110 transition w-full sm:w-auto"
      >
        <MdSearch />
      </button>
    </form>
  );
}