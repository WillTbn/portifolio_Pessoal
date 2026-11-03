(function () {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const scrollBehavior = () => reducedMotion.matches ? "auto" : "smooth";
  const year = document.getElementById("year");
  if (year) year.textContent = "Jorge Nunes - " + new Date().getFullYear();

  const backToTop = document.getElementById("backToTop");
  if (backToTop) {
    backToTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: scrollBehavior() });
    });
  }

  const menuButton = document.querySelector(".menu-toggle");
  const menu = document.getElementById("menu-principal");
  if (menuButton && menu) {
    menuButton.addEventListener("click", function () {
      const isOpen = menu.classList.toggle("open");
      menuButton.setAttribute("aria-expanded", String(isOpen));
      menuButton.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
    });

    menu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        menu.classList.remove("open");
        menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Abrir menu");
      });
    });

    document.addEventListener("click", function (event) {
      if (!menu.classList.contains("open")) return;
      if (menu.contains(event.target) || menuButton.contains(event.target)) return;
      menu.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Abrir menu");
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener("click", function (event) {
      const targetId = this.getAttribute("href");
      if (!targetId || targetId === "#") return;
      const section = document.querySelector(targetId);
      if (!section) return;
      event.preventDefault();
      section.scrollIntoView({ behavior: scrollBehavior(), block: "start" });
    });
  });

  const dialogs = document.querySelectorAll(".project-dialog");
  document.querySelectorAll("[data-open-dialog]").forEach(function (button) {
    button.addEventListener("click", function () {
      const id = this.getAttribute("data-open-dialog");
      const dialog = document.getElementById(id);
      if (dialog && typeof dialog.showModal === "function") {
        dialog.dataset.trigger = id;
        dialog.showModal();
      }
    });
  });

  dialogs.forEach(function (dialog) {
    dialog.querySelectorAll("[data-close-dialog]").forEach(function (closeBtn) {
      closeBtn.addEventListener("click", function () {
        dialog.close();
      });
    });

    dialog.addEventListener("click", function (event) {
      const rect = dialog.getBoundingClientRect();
      const clickedOutside =
        event.clientX < rect.left ||
        event.clientX > rect.right ||
        event.clientY < rect.top ||
        event.clientY > rect.bottom;

      if (clickedOutside) dialog.close();
    });
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && menu && menu.classList.contains("open")) {
      menu.classList.remove("open");
      if (menuButton) menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Abrir menu");
    }
  });

})();
