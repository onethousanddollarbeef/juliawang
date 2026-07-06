const lightbox = document.querySelector("#lightbox");
const lightboxImage = document.querySelector("#lightbox-image");
const lightboxCaption = document.querySelector("#lightbox-caption");
const closeButton = document.querySelector(".lightbox-close");

document.querySelectorAll(".gallery-trigger").forEach((trigger) => {
  trigger.addEventListener("click", () => {
    lightboxImage.src = trigger.dataset.full;
    lightboxImage.alt = trigger.dataset.caption;
    lightboxCaption.textContent = trigger.dataset.caption;
    lightbox.showModal();
  });
});

closeButton.addEventListener("click", () => lightbox.close());

lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    lightbox.close();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && lightbox.open) {
    lightbox.close();
  }
});
