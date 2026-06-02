const root = document.documentElement;
const toggle = document.querySelector(".theme-toggle");
const year = document.querySelector("#year");
const storedTheme = localStorage.getItem("theme");

const setTheme = (theme) => {
  root.dataset.theme = theme;
  localStorage.setItem("theme", theme);
  toggle.textContent = theme === "dark" ? "Dark" : "Light";
};

setTheme(storedTheme || "light");

toggle.addEventListener("click", () => {
  setTheme(root.dataset.theme === "dark" ? "light" : "dark");
});

year.textContent = new Date().getFullYear();
