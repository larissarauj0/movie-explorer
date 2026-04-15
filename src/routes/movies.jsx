import { useState, useEffect } from "react";
import { getMoviesDetails } from "../services/Api";
import { useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { FaHeart, FaRegHeart, FaStar } from "react-icons/fa";
import { CiCircleRemove } from "react-icons/ci";
import { Tooltip } from "react-tooltip";
import Rating from "react-rating";

const Movies = () => {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    async function loadMoviesDetails() {
      setLoading(true);
      const data = await getMoviesDetails(id);
      setMovie(data);
      setLoading(false);
    }

    if (id) {
      loadMoviesDetails();
    }
  }, [id]);

  const [isFavorito, setIsFavorito] = useState(() => {
    const data = JSON.parse(localStorage.getItem("favoritos")) ?? [];
    return data.some((fav) => fav.id === Number(id));
  });

  function adicionarFavorito(movie) {
    const favoritos = JSON.parse(localStorage.getItem("favoritos")) ?? [];
    const existe = favoritos.some((fav) => fav.id === movie.id);
    if (existe) return;

    favoritos.push(movie);
    localStorage.setItem("favoritos", JSON.stringify(favoritos));
    setIsFavorito(true);
  }

  function deletarFavorito(movie) {
    const favoritos = JSON.parse(localStorage.getItem("favoritos")) ?? [];
    const favoritosAtualizado = favoritos.filter((fav) => fav.id !== movie.id);

    setIsFavorito(false);
    localStorage.setItem("favoritos", JSON.stringify(favoritosAtualizado));
  }

  const [Avaliacao, setAvaliacao] = useState(() => {
    return localStorage.getItem(`avaliacao_${id}`) ?? 0;
  });

  function salvarAvaliacao(value) {
    localStorage.setItem(`avaliacao_${movie.id}`, value);
    setAvaliacao(value);
  }

  const [reviews, setReviews] = useState(() => {
    return JSON.parse(localStorage.getItem(`reviews_${id}`)) ?? [];
  });

  const [texto, setTexto] = useState("");
  const [editandoId, setEditandoId] = useState(null);

  function salvarReviewsAtualizadas(lista) {
    setReviews(lista);
    localStorage.setItem(`reviews_${movie.id}`, JSON.stringify(lista));
  }

  function handleSalvarReview() {
    if (!texto.trim()) return;

    if (editandoId) {
      const novaLista = reviews.map((r) =>
        r.id === editandoId ? { ...r, texto } : r,
      );
      salvarReviewsAtualizadas(novaLista);
      setEditandoId(null);
    } else {
      const nova = {
        id: Date.now(),
        texto,
      };
      salvarReviewsAtualizadas([nova, ...reviews]);
    }

    setTexto("");
  }

  function deletarReview(reviewId) {
    const novaLista = reviews.filter((r) => r.id !== reviewId);
    salvarReviewsAtualizadas(novaLista);
  }

  function iniciarEdicao(review) {
    setTexto(review.texto);
    setEditandoId(review.id);
  }

  return (
    <div>
      {loading ? (
        <div className="col-span-full flex justify-center items-center">
          <ClipLoader color="#18181b" size={40} />
        </div>
      ) : !movie ? (
        <p>Erro ao carregar filme</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2">
          <img
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : "https://via.placeholder.com/300x450"
            }
            alt={movie.title}
            className="m-4 w-full max-w-xs md:max-w-sm mx-auto"
          />

          <div className="p-4 md:p-10">
            <h1 className="m-2 md:m-4 text-lg md:text-xl font-bold">
              {movie.title}
            </h1>

            <p className="m-2 md:m-4 text-sm md:text-base">{movie.overview}</p>

            <div className="flex flex-wrap items-center">
              <button onClick={() => adicionarFavorito(movie)}>
                {isFavorito ? (
                  <div
                    id="my-anchor-element"
                    className=" bg-zinc-100 dark:bg-zinc-950 hover:bg-zinc-300 dark:hover:bg-zinc-900 m-2 p-2 md:p-2.5 border rounded-xl text-base md:text-lg hover:scale-110 transition cursor-pointer"
                  >
                    <FaHeart className="text-rose-400" />
                    <Tooltip
                      anchorSelect="#my-anchor-element"
                      style={{
                        backgroundColor: "rgb(209, 209, 209)",
                        color: "#222",
                        fontSize: "12px",
                        padding: "4px 8px",
                      }}
                      content="Filme adicionado aos favoritos"
                    />
                  </div>
                ) : (
                  <div
                    id="add-favoritos"
                    className=" bg-zinc-100 dark:bg-zinc-950 hover:bg-zinc-300 dark:hover:bg-zinc-900 m-2 p-2 md:p-2.5 border rounded-xl text-base md:text-lg hover:scale-110 transition cursor-pointer"
                  >
                    <FaRegHeart className="text-zinc-500" />
                    <Tooltip
                      anchorSelect="#add-favoritos"
                      style={{
                        backgroundColor: "rgb(209, 209, 209)",
                        color: "#222",
                        fontSize: "12px",
                        padding: "4px 8px",
                      }}
                      content="Adicionar ao favoritos"
                    />
                  </div>
                )}
              </button>

              <button
                id="remove-button"
                onClick={() => deletarFavorito(movie)}
                className=" bg-zinc-100 dark:bg-zinc-950 hover:bg-zinc-300 dark:hover:bg-zinc-900 m-2 p-2 md:p-2.5 border rounded-xl text-base md:text-lg hover:scale-110 transition cursor-pointer"
              >
                <CiCircleRemove />
              </button>

              <Tooltip
                anchorSelect="#remove-button"
                style={{
                  backgroundColor: "rgb(209, 209, 209)",
                  color: "#222",
                  fontSize: "12px",
                  padding: "4px 8px",
                }}
                content={
                  isFavorito
                    ? "Remover de favorito"
                    : "Filme não encontrado na lista de favoritos"
                }
              />

              <div className="text-xl md:text-2xl mt-2 md:mt-3">
                <Rating
                  onChange={salvarAvaliacao}
                  initialRating={Avaliacao}
                  emptySymbol={<FaStar className="text-zinc-300" />}
                  fullSymbol={<FaStar className="text-yellow-400" />}
                  fractions={2}
                />
              </div>
            </div>

            <div className="mt-6 flex flex-col">
              <textarea
                value={texto}
                onChange={(e) => setTexto(e.target.value)}
                placeholder="Escreva sua resenha sobre o filme..."
                className="p-3 rounded-lg border bg-zinc-100 dark:bg-zinc-900 resize-none h-32 text-sm md:text-base"
              />

              <button
                onClick={handleSalvarReview}
                className="mt-2 p-3 rounded-lg bg-zinc-800 text-white hover:bg-zinc-700 transition text-base md:text-lg"
              >
                {editandoId ? "Salvar edição" : "Salvar resenha"}
              </button>
            </div>

            <div className="mt-6 space-y-4">
              {reviews.length === 0 ? (
                <p className="text-zinc-500 text-sm md:text-base">
                  Nenhuma resenha ainda
                </p>
              ) : (
                reviews.map((r) => (
                  <div
                    key={r.id}
                    className="p-4 border rounded-xl bg-zinc-100 dark:bg-zinc-900"
                  >
                    <p className="text-sm md:text-base">{r.texto}</p>

                    <div className="flex gap-3 mt-2 text-sm">
                      <button
                        onClick={() => iniciarEdicao(r)}
                        className="hover:underline"
                      >
                        Editar
                      </button>

                      <button
                        onClick={() => deletarReview(r.id)}
                        className="hover:underline text-red-500"
                      >
                        Deletar
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Movies;
