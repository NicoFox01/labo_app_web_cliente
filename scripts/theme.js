(function () {
  const savedTheme = localStorage.getItem("theme") || "light";
  document.documentElement.setAttribute("data-bs-theme", savedTheme);
  updateThemeIcons(savedTheme);
})();

function toggleTheme() {
  const html = document.documentElement;
  const currentTheme = html.getAttribute("data-bs-theme") || "light";
  const newTheme = currentTheme === "dark" ? "light" : "dark";

  html.setAttribute("data-bs-theme", newTheme);
  localStorage.setItem("theme", newTheme);
  updateThemeIcons(newTheme);
}

function updateThemeIcons(theme) {
  const themeButtons = document.querySelectorAll(".theme-toggle i");

  themeButtons.forEach((icon) => {
    icon.className = theme === "dark" ? "bi bi-sun-fill" : "bi bi-moon-fill";
  });
}