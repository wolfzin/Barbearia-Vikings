/* =============================================================
   BARBEARIA VIKINGS — script.js
   Sem dependências. Fácil de editar: ajuste o bloco CONFIG abaixo.
   ============================================================= */
(function () {
  "use strict";

  /* ---------- CONFIG (edite aqui) ---------- */
  var CONFIG = {
    phone: "5541998961962", // WhatsApp com DDI+DDD, só números
    message: "Olá! Gostaria de agendar um horário na Barbearia Vikings.",
    mapsQuery: "Barbearia Vikings, Av. Piçarras, 1276 - Guaratuba - PR, 83280-000"
  };

  var waLink = "https://wa.me/" + CONFIG.phone + "?text=" + encodeURIComponent(CONFIG.message);
  var mapsLink = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(CONFIG.mapsQuery);

  /* ---------- Aplica links dinâmicos ---------- */
  document.querySelectorAll(".js-wa").forEach(function (el) {
    el.setAttribute("href", waLink);
    el.setAttribute("target", "_blank");
  });
  var mapsBtn = document.getElementById("mapsBtn");
  if (mapsBtn) mapsBtn.setAttribute("href", mapsLink);

  /* ---------- Ano no rodapé ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Header ao rolar ---------- */
  var header = document.querySelector(".header");
  function onScroll() {
    if (window.scrollY > 24) header.classList.add("scrolled");
    else header.classList.remove("scrolled");
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Menu mobile ---------- */
  var burger = document.getElementById("burger");
  var menu = document.getElementById("mobileMenu");

  function openMenu() {
    menu.classList.add("open");
    burger.setAttribute("aria-expanded", "true");
    burger.setAttribute("aria-label", "Fechar menu");
    document.body.style.overflow = "hidden";
  }
  function closeMenu() {
    menu.classList.remove("open");
    burger.setAttribute("aria-expanded", "false");
    burger.setAttribute("aria-label", "Abrir menu");
    document.body.style.overflow = "";
  }
  if (burger && menu) {
    burger.addEventListener("click", function () {
      if (menu.classList.contains("open")) closeMenu();
      else openMenu();
    });
    // fecha ao clicar em qualquer link do menu
    menu.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", closeMenu);
    });
    // fecha com ESC
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && menu.classList.contains("open")) {
        closeMenu();
        burger.focus();
      }
    });
  }

  /* ---------- Reveal ao entrar na tela ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduce || !("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  } else {
    var io = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14, rootMargin: "0px 0px -8% 0px" });
    revealEls.forEach(function (el) { io.observe(el); });
  }
})();
