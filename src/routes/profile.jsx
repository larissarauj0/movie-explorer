import React, { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import { ClipLoader } from "react-spinners";

const Profile = () => {
  const [favoritos, setFavoritos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    function loadFavoritos() {
      setLoading(true);

      const data = JSON.parse(localStorage.getItem("favoritos")) ?? [];
      setFavoritos(data);

      setLoading(false);
    }

    loadFavoritos();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <ClipLoader color="#18181b" size={40} />
      </div>
    );
  }

  return (
    <div className="px-2 sm:px-4 md:px-6">
      {favoritos.length === 0 ? (
        <p className="text-center text-zinc-500 mt-10 text-sm md:text-base">
          Você ainda não tem filmes favoritos
        </p>
      ) : (
        <MovieCard movies={favoritos} loading={loading} />
      )}
    </div>
  );
};

export default Profile;