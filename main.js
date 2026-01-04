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


// // закрытие по крестику
// document.getElementById('closeModal').onclick = closeModal;

// // закрытие по клику вне окна
// overlay.onclick = (e) => {
//   if (e.target === overlay) {
//     closeModal();
//   }
// };

// document.addEventListener("DOMContentLoaded", () => {

//   const overlay = document.getElementById("overlay");
//   const modal = document.getElementById("modal");
//   const form = modal?.querySelector("form");

//   const loginBtn = document.querySelector(".log_in");
//   const signUpBtn = document.querySelector(".sign_up");

//   const loginSubmit = document.getElementById("login");
//   const registerSubmit = document.getElementById("register");

//   const emailInput = document.getElementById("emailInput");
//   const emailError = document.getElementById("emailError");

//   const profileBlock = document.getElementById("profileBlock");
//   const profileName = document.getElementById("profileName");
//   const logoutBtn = document.getElementById("logoutBtn");

//   const inputs = modal?.querySelectorAll("input");
//   const loginInput = inputs?.[0];
//   const passwordInput = inputs?.[inputs.length - 1];

//   let mode = "login";


//   let users = JSON.parse(localStorage.getItem("users")) || [
//     { login: "admin", email: "admin@mail.com", password: "admin", role: "admin" }
//   ];





//  function openModal(type) {
//     if (!overlay) return;

//     mode = type;
//     overlay.classList.add("active");

//     resetForm();

//     if (type === "login") {
//       emailInput?.classList.add("hidden");
//       loginSubmit?.classList.remove("hidden");
//       registerSubmit?.classList.add("hidden");
//     }

//     if (type === "register") {
//       emailInput?.classList.remove("hidden");
//       loginSubmit?.classList.add("hidden");
//       registerSubmit?.classList.remove("hidden");
//     }
//   }

//   function closeModal() {
//     overlay?.classList.remove("active");
//     resetForm();
//   }

//   loginBtn?.addEventListener("click", () => openModal("login"));
//   signUpBtn?.addEventListener("click", () => openModal("register"));

//   document.getElementById("closeModal")?.addEventListener("click", closeModal);

//   overlay?.addEventListener("click", (e) => {
//     if (e.target === overlay) closeModal();
//   });
  
//   function resetForm() {
//     loginInput && (loginInput.value = "");
//     passwordInput && (passwordInput.value = "");
//     emailInput && (emailInput.value = "");

//     emailError?.classList.add("hidden");
//     emailInput?.classList.remove("input-error");
//   }

//   function showError(text) {
//     if (!emailError) return;
//     emailError.textContent = text;
//     emailError.classList.remove("hidden");
//   }

//    form?.addEventListener("submit", (e) => {
//     e.preventDefault();

//     const login = loginInput.value.trim();
//     const password = passwordInput.value.trim();
//     const email = emailInput?.value.trim();

//     emailError?.classList.add("hidden");

//     // ===== ВХОД
//     if (mode === "login") {
//       const user = users.find(u =>
//         (u.login === login || u.email === login) &&
//         u.password === password
//       );

//       if (!user) {
//         showError("Невірний логін / пошта або пароль");
//         return;
//       }

//       localStorage.setItem("authUser", JSON.stringify(user));
//     }

//     // ===== РЕГИСТРАЦИЯ
//     if (mode === "register") {
//       if (!email) {
//         showError("Електронна пошта обовʼязкова");
//         emailInput?.classList.add("input-error");
//         return;
//       }

//       const exists = users.find(u => u.login === login || u.email === email);
//       if (exists) {
//         showError("Користувач вже існує");
//         return;
//       }

//       const newUser = { login, email, password, role: "user" };
//       users.push(newUser);

//       localStorage.setItem("users", JSON.stringify(users));
//       localStorage.setItem("authUser", JSON.stringify(newUser));
//     }

//     closeModal();
//     updateUI();
//   });


// function updateUI() {
//   const user = JSON.parse(localStorage.getItem("authUser"));

//   if (user) {
//     loginBtn?.classList.add("hidden");
//     signUpBtn?.classList.add("hidden");
//     profileBlock?.classList.remove("hidden");
//     profileName.textContent = user.login;
//   } else {
//     loginBtn?.classList.remove("hidden");
//     signUpBtn?.classList.remove("hidden");
//     profileBlock?.classList.add("hidden");

//     // 🔴 ВАЖНО: не трогаем модалку тут
//     profileName.textContent = "";
//   }
// }

//     logoutBtn?.addEventListener("click", () => {
//     localStorage.removeItem("authUser");
//     closeModal();   // 🔴 важно
//     updateUI();
//   });
//   if (profileName) {
//   profileName.style.cursor = "pointer";

//   profileName.addEventListener("click", () => {
//     window.location.href = "profile.html";
//   });
// }
// logoutBtn?.addEventListener("click", (e) => {
//   e.preventDefault();
//   e.stopPropagation();

//   localStorage.removeItem("authUser");

//   // 🔴 ЖЁСТКО закрываем модалку
//   overlay?.classList.remove("active");

//   // 🔴 сбрасываем форму
//   resetForm();

//   // 🔴 обновляем UI
//   updateUI();
// });
// });

// document.addEventListener("DOMContentLoaded", () => {

//   // ===== DOM =====
//   const overlay = document.getElementById("overlay");
//   const modal = document.getElementById("modal");
//   const form = modal?.querySelector("form");

//   const loginBtn = document.querySelector(".log_in");
//   const signUpBtn = document.querySelector(".sign_up");

//   const authButtons = document.getElementById("authButtons");
//   const profileBlock = document.getElementById("profileBlock");
//   const profileName = document.getElementById("profileName");
//   const logoutBtn = document.getElementById("logoutBtn");

//   const loginSubmit = document.getElementById("login");
//   const registerSubmit = document.getElementById("register");

//   const emailInput = document.getElementById("emailInput");
//   const emailError = document.getElementById("emailError");

//   const inputs = modal?.querySelectorAll("input");
//   const loginInput = inputs?.[0];
//   const passwordInput = inputs?.[inputs.length - 1];

//   const closeBtn = document.getElementById("closeModal");

//   let mode = "login";

//   document.querySelector('.log_in').onclick = () => {
//   title.textContent = 'Ласкаво просимо';
//   overlay.classList.add('active');
//   modal.style.height = '500px';
// };

// document.querySelector('.sign_up').onclick = () => {
//   title.textContent = 'Вітаємо новеньких';
//   overlay.classList.add('active');
//   modal.style.height = '600px';
// };
//   // ===== USERS =====
//   let users = JSON.parse(localStorage.getItem("users")) || [
//     { login: "admin", email: "admin@mail.com", password: "123", role: "admin" },
//     { login: "user", email: "user@mail.com", password: "123", role: "user" }
//   ];

//   // ===== MODAL =====
//   function openModal(type) {
//     if (!overlay) return;

//     mode = type;
//     overlay.classList.add("active");

//     resetForm();

//     if (type === "login") {
//       emailInput?.classList.add("hidden");
//       loginSubmit?.classList.remove("hidden");
//       registerSubmit?.classList.add("hidden");
//     }

//     if (type === "register") {
//       emailInput?.classList.remove("hidden");
//       loginSubmit?.classList.add("hidden");
//       registerSubmit?.classList.remove("hidden");
//     }
//   }

//   function closeModal() {
//     overlay?.classList.remove("active");
//     resetForm();
//   }

//   loginBtn?.addEventListener("click", () => openModal("login"));
//   signUpBtn?.addEventListener("click", () => openModal("register"));
//   closeBtn?.addEventListener("click", closeModal);

//   overlay?.addEventListener("click", (e) => {
//     if (e.target === overlay) closeModal();
//   });

//   // ===== FORM =====
//   function resetForm() {
//     loginInput && (loginInput.value = "");
//     passwordInput && (passwordInput.value = "");
//     emailInput && (emailInput.value = "");

//     emailError?.classList.add("hidden");
//     emailInput?.classList.remove("input-error");
//   }

//   function showError(text) {
//     if (!emailError) return;
//     emailError.textContent = text;
//     emailError.classList.remove("hidden");
//   }

//   form?.addEventListener("submit", (e) => {
//     e.preventDefault();

//     const login = loginInput.value.trim();
//     const password = passwordInput.value.trim();
//     const email = emailInput?.value.trim();

//     emailError?.classList.add("hidden");

//     // ===== LOGIN =====
//     if (mode === "login") {
//       const user = users.find(u =>
//         (u.login === login || u.email === login) &&
//         u.password === password
//       );

//       if (!user) {
//         showError("Невірний логін / пошта або пароль");
//         return;
//       }

//       localStorage.setItem("authUser", JSON.stringify(user));
//     }

//     // ===== REGISTER =====
//     if (mode === "register") {
//       if (!email) {
//         showError("Електронна пошта обовʼязкова");
//         emailInput?.classList.add("input-error");
//         return;
//       }

//       const exists = users.find(u => u.login === login || u.email === email);
//       if (exists) {
//         showError("Користувач вже існує");
//         return;
//       }

//       const newUser = { login, email, password, role: "user" };
//       users.push(newUser);

//       localStorage.setItem("users", JSON.stringify(users));
//       localStorage.setItem("authUser", JSON.stringify(newUser));
//     }

//     closeModal();
//     updateUI();
//   });

//   // ===== UI =====
//   function updateUI() {
//     const user = JSON.parse(localStorage.getItem("authUser"));

//     if (user) {
//       authButtons?.classList.add("hidden");
//       profileBlock?.classList.remove("hidden");
//       profileName && (profileName.textContent = user.login);
//     } else {
//       authButtons?.classList.remove("hidden");
//       profileBlock?.classList.add("hidden");
//       profileName && (profileName.textContent = "");
//     }
//   }

//   updateUI();

//   // ===== PROFILE LINK =====
//   if (profileName) {
//     profileName.style.cursor = "pointer";
//     profileName.addEventListener("click", () => {
//       window.location.href = "profile.html";
//     });
//   }

//   // ===== LOGOUT =====
//   logoutBtn?.addEventListener("click", (e) => {
//     e.preventDefault();
//     e.stopPropagation();

//     localStorage.removeItem("authUser");
//     closeModal();
//     updateUI();
//   });

// });
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

// ================== USERS (mock DB) ==================
const users = [
  { login: "admin", email: "admin@mail.com", password: "admin", role: "admin" },
  { login: "user", email: "user@mail.com", password: "123", role: "user" }
];

addFilmBlock.addEventListener('click', () => {
  window.location.href = 'adding.html';
});
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
    showError("Невірний логін або пароль");
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
    profileName.textContent = user.login;

    // 🔑 ПОКАЗ ТОЛЬКО ДЛЯ ADMIN
    if (user.role === "admin") {
      addFilmBlock?.classList.remove("hidden");
      addFilmBlock.style.display = "flex";
    } else {
      addFilmBlock?.classList.add("hidden");
    }

  } else {
    authButtons.classList.remove("hidden");
    profileBlock.classList.add("hidden");
    wrapper.classList.add("hidden");
    profileName.textContent = "";

    // ❌ если не залогинен — скрыто
    addFilmBlock?.classList.add("hidden");
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
