import $ from "jquery";

window.onload = function toggleNav() {
  let body = document.body;
  let hamburger = document.getElementById("js_hamburger");

  hamburger?.addEventListener("click", function () {
    body.classList.toggle("nav__open");
    body.classList.toggle("noscroll");
  });

  $(".nav__list__item a[href]").on("click", function (event) {
    body.classList.toggle("nav__open");
  });
};
