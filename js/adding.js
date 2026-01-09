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
// Это выпадающий список и выбор жанров
const profileBlock = document.getElementById("profileBlock");
const profileName = document.getElementById("profileName");
const logoutBtn = document.getElementById("logoutBtn");
const goProfileBtn = document.getElementById("goProfile");
const wrapper = document.querySelector(".profile-menu-wrapper");

const genresFromDB = [
  { id: 1, name: "Фантастика" },
  { id: 2, name: "Драма" },
  { id: 3, name: "Комедія" },
  { id: 4, name: "Трилер" },
  { id: 5, name: "Жахи" }
];

const genresSelect = document.getElementById("genresSelect");
const genresDropdown = document.getElementById("genresDropdown");
const genresPlaceholder = genresSelect.querySelector(".genres-placeholder");

let selectedGenres = [];

/* GENRES */
function renderGenres() {
  genresDropdown.innerHTML = "";

  genresFromDB.forEach(g => {
    const label = document.createElement("label");
    label.className = "genre-item";
    label.innerHTML = `
      <input type="checkbox" value="${g.id}">
      <span>${g.name}</span>
    `;

    const checkbox = label.querySelector("input");
    checkbox.addEventListener("change", () => {
      const id = +checkbox.value;
      checkbox.checked
        ? selectedGenres.push(id)
        : selectedGenres = selectedGenres.filter(x => x !== id);
      updatePlaceholder();
    });

    genresDropdown.appendChild(label);
  });
}

function updatePlaceholder() {
  genresPlaceholder.textContent = selectedGenres.length
    ? genresFromDB.filter(g => selectedGenres.includes(g.id)).map(g => g.name).join(", ")
    : "Оберіть жанри";
}

genresSelect.addEventListener("click", e => {
  e.stopPropagation();
  genresDropdown.classList.toggle("hidden");
});

document.addEventListener("click", () => genresDropdown.classList.add("hidden"));
renderGenres();

/* POSTER PREVIEW оно показывает картинку которую загрузили как постер*/
const posterInput = document.getElementById("posterInput");
const posterPreview = document.getElementById("posterPreview");

posterInput.addEventListener("change", () => {
  const file = posterInput.files[0];
  if (!file) return;
  posterPreview.src = URL.createObjectURL(file);
});

/* SUBMIT это отправка данных кнопкой */
document.getElementById("addFilmForm").addEventListener("submit", async e => {
  e.preventDefault();

  const formData = new FormData();
  formData.append("titleUA", titleUA.value);
  formData.append("titleEN", titleEN.value);
  formData.append("description", description.value);
  formData.append("year", year.value);
  formData.append("age", age.value);
  formData.append("duration", duration.value);
  formData.append("director", director.value);
  formData.append("actors", actors.value);
  formData.append("genres", JSON.stringify(selectedGenres));
  formData.append("poster", posterInput.files[0]);
  formData.append("film", filmFile.files[0]); // 🎬 ВИДЕО

  await fetch("/api/films", {
    method: "POST",
    body: formData
  });

  alert("Фільм успішно додано");
});


profileName.addEventListener("click", () => {
  window.location.href = "../profile.html";
  profileName.style.cursor = "pointer";
});
profileName.addEventListener("mouseover", () => {
  profileName.style.cursor = "pointer";
});

// ===== выход в остальных файлах похожие строки, это когда наводишь на логин справа сверху список выпадающий и там кнопка выхода =====
logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("authUser");
    window.location.href = "./main.html";
  updateUI();
});
logoutBtn?.addEventListener("click", () => {
  localStorage.removeItem("authUser");
  closeModal();  // модалка точно закрыта
  updateUI();
});
goProfileBtn.onclick = () => window.location.href = "profile.html";