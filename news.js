(function () {
  "use strict";

  var listEl    = document.getElementById("news-list");
  var updatedEl = document.getElementById("news-updated");

  function escapeHtml(str) {
    var div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }

  function render(data) {
    if (updatedEl && data.updated_at) {
      updatedEl.textContent = "最後更新：" + data.updated_at + "（每 3 天自動更新一次）";
    }

    if (!data.items || !data.items.length) {
      listEl.innerHTML = '<p class="news-loading">目前沒有新聞資料。</p>';
      return;
    }

    var html = data.items.map(function (item) {
      return (
        '<article class="news-card">' +
          '<span class="news-date">' + escapeHtml(item.date || "") + '</span>' +
          '<h3 class="news-title">' + escapeHtml(item.title || "") + '</h3>' +
          '<p class="news-summary">' + escapeHtml(item.summary || "") + '</p>' +
          '<a class="news-source" href="' + escapeHtml(item.url || "#") +
            '" target="_blank" rel="noopener noreferrer">來源：' +
            escapeHtml(item.source || "未知") + ' →</a>' +
        '</article>'
      );
    }).join("");

    listEl.innerHTML = html;
  }

  fetch("news.json", { cache: "no-store" })
    .then(function (res) {
      if (!res.ok) throw new Error("news.json fetch failed: " + res.status);
      return res.json();
    })
    .then(render)
    .catch(function (err) {
      listEl.innerHTML = '<p class="news-loading">新聞暫時無法載入，請稍後再試。</p>';
      console.error(err);
    });
})();
