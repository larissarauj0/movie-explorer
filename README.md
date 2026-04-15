# 🎬 Movie Explorer

Aplicação web para explorar filmes populares, buscar títulos, salvar favoritos, avaliar e comentar filmes — tudo com persistência via localStorage.

> 🔗 **Deploy:** [em breve](#) &nbsp;|&nbsp; 📁 **Repositório:** [github.com/larissarauj0/movie-explorer](https://github.com/larissarauj0/movie-explorer)

---

## 📸 Screenshots

> _Em breve — prints e GIFs serão adicionados após o deploy._

---

## ✨ Funcionalidades

- 🔍 **Busca de filmes** em tempo real via TMDB API
- 🎥 **Página de detalhes** de cada filme com poster, sinopse e informações
- ❤️ **Sistema de favoritos** com adição e remoção, persistido no localStorage
- ⭐ **Avaliação por estrelas** (com suporte a meias estrelas) por filme
- 📝 **Campo de resenha** por filme, salvo localmente
- 🌙 **Dark mode** com alternância de tema
- ⏳ **Loading states** com spinner animado
- 📱 **Layout responsivo** para mobile e desktop

---

## 🛠️ Tecnologias

- [React](https://react.dev/)
- [React Router DOM](https://reactrouter.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [TMDB API](https://www.themoviedb.org/documentation/api)
- [react-spinners](https://www.davidhu.io/react-spinners/)
- [react-tooltip](https://react-tooltip.com/)
- [react-rating](https://www.npmjs.com/package/react-rating)
- [react-icons](https://react-icons.github.io/react-icons/)
- Vite

---

## 🚀 Como rodar localmente

```bash
# Clone o repositório
git clone https://github.com/larissarauj0/movie-explorer.git

# Entre na pasta
cd movie-explorer

# Instale as dependências
npm install

# Crie o arquivo .env na raiz com sua chave da TMDB
VITE_API_KEY=sua_chave_aqui

# Rode o projeto
npm run dev
```

> ⚠️ Você precisa de uma chave de API gratuita do [TMDB](https://www.themoviedb.org/settings/api) para rodar o projeto.

---

## 📁 Estrutura do projeto

```
src/
├── components/
│   ├── MovieCard.jsx
│   ├── SearchBar.jsx
│   └── DarkMode.jsx
├── routes/
│   ├── Home.jsx
│   ├── Movies.jsx
│   └── Profile.jsx
├── services/
│   └── Api.js
└── App.jsx
```

---

## 👩‍💻 Desenvolvido por

[Larissa Araújo](https://github.com/larissarauj0) 🚀
