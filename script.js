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

const courseTabs = document.querySelectorAll("[data-course-tab]");
const coursePanels = document.querySelectorAll("[data-course-panel]");

courseTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const selectedSemester = tab.dataset.courseTab;

    courseTabs.forEach((currentTab) => {
      const isSelected = currentTab === tab;
      currentTab.classList.toggle("is-active", isSelected);
      currentTab.setAttribute("aria-selected", String(isSelected));
    });

    coursePanels.forEach((panel) => {
      panel.hidden = panel.dataset.coursePanel !== selectedSemester;
    });
  });
});
