document.addEventListener("DOMContentLoaded", () => {
  const PAGE_SIZE = 7;
  const list = document.getElementById("announcement-list");
  const pagination = document.getElementById("pagination");
  if (!list || !pagination) return;

  const cards = Array.from(list.children);
  const pageCount = Math.ceil(cards.length / PAGE_SIZE);
  if (pageCount <= 1) return;

  function showPage(page, scroll) {
    cards.forEach((card, i) => {
      card.style.display = Math.floor(i / PAGE_SIZE) === page - 1 ? "" : "none";
    });
    Array.from(pagination.children).forEach((btn, i) => {
      btn.classList.toggle("active", i === page - 1);
    });
    if (scroll) {
      list.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  for (let p = 1; p <= pageCount; p++) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "pagination-btn";
    btn.textContent = String(p);
    btn.addEventListener("click", () => showPage(p, true));
    pagination.appendChild(btn);
  }

  showPage(1, false);
});
