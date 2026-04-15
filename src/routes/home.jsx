import MovieCard from "../components/MovieCard";
import { useOutletContext } from "react-router-dom";

const Home = () => {
  const { movies, loading } = useOutletContext();

  return (
    <MovieCard movies={movies} loading={loading} />
  );
};

export default Home;
