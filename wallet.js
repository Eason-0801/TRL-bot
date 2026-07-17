(function () {
  "use strict";

  var ADDRESSES = {
    bsc: {
      usdt: "0x754a3D1796EF3B1f991cFb1FB4B7140F0F0a49Ce",
      usdc: "0x754a3D1796EF3B1f991cFb1FB4B7140F0F0a49Ce",
    },
    erc20: {
      usdt: "0x754a3D1796EF3B1f991cFb1FB4B7140F0F0a49Ce",
      usdc: "0x754a3D1796EF3B1f991cFb1FB4B7140F0F0a49Ce",
    },
    trc20: {
      usdt: "TLCxxnsomS2hZAt9aVKApwMC7XLKdtJeBm",
      usdc: "TLCxxnsomS2hZAt9aVKApwMC7XLKdtJeBm",
    },
  };

  var EXPLORERS = {
    bsc:   "https://bscscan.com/",
    erc20: "https://etherscan.io/",
    trc20: "https://tronscan.org/#/",
  };

  var select       = document.getElementById("network-select");
  var addressEl    = document.getElementById("wallet-address");
  var labelEl      = document.getElementById("address-label");
  var copyBtn      = document.getElementById("copy-address-btn");
  var statusEl     = document.getElementById("copy-status");
  var tokenBtns    = document.querySelectorAll(".token-btn");
  var explorerLink = document.getElementById("explorer-link");

  var currentToken = "usdt";

  function render() {
    var entry = ADDRESSES[select.value] || {};
    addressEl.textContent = entry[currentToken] || "";
    if (labelEl) labelEl.textContent = "收款地址 " + currentToken.toUpperCase();
    if (explorerLink) explorerLink.href = EXPLORERS[select.value] || "#";
    statusEl.textContent = "";
  }

  function selectToken(token) {
    currentToken = token;
    tokenBtns.forEach(function (btn) {
      btn.classList.toggle("active", btn.getAttribute("data-token") === token);
    });
    render();
  }

  function fallbackCopy(text) {
    var ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.focus();
    ta.select();
    var ok = false;
    try { ok = document.execCommand("copy"); } catch (e) { ok = false; }
    document.body.removeChild(ta);
    return ok;
  }

  function copyAddress() {
    var addr = addressEl.textContent;
    if (!addr) return;

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(addr).then(function () {
        statusEl.textContent = "✅ 已複製到剪貼簿";
      }).catch(function () {
        statusEl.textContent = fallbackCopy(addr)
          ? "✅ 已複製到剪貼簿"
          : "複製失敗，請手動選取複製";
      });
    } else {
      statusEl.textContent = fallbackCopy(addr)
        ? "✅ 已複製到剪貼簿"
        : "複製失敗，請手動選取複製";
    }
  }

  select.addEventListener("change", render);
  copyBtn.addEventListener("click", copyAddress);
  tokenBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      selectToken(btn.getAttribute("data-token"));
    });
  });

  render();

  // 方案選擇卡片 — 選取後同步顯示方案名稱與應付金額，方便客戶跟客服核對
  var planCards = document.querySelectorAll(".plan-card");
  var planSummaryEl = document.getElementById("selected-plan-text");

  function updatePlanSummary(card) {
    if (!planSummaryEl) return;
    var h3 = card.querySelector("h3");
    var badge = h3.querySelector(".plan-badge");
    var name = badge ? h3.firstChild.textContent.trim() : h3.textContent;
    var priceEl = card.querySelector(".plan-price-sale");
    var price = priceEl ? priceEl.textContent : "";
    planSummaryEl.textContent = "方案：" + name + "　應付金額：" + price;
    planSummaryEl.classList.remove("plan-summary-empty");
  }

  planCards.forEach(function (card) {
    card.addEventListener("click", function () {
      planCards.forEach(function (c) { c.classList.remove("selected"); });
      card.classList.add("selected");
      updatePlanSummary(card);
    });
  });
})();
