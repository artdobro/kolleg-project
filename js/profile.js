let lastScrollTop = 0;
const header = document.querySelector(".header");

window.addEventListener("scroll", function () {
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  if (scrollTop < lastScrollTop) {
    header.classList.add("visible");
  } else {
    header.classList.remove("visible");
  }
  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

document.querySelector('.main_page').addEventListener('click', function() {
  window.location.href = '../html/index.html';
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


// ===== elements =====
const profileBlock = document.getElementById("profileBlock");
const profileName = document.getElementById("profileName");
const logoutBtn = document.getElementById("logoutBtn");
const goProfileBtn = document.getElementById("goProfile");
const wrapper = document.querySelector(".profile-menu-wrapper");

// поля профиля
const nicknameInput = document.getElementById("nickname");
const emailInputField = document.getElementById("email");
const passwordInputField = document.getElementById("password");

// ===== auth / ui =====
function updateUI() {
  const user = getAuthUser();

  if (!user) {
    window.location.href = "index.html";
    return;
  }

  profileBlock?.classList.remove("hidden");
  profileName.textContent = user.login || "User";

  if (nicknameInput) nicknameInput.value = nicknameInput.value || (user.login || "");
  if (emailInputField) emailInputField.value = user.email || "";
  if (passwordInputField) passwordInputField.value = user.password || "";
}

document.addEventListener("DOMContentLoaded", updateUI);

// ===== actions =====
profileName?.addEventListener("click", () => {
  window.location.href = "../html/profile.html";
});

goProfileBtn && (goProfileBtn.onclick = () => (window.location.href = "../html/profile.html"));

logoutBtn?.addEventListener("click", () => {
  localStorage.removeItem("authUser");
  window.location.href = "../html/index.html";
});

// ===== editing =====
document.querySelectorAll(".edit-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const fieldId = btn.dataset.field;
    const input = document.getElementById(fieldId);
    if (!input) return;

    if (input.hasAttribute("readonly")) {
      input.removeAttribute("readonly");
      input.focus();
      btn.innerHTML = '<img src="../images/save.png" alt="" style="width: 45px; height: 45px;">';
    } else {
      input.setAttribute("readonly", true);
      btn.innerHTML = '<img src="../images/pen.png" alt="">';
      // здесь позже будет отправка на backend
    }
  });
});

// ===== toggle password =====
const toggleBtn = document.querySelector(".toggle-pass");
toggleBtn?.addEventListener("click", () => {
  if (!passwordInputField) return;
  passwordInputField.type = passwordInputField.type === "password" ? "text" : "password";
  toggleBtn.innerHTML = `<img src="${
    passwordInputField.type === "password" ? "../images/monkey-hide.png" : "../images/monkey-open.png"
  }" alt="">`;
});
