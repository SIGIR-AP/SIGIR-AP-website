/**
 * SIGIR-AP 2026 client-side access gate (not secure; use server-side auth in production).
 * Set your key below:
 */
var SIGIR_AP_2026_ACCESS_KEY = "sigir-ap";

(function () {
  var STORAGE_KEY = "sigir_ap_2026_access_granted";
  var expected = String(SIGIR_AP_2026_ACCESS_KEY || "").trim();

  function granted() {
    try {
      return sessionStorage.getItem(STORAGE_KEY) === "1";
    } catch (e) {
      return false;
    }
  }

  function setGranted() {
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch (e) {}
  }

  function buildOverlay() {
    var root = document.createElement("div");
    root.id = "sigir-ap-2026-access-overlay";
    root.setAttribute(
      "style",
      [
        "position:fixed",
        "inset:0",
        "z-index:2147483647",
        "background:rgba(15,23,42,0.92)",
        "display:flex",
        "align-items:center",
        "justify-content:center",
        "padding:24px",
        "box-sizing:border-box",
        "font-family:system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif",
      ].join(";")
    );

    var card = document.createElement("div");
    card.setAttribute(
      "style",
      [
        "width:100%",
        "max-width:420px",
        "background:#fff",
        "border-radius:10px",
        "box-shadow:0 20px 50px rgba(0,0,0,0.35)",
        "padding:28px 24px",
        "box-sizing:border-box",
      ].join(";")
    );

    var title = document.createElement("div");
    title.textContent = "SIGIR-AP 2026";
    title.setAttribute("style", "font-size:20px;font-weight:700;color:#111827;margin:0 0 8px 0;");

    var sub = document.createElement("div");
    sub.textContent = "This area is protected. Enter the access key to continue.";
    sub.setAttribute("style", "font-size:14px;color:#4b5563;line-height:1.5;margin:0 0 18px 0;");

    var err = document.createElement("div");
    err.setAttribute("style", "min-height:20px;font-size:13px;color:#b91c1c;margin:0 0 10px 0;");

    var row = document.createElement("div");
    row.setAttribute("style", "display:flex;gap:10px;flex-wrap:wrap;");

    var input = document.createElement("input");
    input.type = "password";
    input.autocomplete = "off";
    input.placeholder = "Access key";
    input.setAttribute(
      "style",
      [
        "flex:1 1 200px",
        "min-width:0",
        "padding:10px 12px",
        "font-size:15px",
        "border:1px solid #d1d5db",
        "border-radius:6px",
        "outline:none",
      ].join(";")
    );

    var btn = document.createElement("button");
    btn.type = "button";
    btn.textContent = "Continue";
    btn.setAttribute(
      "style",
      [
        "padding:10px 18px",
        "font-size:15px",
        "border:none",
        "border-radius:6px",
        "background:#2563eb",
        "color:#fff",
        "cursor:pointer",
        "font-weight:600",
      ].join(";")
    );

    function tryUnlock() {
      err.textContent = "";
      var v = String(input.value || "").trim();
      if (!expected) {
        err.textContent =
          "No key configured: set SIGIR_AP_2026_ACCESS_KEY in assets/js/access-gate-2026.js.";
        return;
      }
      if (v === expected) {
        setGranted();
        root.remove();
        document.documentElement.style.overflow = "";
        document.body.style.overflow = "";
      } else {
        err.textContent = "Incorrect key. Please try again.";
        input.value = "";
        input.focus();
      }
    }

    btn.addEventListener("click", tryUnlock);
    input.addEventListener("keydown", function (e) {
      if (e.key === "Enter") tryUnlock();
    });

    row.appendChild(input);
    row.appendChild(btn);

    card.appendChild(title);
    card.appendChild(sub);
    card.appendChild(err);
    card.appendChild(row);
    root.appendChild(card);

    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    document.body.appendChild(root);
    input.focus();
  }

  if (granted()) return;
  if (!expected) {
    buildOverlay();
    return;
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", buildOverlay);
  } else {
    buildOverlay();
  }
})();
