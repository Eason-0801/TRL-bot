(function () {
  "use strict";

  // TODO: 換成真實收款地址（目前是占位字串，不要拿來轉帳）
  var ADDRESSES = {
    bsc:   "0xPLACEHOLDER00000000000000000000000000",
    erc20: "0xPLACEHOLDER00000000000000000000000000",
    trc20: "TPLACEHOLDER0000000000000000000000",
  };

  var select    = document.getElementById("network-select");
  var addressEl = document.getElementById("wallet-address");
  var copyBtn   = document.getElementById("copy-address-btn");
  var statusEl  = document.getElementById("copy-status");

  function render() {
    addressEl.textContent = ADDRESSES[select.value] || "";
    statusEl.textContent = "";
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

  render();
})();
