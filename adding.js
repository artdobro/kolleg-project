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

// рендер списка
function renderGenres(genres) {
  genresDropdown.innerHTML = "";

  genres.forEach(genre => {
    const label = document.createElement("label");
    label.className = "genre-item";

    label.innerHTML = `
      <input type="checkbox" value="${genre.id}">
      <span>${genre.name}</span>
    `;

    const checkbox = label.querySelector("input");

    checkbox.addEventListener("change", () => {
      const id = Number(checkbox.value);

      if (checkbox.checked) {
        selectedGenres.push(id);
      } else {
        selectedGenres = selectedGenres.filter(g => g !== id);
      }

      updatePlaceholder();
    });

    genresDropdown.appendChild(label);
  });
}

function updatePlaceholder() {
  if (selectedGenres.length === 0) {
    genresPlaceholder.textContent = "Оберіть жанри";
    return;
  }

  const names = genresFromDB
    .filter(g => selectedGenres.includes(g.id))
    .map(g => g.name);

  genresPlaceholder.textContent = names.join(", ");
}

// открытие / закрытие
genresSelect.addEventListener("click", (e) => {
  e.stopPropagation();
  genresDropdown.classList.toggle("hidden");
});

// клик вне — закрывает
document.addEventListener("click", () => {
  genresDropdown.classList.add("hidden");
});

// инициализация
renderGenres(genresFromDB);

function getSelectedGenres() {
  return selectedGenres;
}

const posterInput = document.getElementById("posterInput");
const posterPreview = document.getElementById("posterPreview");

posterInput.addEventListener("change", () => {
  const file = posterInput.files[0];
  if (!file) return;

  // защита: только картинки
  if (!file.type.startsWith("image/")) {
    alert("Будь ласка, оберіть зображення");
    posterInput.value = "";
    return;
  }

  const objectURL = URL.createObjectURL(file);
  posterPreview.src = objectURL;
});

let currentPreviewURL = null;

posterInput.addEventListener("change", () => {
  const file = posterInput.files[0];
  if (!file) return;

  if (currentPreviewURL) {
    URL.revokeObjectURL(currentPreviewURL);
  }

  currentPreviewURL = URL.createObjectURL(file);
  posterPreview.src = currentPreviewURL;
});



let resizedImageBlob = null; // то, что отправим в БД

posterInput.addEventListener("change", () => {
  const file = posterInput.files[0];
  if (!file) return;

  resizeImage(file, 253, 342).then(blob => {
    resizedImageBlob = blob;

    // preview
    const url = URL.createObjectURL(blob);
    posterPreview.src = url;
  });
});

// function resizeImage(file, w, h) {
//   return new Promise(resolve => {
//     const img = new Image();
//     const url = URL.createObjectURL(file);

//     img.onload = () => {
//       const canvas = document.createElement("canvas");
//       canvas.width = w;
//       canvas.height = h;

//       const ctx = canvas.getContext("2d");
//       ctx.imageSmoothingEnabled = true;
//       ctx.imageSmoothingQuality = "high";

//       const scale = Math.max(w / img.width, h / img.height);
//       const x = (w - img.width * scale) / 2;
//       const y = (h - img.height * scale) / 2;

//       ctx.drawImage(img, x, y, img.width * scale, img.height * scale);

//       canvas.toBlob(blob => resolve(blob), "image/jpeg", 0.95);
//       URL.revokeObjectURL(url);
//     };

//     img.src = url;
//   });
// }