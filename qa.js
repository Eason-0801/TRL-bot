(function () {
  "use strict";

  document.querySelectorAll(".qa-question").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var item = btn.closest(".qa-item");
      item.classList.toggle("open");
    });
  });
})();
