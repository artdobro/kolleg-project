movieTitle = document.querySelector('.main_title').textContent;
document.title = movieTitle;

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

// ================== STATE ==================
let mode = "login";

// ================== USERS (mock DB) ==================
const users = [
  { login: "admin", email: "admin@mail.com", password: "admin", role: "admin" },
  { login: "user", email: "user@mail.com", password: "123", role: "user" }
];

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

// ================== AUTH LOGIC ==================
function loginUser(login, password) {
  const user = users.find(
    u => (u.login === login || u.email === login) && u.password === password
  );

  if (!user) {
    showError("Невірний логін / пошта або пароль");
    return;
  }

  saveUser(user);
}

function registerUser(login, email, password) {
  if (!email) {
    showError("Електронна пошта обовʼязкова");
    return;
  }

  const exists = users.find(
    u => u.login === login || u.email === email
  );

// 1. Ищем, занят ли логин
  const loginExists = users.some(u => u.login === login);
  // 2. Ищем, занята ли почта
  const emailExists = users.some(u => u.email === email);

  // 3. Проверяем комбинации
  if (loginExists && emailExists) {
    showError("Логін та електронна пошта вже зайняті");
    return;
  }

  if (loginExists) {
    showError("Цей логін уже зайнятий");
    return;
  }

  if (emailExists) {
    showError("Користувач з такою поштою вже існує");
    return;
  }

  const newUser = { login, email, password, role: "user" };
  users.push(newUser);
  saveUser(newUser);
}

function saveUser(user) {
  localStorage.setItem("authUser", JSON.stringify(user));
  closeModal();
  updateUI();
}

// ================== UI ==================
function updateUI() {
  const user = JSON.parse(localStorage.getItem("authUser"));

  if (user) {
    authButtons.classList.add("hidden");
    profileBlock.classList.remove("hidden");
    wrapper.classList.remove("hidden");
    wrapper.style.display = "flex";
    profileName.textContent = user.login;
  } else {
    authButtons.classList.remove("hidden");
    profileBlock.classList.add("hidden");
    wrapper.classList.add("hidden");
    profileName.textContent = "";
  }
}

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
