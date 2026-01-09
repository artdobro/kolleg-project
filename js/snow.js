// это снег, его не трожь
const snowContainer = document.getElementById("snow-container");

function createSnowflake() {
  const snowflake = document.createElement("div");
  snowflake.className = "snowflake";
  snowflake.textContent = "❄";

  const size = Math.random() * 14 + 10;
  const startX = Math.random() * window.innerWidth;
  const duration = Math.random() * 5 + 5;

  snowflake.style.left = startX + "px";
  snowflake.style.fontSize = size + "px";
  snowflake.style.animationTimingFunction = "ease-in-out";
  snowflake.style.animationDuration = duration + "s";

  snowContainer.appendChild(snowflake);

  setTimeout(() => {
    snowflake.remove();
  }, duration * 1000);
}


setInterval(createSnowflake, 150);
