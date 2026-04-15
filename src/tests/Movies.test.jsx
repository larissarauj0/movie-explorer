import { render, screen } from "@testing-library/react";
import { vi, test, expect } from "vitest";
import Movies from "../routes/movies";
import * as api from "../services/Api";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";


vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useParams: () => ({ id: "1" }),
  };
});


vi.spyOn(api, "getMoviesDetails").mockResolvedValue({
  id: 1,
  title: "Matrix",
  overview: "Um hacker descobre a verdade",
  poster_path: "/test.jpg",
});


test("renderiza dados do filme", async () => {
  render(
    <MemoryRouter>
      <Movies />
    </MemoryRouter>
  );

  expect(await screen.findByText("Matrix")).toBeInTheDocument();
});

test("usuario adiciona review", async () => {
  render(
    <MemoryRouter>
      <Movies />
    </MemoryRouter>
  );

  const textarea = await screen.findByPlaceholderText(/resenha/i);

  await userEvent.type(textarea, "Filme incrível!");

  const botao = screen.getByText(/salvar/i);
  await userEvent.click(botao);

  expect(screen.getByText("Filme incrível!")).toBeInTheDocument();
});