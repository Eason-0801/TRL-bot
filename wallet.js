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

  var select    = document.getElementById("network-select");
  var addressEl = document.getElementById("wallet-address");
  var labelEl   = document.getElementById("address-label");
  var copyBtn   = document.getElementById("copy-address-btn");
  var statusEl  = document.getElementById("copy-status");
  var tokenBtns = document.querySelectorAll(".token-btn");

  var currentToken = "usdt";

  function render() {
    var entry = ADDRESSES[select.value] || {};
    addressEl.textContent = entry[currentToken] || "";
    if (labelEl) labelEl.textContent = "收款地址 " + currentToken.toUpperCase();
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
})();
