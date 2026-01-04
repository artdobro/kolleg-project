// ===== переход в профиль =====
const profileBlock = document.getElementById("profileBlock");
const profileName = document.getElementById("profileName");
const logoutBtn = document.getElementById("logoutBtn");
const goProfileBtn = document.getElementById("goProfile");
const wrapper = document.querySelector(".profile-menu-wrapper");

profileName.addEventListener("click", () => {
  window.location.href = "./profile.html";
  profileName.style.cursor = "pointer";
});
profileName.addEventListener("mouseover", () => {
  profileName.style.cursor = "pointer";
});
goProfileBtn.onclick = () => window.location.href = "profile.html";
// ===== выход =====
logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("authUser");
    window.location.href = "./index.html";
  updateUI();
});
logoutBtn?.addEventListener("click", () => {
  localStorage.removeItem("authUser");
  closeModal();  // модалка точно закрыта
  updateUI();
});

function updateUI() {
  const user = JSON.parse(localStorage.getItem("authUser"));

  if (user) {
    authButtons?.classList.add("hidden");
    profileBlock?.classList.remove("hidden");
    profileName.textContent = user.login;
  } else {
    authButtons?.classList.remove("hidden");
    profileBlock?.classList.add("hidden");
    profileName.textContent = "";
  };
}

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

document.querySelectorAll(".edit-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const fieldId = btn.dataset.field;
    const input = document.getElementById(fieldId);

    // режим редактирования
    if (input.hasAttribute("readonly")) {
      input.removeAttribute("readonly");
      input.focus();
      btn.innerHTML = '<img src="./images/save.png" alt="" style="width: 45px; height: 45px;"> ';    } 
    // режим сохранения
    else {
      input.setAttribute("readonly", true);
      btn.innerHTML = '<img src="./images/pen.png" alt="">';

      saveField(fieldId, input.value);
    }
  });
});
const passInput = document.getElementById("password");
const toggleBtn = document.querySelector(".toggle-pass");

toggleBtn.addEventListener("click", () => {
  passInput.type = passInput.type === "password" ? "text" : "password";
  toggleBtn.innerHTML = `<img src="${passInput.type === "password" ? "./images/monkey-hide.png" : "./images/monkey-open.png"}" alt="">`;
});
document.addEventListener("DOMContentLoaded", () => {
  const user = getAuthUser();

  if (!user) {
    window.location.href = "index.html";
    return;
  }

  document.getElementById("profileLogin").textContent = user.login;
});