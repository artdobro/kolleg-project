function buildUserJSON({ nickname, email, password, role = "user" }) {
  return {
    nickname,
    email,
    password,
    role
  };
}

function buildFilmJSON({ title, year, genres, description, duration, poster, video }) {
  return {
    title,
    year: Number(year),
    genres,
    description,
    duration,
    poster,
    video
  };
}



function buildFiltersJSON() {
  const activeGenres = [...document.querySelectorAll('.genre-btn.active')]
    .map(btn => btn.dataset.genre);

  const yearFrom = document.querySelector('#yearFrom')?.value || null;
  const yearTo = document.querySelector('#yearTo')?.value || null;

  return {
    genres: activeGenres,
    year: {
      from: yearFrom ? Number(yearFrom) : null,
      to: yearTo ? Number(yearTo) : null
    }
  };
}

fetch('/api/users', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(userData)
});

fetch('/api/films', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(filmData)
});

fetch('/api/films/filter', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(buildFiltersJSON())
});
