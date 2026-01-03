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

const overlay = document.getElementById('overlay');
const modal = document.getElementById('modal');
const title = document.getElementById('modalTitle');
const loginBtn = document.querySelector('.log_in');
const signUpBtn = document.querySelector('.sign_up');
const emailField = document.getElementById('emailInput');
const profileBlock = document.getElementById("profileBlock");
const authButtons = document.querySelector(".log_in").parentElement;
const submitBtn = document.querySelector(".submit");
const modalTitle = document.getElementById("modalTitle");
let mode = "login";
let made = "register";
const emailInput = document.getElementById("emailInput");
const emailError = document.getElementById("emailError");
const inputs = modal.querySelectorAll("input");
const loginInput = inputs[0];
const passwordInput = inputs[inputs.length - 1];

const profileName = document.getElementById("profileName");
const logoutBtn = document.getElementById("logoutBtn");
const loginSubmit = document.getElementById("login");
const registerSubmit = document.getElementById("register");

document.querySelector('.log_in').onclick = () => {
  title.textContent = 'Ласкаво просимо';
  overlay.classList.add('active');
  modal.style.height = '500px';
};

document.querySelector('.sign_up').onclick = () => {
  title.textContent = 'Вітаємо новеньких';
  overlay.classList.add('active');
  modal.style.height = '600px';
};

// закрытие по крестику
document.getElementById('closeModal').onclick = closeModal;

// закрытие по клику вне окна
overlay.onclick = (e) => {
  if (e.target === overlay) {
    closeModal();
  }
};

function closeModal() {
  overlay.classList.remove('active');
}
loginBtn.addEventListener("click", () => {
  emailField.style.display = "none";
  loginSubmit.classList.remove("hidden");
  registerSubmit.classList.add("hidden");
});

signUpBtn.addEventListener("click", () => {
  emailField.style.display = "block";
  loginSubmit.classList.add("hidden");
  registerSubmit.classList.remove("hidden");
});

const users = [
  { login: "admin", email: "admin@mail.com", password: "admin", role: "admin" },
  { login: "user", email: "user@mail.com", password: "123", role: "user" }
];

function resetForm() {
  loginInput.value = "";
  passwordInput.value = "";
  emailInput.value = "";

  emailError.classList.add("hidden");
  emailInput.classList.remove("input-error");
}

function showError(message) {
  emailError.textContent = message;
  emailError.classList.remove("hidden");
}

// ===== submit =====
modal.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();

  const loginValue = loginInput.value.trim();
  const passwordValue = passwordInput.value.trim();
  const emailValue = emailInput.value.trim();

  emailError.classList.add("hidden");

  // ===== ВХОД =====
  if (mode === "login") {
    const user = users.find(u =>
      (u.login === loginValue || u.email === loginValue) &&
      u.password === passwordValue
    );

    if (!user) {
      showError("Невірний логін / пошта або пароль");
      return;
    }

    localStorage.setItem("authUser", JSON.stringify(user));
  }

  // ===== РЕГИСТРАЦИЯ =====
  if (mode === "register") {
    if (!emailValue) {
      showError("Електронна пошта обовʼязкова");
      emailInput.classList.add("input-error");
      return;
    }

    const exists = users.find(
      u => u.login === loginValue || u.email === emailValue
    );

    if (exists) {
      showError("Користувач вже існує");
      return;
    }

    const newUser = {
      login: loginValue,
      email: emailValue,
      password: passwordValue,
      role: "user"
    };

    users.push(newUser);
    localStorage.setItem("authUser", JSON.stringify(newUser));
  }

  overlay.classList.add("hidden");
  updateUI();
});

// ===== UI =====
function updateUI() {
  const user = JSON.parse(localStorage.getItem("authUser"));

  if (user) {
    authButtons.classList.add("hidden");
    profileBlock.classList.remove("hidden");
    profileName.textContent = user.login;
  } else {
    authButtons.classList.remove("hidden");
    profileBlock.classList.add("hidden");
  }
}

updateUI();

// ===== переход в профиль =====

profileName.addEventListener("click", () => {
  window.location.href = "./profile.html";
  profileName.style.cursor = "pointer";
});
profileName.addEventListener("mouseover", () => {
  profileName.style.cursor = "pointer";
});

// ===== выход =====
logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("authUser");

  updateUI();
});