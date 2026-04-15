const getLanguage = () => {
  return navigator.language?.split("-")[0] || "en";
};

export async function searchMovies(query) {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${import.meta.env.VITE_TMDB_API_KEY}&query=${query}&language=${getLanguage()}`,
    );

    if (!response.ok) {
      throw new Error("Erro na requisição");
    }

    const data = await response.json();

    return data.results || [];
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getPopularMovies() {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=${getLanguage()}`,
    );

    if (!response.ok) {
      throw new Error("Erro na requisição");
    }

    const data = await response.json();

    return data.results || [];
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getMoviesDetails(id) {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=${getLanguage()}`,
    );

    if (!response.ok) {
      throw new Error("Erro na requisição");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}
