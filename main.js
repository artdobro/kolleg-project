let lastScrollTop = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', function() {
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  if (scrollTop < lastScrollTop) {
    // Прокрутка вверх
    header.classList.add('visible');
  } else {
    // Прокрутка вниз
    header.classList.remove('visible');
  }
  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // Для iOS
});

document.querySelector('.star').addEventListener('click', function(event){
  event.stopPropagation();
});
document.querySelector('.film').addEventListener('click', function(event){
  if (event.target.classList.contains('star')) 
    return;
  window.location.href = './film_card.html';
});

const star = document.getElementById('starBtn');

star.addEventListener('click', () => {
  star.classList.toggle('active');
});

document.querySelector('.main_page').addEventListener('click', function() {
  window.location.href = './index.html';
});
document.querySelector('.film_page').addEventListener('click', function(event){
  window.alert('Було б добре, якби ця кнопка працювала :)');
});
document.querySelector('.series_page').addEventListener('click', function(event){
  window.alert('Тут може бути ваша реклама, звертатися за номером 8 800 555 35 35');
});
document.querySelector('.anime_page').addEventListener('click', function(event){
  window.alert('Тут вам не Японія, для того що ви хочете подивитись замовляйте дешеві авіаквитки на авіасейлс ヾ(•ω•`)o');
});

// ===== genres from DB (mock) =====
const genresFromDB = [
  { id: 1, name: "Фантастика" },
  { id: 2, name: "Драма" },
  { id: 3, name: "Комедія" },
  { id: 4, name: "Бойовик" },
  { id: 5, name: "Трилер" },
  { id: 6, name: "Жахи" }
];

const genreList = document.getElementById("genreList");
const applyBtn = document.getElementById("applyFilters");

let selectedGenres = [];

// ===== render =====
function renderGenreList() {
  genreList.innerHTML = "";

  genresFromDB.forEach((genre) => {
    const btn = document.createElement("button");
    btn.className = "genre-btn";
    btn.textContent = genre.name;

    btn.onclick = () => toggleGenre(genre, btn);

    genreList.appendChild(btn);
  });
}

// ===== toggle =====
function toggleGenre(genre, btn) {
  const index = selectedGenres.findIndex(g => g.id === genre.id);

  if (index >= 0) {
    selectedGenres.splice(index, 1);
    btn.classList.remove("active");
  } else {
    selectedGenres.push(genre);
    btn.classList.add("active");
  }
}

// ===== apply =====
applyBtn.onclick = () => {
  const filters = {
    genres: selectedGenres.map(g => g.id),
    yearFrom: document.getElementById("yearFrom").value || null,
    yearTo: document.getElementById("yearTo").value || null
  };

  console.log("Фільтри:", filters);

  // В будущем:
  // fetch(`/api/films?genres=${filters.genres.join(",")}&from=${filters.yearFrom}&to=${filters.yearTo}`)
};

renderGenreList();

// ================== ELEMENTS ==================
// const overlay = document.getElementById("overlay");
// const modal = document.getElementById("modal");
// const modalTitle = document.getElementById("modalTitle");

// const loginBtn = document.querySelector(".log_in");
// const signUpBtn = document.querySelector(".sign_up");
// const closeBtn = document.getElementById("closeModal");

// const form = modal.querySelector("form");
// const inputs = form.querySelectorAll("input");

// const loginInput = inputs[0];
// const emailInput = inputs[1];
// const passwordInput = inputs[inputs.length - 1];

// const emailError = document.getElementById("emailError");

// const loginSubmit = document.getElementById("login");
// const registerSubmit = document.getElementById("register");

// const authButtons = loginBtn.parentElement;
// const profileBlock = document.getElementById("profileBlock");
// const profileName = document.getElementById("profileName");
// const logoutBtn = document.getElementById("logoutBtn");
// const goProfileBtn = document.getElementById("goProfile");
// const wrapper = document.querySelector(".profile-menu-wrapper");

// const addFilmBlock = document.getElementById("add_film");

// // ================== STATE ==================
// let mode = "login";

// // ================== USERS (mock DB) ==================
// const users = [
//   { login: "admin", email: "admin@mail.com", password: "admin", role: "admin" },
//   { login: "user", email: "user@mail.com", password: "123", role: "user" }
// ];

// addFilmBlock.addEventListener('click', () => {
//   window.location.href = 'adding.html';
// });
// // ================== MODAL ==================
// loginBtn.onclick = () => openModal("login");
// signUpBtn.onclick = () => openModal("register");
// closeBtn.onclick = closeModal;

// overlay.onclick = (e) => {
//   if (e.target === overlay) closeModal();
// };

// function openModal(type) {
//   mode = type;
//   overlay.classList.add("active");

//   emailError.classList.add("hidden");
//   form.reset();

//   if (mode === "login") {
//     modalTitle.textContent = "Ласкаво просимо";
//     emailInput.style.display = "none";
//     loginSubmit.classList.remove("hidden");
//     registerSubmit.classList.add("hidden");
//     modal.style.height = "500px";
//   } else {
//     modalTitle.textContent = "Вітаємо новеньких";
//     emailInput.style.display = "block";
//     loginSubmit.classList.add("hidden");
//     registerSubmit.classList.remove("hidden");
//     modal.style.height = "600px";
//   }
// }

// function closeModal() {
//   overlay.classList.remove("active");
// }

// // ================== FORM SUBMIT ==================
// form.addEventListener("submit", (e) => {
//   e.preventDefault();

//   const login = loginInput.value.trim();
//   const email = emailInput.value.trim();
//   const password = passwordInput.value.trim();

//   emailError.classList.add("hidden");

//   if (!login || !password) {
//     showError("Заповніть всі обовʼязкові поля");
//     return;
//   }

//   if (mode === "login") loginUser(login, password);
//   if (mode === "register") registerUser(login, email, password);
// });

// // ================== AUTH LOGIC ==================
// function loginUser(login, password) {
//   const user = users.find(
//     u => (u.login === login || u.email === login) && u.password === password
//   );

//   if (!user) {
//     showError("Невірний логін або пароль");
//     return;
//   }

//   saveUser(user);
// }

// function registerUser(login, email, password) {
//   if (!email) {
//     showError("Електронна пошта обовʼязкова");
//     return;
//   }

//   const exists = users.find(
//     u => u.login === login || u.email === email
//   );

// // 1. Ищем, занят ли логин
//   const loginExists = users.some(u => u.login === login);
//   // 2. Ищем, занята ли почта
//   const emailExists = users.some(u => u.email === email);

//   // 3. Проверяем комбинации
//   if (loginExists && emailExists) {
//     showError("Логін та електронна пошта вже зайняті");
//     return;
//   }

//   if (loginExists) {
//     showError("Цей логін уже зайнятий");
//     return;
//   }

//   if (emailExists) {
//     showError("Користувач з такою поштою вже існує");
//     return;
//   }

//   const newUser = { login, email, password, role: "user" };
//   users.push(newUser);
//   saveUser(newUser);
// }

// function saveUser(user) {
//   localStorage.setItem("authUser", JSON.stringify(user));
//   closeModal();
//   updateUI();
// }

// // ================== UI ==================
// function updateUI() {
//   const user = JSON.parse(localStorage.getItem("authUser"));

//   if (user) {
//     authButtons.classList.add("hidden");
//     profileBlock.classList.remove("hidden");
//     wrapper.classList.remove("hidden");
//     wrapper.style.display = "flex";
//     profileName.textContent = user.login;

//     // 🔑 ПОКАЗ ТОЛЬКО ДЛЯ ADMIN
//     if (user.role === "admin") {
//       addFilmBlock?.classList.remove("hidden");
//       addFilmBlock.style.display = "flex";
//     } else {
//       addFilmBlock?.classList.add("hidden");
//     }

//   } else {
//     authButtons.classList.remove("hidden");
//     profileBlock.classList.add("hidden");
//     wrapper.classList.add("hidden");
//     profileName.textContent = "";

//     // ❌ если не залогинен — скрыто
//     addFilmBlock?.classList.add("hidden");
//   }
// }

// updateUI();

// ================== ELEMENTS ==================
const overlay = document.getElementById("overlay");
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modalTitle");

const loginBtn = document.querySelector(".log_in");
const signUpBtn = document.querySelector(".sign_up");
const closeBtn = document.getElementById("closeModal");

const form = modal.querySelector("form");
const inputs = form.querySelectorAll("input");

const loginInput = inputs[0];
const emailInput = inputs[1];
const passwordInput = inputs[inputs.length - 1];

const emailError = document.getElementById("emailError");

const loginSubmit = document.getElementById("login");
const registerSubmit = document.getElementById("register");

const authButtons = loginBtn.parentElement;
const profileBlock = document.getElementById("profileBlock");
const profileName = document.getElementById("profileName");
const logoutBtn = document.getElementById("logoutBtn");
const goProfileBtn = document.getElementById("goProfile");
const wrapper = document.querySelector(".profile-menu-wrapper");

const addFilmBlock = document.getElementById("add_film");

// ================== STATE ==================
let mode = "login";

// ================== MODAL ==================
loginBtn.onclick = () => openModal("login");
signUpBtn.onclick = () => openModal("register");
closeBtn.onclick = closeModal;

overlay.onclick = (e) => {
  if (e.target === overlay) closeModal();
};

function openModal(type) {
  mode = type;
  overlay.classList.add("active");

  emailError.classList.add("hidden");
  form.reset();

  if (mode === "login") {
    modalTitle.textContent = "Ласкаво просимо";
    emailInput.style.display = "none";
    loginSubmit.classList.remove("hidden");
    registerSubmit.classList.add("hidden");
    modal.style.height = "500px";
  } else {
    modalTitle.textContent = "Вітаємо новеньких";
    emailInput.style.display = "block";
    loginSubmit.classList.add("hidden");
    registerSubmit.classList.remove("hidden");
    modal.style.height = "600px";
  }
}

function closeModal() {
  overlay.classList.remove("active");
}

// ================== FORM SUBMIT ==================
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const login = loginInput.value.trim();
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  emailError.classList.add("hidden");

  if (!login || !password) {
    showError("Заповніть всі обовʼязкові поля");
    return;
  }

  if (mode === "login") loginUser(login, password);
  if (mode === "register") registerUser(login, email, password);
});

// ================== AUTH (SPRING SECURITY) ==================
async function loginUser(login, password) {
  try {
    const formData = new FormData();
    formData.append("username", login);
    formData.append("password", password);

    const res = await fetch("/login", {
      method: "POST",
      body: formData,
      credentials: "include"
    });

    if (!res.ok) {
      showError("Невірний логін або пароль");
      return;
    }

    // получаем данные текущего пользователя
    const userRes = await fetch("/api/auth/me", {
      credentials: "include"
    });

    if (!userRes.ok) {
      showError("Не вдалося отримати дані користувача");
      return;
    }

    const user = await userRes.json();
    saveUser(user);

  } catch (e) {
    showError("Помилка зʼєднання з сервером");
  }
}

async function registerUser(login, email, password) {
  if (!email) {
    showError("Електронна пошта обовʼязкова");
    return;
  }

  try {
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ login, email, password })
    });

    if (!res.ok) {
      let message = "Помилка реєстрації";

      // ⬇️ читаем ответ бэка
      try {
        const data = await res.json();

        if (data.message) {
          message = data.message;
        }
      } catch {
        // если бэк вернул plain text
        const text = await res.text();
        if (text) message = text;
      }

      // 🔥 кастомные сообщения
      if (res.status === 409) {
        if (message.toLowerCase().includes("login")) {
          message = "Такий логін вже існує";
        }
        if (message.toLowerCase().includes("email")) {
          message = "Така електронна пошта вже зареєстрована";
        }
      }

      showError(message);
      return;
    }

    // автологин
    await loginUser(login, password);

  } catch (e) {
    showError("Помилка зʼєднання з сервером");
  }
}

function markInputError(input) {
  input.classList.add("input-error");
}

function clearErrors() {
  emailError.classList.add("hidden");
  loginInput.classList.remove("input-error");
  emailInput.classList.remove("input-error");
}
if (message.includes("логін")) markInputError(loginInput);
if (message.includes("пошта")) markInputError(emailInput);

// ================== SAVE USER ==================
function saveUser(user) {
  localStorage.setItem("authUser", JSON.stringify(user));
  closeModal();
  updateUI();
}

// ================== UI ==================
async function updateUI() {
  try {
    const res = await fetch("/api/auth/me", {
      credentials: "include"
    });

    if (!res.ok) {
      throw new Error("Not authorized");
    }

    const user = await res.json();

    authButtons.classList.add("hidden");
    profileBlock.classList.remove("hidden");
    wrapper.classList.remove("hidden");
    wrapper.style.display = "flex";

    profileName.textContent = user.login;

    // ADMIN ONLY
    if (user.role?.includes("ADMIN")) {
      addFilmBlock?.classList.remove("hidden");
      addFilmBlock.style.display = "flex";
    } else {
      addFilmBlock?.classList.add("hidden");
    }

    // sync localStorage
    localStorage.setItem("authUser", JSON.stringify(user));

  } catch {
    // ❗ пользователь НЕ авторизован
    authButtons.classList.remove("hidden");
    profileBlock.classList.add("hidden");
    wrapper.classList.add("hidden");
    profileName.textContent = "";
    addFilmBlock?.classList.add("hidden");
    localStorage.removeItem("authUser");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  updateUI();
});

// ================== ERRORS ==================
function showError(message) {
  emailError.textContent = message;
  emailError.classList.remove("hidden");
}

// ================== INIT ==================
updateUI();


// ================== PROFILE ACTIONS ==================
profileName.onclick = () => window.location.href = "profile.html";
goProfileBtn.onclick = () => window.location.href = "profile.html";

logoutBtn.onclick = () => {
  localStorage.removeItem("authUser");
  updateUI();
};

// ================== HELPERS ==================
function showError(text) {
  emailError.textContent = text;
  emailError.classList.remove("hidden");
}

const filmList = document.querySelector(".film_list");
const pagination = document.getElementById("pagination");

const FILMS_PER_PAGE = 12;
const MAX_VISIBLE = 4;

let films = Array.from(document.querySelectorAll(".film"));
let currentPage = 1;

function getTotalPages() {
  return Math.ceil(films.length / FILMS_PER_PAGE);
}

function renderPage(page) {
  const totalPages = getTotalPages();
  if (page < 1 || page > totalPages) return;

  currentPage = page;
  filmList.innerHTML = "";

  const start = (page - 1) * FILMS_PER_PAGE;
  const end = start + FILMS_PER_PAGE;

  if (addFilmBlock && !addFilmBlock.classList.contains("hidden")) {
    filmList.appendChild(addFilmBlock);
  }

  films.slice(start, end).forEach(film => {
    filmList.appendChild(film);
  });

  renderPagination();
}

function renderPagination() {
  pagination.innerHTML = "";
  const totalPages = getTotalPages();
  if (totalPages <= 1) return;

  const prev = document.createElement("button");
  prev.innerHTML = "◀";
  prev.disabled = currentPage === 1;
  prev.onclick = () => changePage(currentPage - 1);
  pagination.appendChild(prev);

  let start = Math.max(1, currentPage - 1);
  let end = start + MAX_VISIBLE - 1;

  if (end > totalPages) {
    end = totalPages;
    start = Math.max(1, end - MAX_VISIBLE + 1);
  }

  if (start > 1) {
    addPageButton(1);
    if (start > 2) addDots();
  }

  for (let i = start; i <= end; i++) {
    addPageButton(i);
  }

  if (end < totalPages) {
    if (end < totalPages - 1) addDots();
    addPageButton(totalPages);
  }

  const next = document.createElement("button");
  next.innerHTML = "▶";
  next.disabled = currentPage === totalPages;
  next.onclick = () => changePage(currentPage + 1);
  pagination.appendChild(next);
}

function addPageButton(page) {
  const btn = document.createElement("button");
  btn.textContent = page;
  if (page === currentPage) btn.classList.add("active");
  btn.onclick = () => changePage(page);
  pagination.appendChild(btn);
}

function addDots() {
  const dots = document.createElement("span");
  dots.textContent = "…";
  pagination.appendChild(dots);
}

function changePage(page) {
  renderPage(page);
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// INIT
renderPage(1);

