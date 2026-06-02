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

const subjectTabs = document.querySelectorAll("[data-course-subject-filter]");
const semesterTabs = document.querySelectorAll("[data-course-semester-filter]");
const courseItems = document.querySelectorAll("[data-course-subject][data-course-semester]");
const courseEmpty = document.querySelector(".course-empty");

let selectedSubject = "all";

const setPressedState = (buttons, activePredicate) => {
  buttons.forEach((button) => {
    const isActive = activePredicate(button);
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
};

const getSelectedSemesters = () =>
  [...semesterTabs]
    .filter((tab) => tab.dataset.courseSemesterFilter !== "all" && tab.classList.contains("is-active"))
    .map((tab) => tab.dataset.courseSemesterFilter);

const syncCourseworkFilters = () => {
  const selectedSemesters = getSelectedSemesters();
  const showAllSemesters = selectedSemesters.length === 0;
  let visibleCount = 0;

  courseItems.forEach((item) => {
    const subjectMatches = selectedSubject === "all" || item.dataset.courseSubject === selectedSubject;
    const semesterMatches = showAllSemesters || selectedSemesters.includes(item.dataset.courseSemester);
    const shouldShow = subjectMatches && semesterMatches;

    item.hidden = !shouldShow;
    if (shouldShow) {
      visibleCount += 1;
    }
  });

  if (courseEmpty) {
    courseEmpty.hidden = visibleCount > 0;
  }
};

subjectTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    selectedSubject = tab.dataset.courseSubjectFilter;
    setPressedState(subjectTabs, (button) => button === tab);
    syncCourseworkFilters();
  });
});

semesterTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const semester = tab.dataset.courseSemesterFilter;

    if (semester === "all") {
      setPressedState(semesterTabs, (button) => button.dataset.courseSemesterFilter === "all");
    } else {
      const allTab = [...semesterTabs].find((button) => button.dataset.courseSemesterFilter === "all");
      if (allTab) {
        allTab.classList.remove("is-active");
        allTab.setAttribute("aria-pressed", "false");
      }

      const willBeActive = !tab.classList.contains("is-active");
      tab.classList.toggle("is-active", willBeActive);
      tab.setAttribute("aria-pressed", String(willBeActive));

      if (getSelectedSemesters().length === 0 && allTab) {
        allTab.classList.add("is-active");
        allTab.setAttribute("aria-pressed", "true");
      }
    }

    syncCourseworkFilters();
  });
});

syncCourseworkFilters();
