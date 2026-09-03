document.addEventListener("DOMContentLoaded", () => {
  const PAGE_SIZE = 7;
  const list = document.getElementById("announcement-list");
  const pagination = document.getElementById("pagination");
  const emptyMsg = document.getElementById("announcement-empty");
  const tabs = document.querySelectorAll(".event-tab");
  if (!list || !pagination) return;

  const allCards = Array.from(list.children);
  let visibleCards = [];

  function showPage(page, scroll) {
    visibleCards.forEach((card, i) => {
      card.style.display = Math.floor(i / PAGE_SIZE) === page - 1 ? "" : "none";
    });
    Array.from(pagination.children).forEach((btn, i) => {
      btn.classList.toggle("active", i === page - 1);
    });
    if (scroll) {
      list.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  function buildPagination() {
    pagination.innerHTML = "";
    const pageCount = Math.ceil(visibleCards.length / PAGE_SIZE);
    if (pageCount <= 1) return;
    for (let p = 1; p <= pageCount; p++) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "pagination-btn";
      btn.textContent = String(p);
      btn.addEventListener("click", () => showPage(p, true));
      pagination.appendChild(btn);
    }
  }

  function applyFilter(filter) {
    allCards.forEach((card) => { card.style.display = "none"; });
    visibleCards = allCards.filter((card) => card.dataset.type === filter);

    if (emptyMsg) emptyMsg.hidden = visibleCards.length > 0;

    buildPagination();
    showPage(1, false);
  }

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      if (tab.classList.contains("active")) return;
      tabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");
      applyFilter(tab.dataset.filter);
    });
  });

  const initialTab = document.querySelector(".event-tab.active");
  applyFilter(initialTab ? initialTab.dataset.filter : "event");
});
