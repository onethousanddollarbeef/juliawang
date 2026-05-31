const root = document.documentElement;
const toggle = document.querySelector(".theme-toggle");
const year = document.querySelector("#year");
const storedTheme = localStorage.getItem("theme");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

const setTheme = (theme) => {
  root.dataset.theme = theme;
  localStorage.setItem("theme", theme);
  toggle.textContent = theme === "dark" ? "Dark" : "Light";
};

setTheme(storedTheme || (prefersDark ? "dark" : "light"));

toggle.addEventListener("click", () => {
  setTheme(root.dataset.theme === "dark" ? "light" : "dark");
});

year.textContent = new Date().getFullYear();
