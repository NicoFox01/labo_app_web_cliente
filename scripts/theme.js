(function () {
  const savedTheme = localStorage.getItem("theme") || "light";
  document.documentElement.setAttribute("data-bs-theme", savedTheme);
  updateThemeIcons(savedTheme);
  updateLogo(savedTheme);
})();

function toggleTheme() {
  const html = document.documentElement;
  const currentTheme = html.getAttribute("data-bs-theme") || "light";
  const newTheme = currentTheme === "dark" ? "light" : "dark";

  html.setAttribute("data-bs-theme", newTheme);
  localStorage.setItem("theme", newTheme);
  updateThemeIcons(newTheme);
  updateLogo(newTheme);
}

function updateThemeIcons(theme) {
  const themeButtons = document.querySelectorAll(".theme-toggle i");

  themeButtons.forEach((icon) => {
    icon.className = theme === "dark" ? "bi bi-sun-fill" : "bi bi-moon-fill";
  });
}

function updateLogo(theme) {
  const logo = document.querySelector(".logo-img, #logo");
  if (logo) {
    logo.src = theme === "dark" ? "images/logo_istea_nocturno.png" : "images/istea_logo.png";
  }
}