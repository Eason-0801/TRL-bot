(function () {
  "use strict";

  var lightbox    = document.getElementById("lightbox");
  var lightboxImg = document.getElementById("lightbox-img");
  var closeBtn    = document.getElementById("lightbox-close");

  if (!lightbox) return;

  function open(src, alt) {
    lightboxImg.src = src;
    lightboxImg.alt = alt || "";
    lightbox.hidden = false;
  }

  function close() {
    lightbox.hidden = true;
    lightboxImg.src = "";
  }

  document.querySelectorAll(".gallery-thumb").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var img = btn.querySelector("img");
      open(btn.getAttribute("data-full"), img ? img.alt : "");
    });
  });

  closeBtn.addEventListener("click", close);
  lightbox.addEventListener("click", function (e) {
    if (e.target === lightbox) close();
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") close();
  });
})();
