function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

function setupMasonry() {
  const grid = document.querySelector(".grid");
  if (!grid) return;

  const msnry = new Masonry(grid, {
    itemSelector: ".grid-item",
    columnWidth: ".grid-item",
    percentPosition: true,
  });

  imagesLoaded(grid, function () {
    msnry.layout();
  });
}

function setupGLightbox() {
  GLightbox({
    selector: ".glightbox",
    touchNavigation: true,
    loop: true,
    zoomable: true,
    draggable: true,
  });
}

function loadPage(url, btn = null) {
  const container = document.getElementById("container");

  // setting active button style
  if (btn) {
    document
      .querySelectorAll(".buttons button")
      .forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
  }

  // After fade-out completes, load content
  setTimeout(() => {
    fetch(url)
      .then((response) => response.text())
      .then((html) => {
        // Fade in
        container.classList.remove("fade-in"); // reset class
        void container.offsetWidth; // trigger reflow
        container.innerHTML = html;
        container.classList.add("fade-in");

        // Re-initialize any scripts or plugins
        setupMasonry();
        setupGLightbox();
      })
      .catch((error) => {
        console.error("Error loading page:", error);
      });
  }, 0); // match transition duration
}

// window.addEventListener("DOMContentLoaded", () => {
//   loadPage("gallery_designs.html");
// });
