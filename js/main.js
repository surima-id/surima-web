document.addEventListener("DOMContentLoaded", function () {
  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav-links");
  if (!toggle || !links) return;

  toggle.addEventListener("click", function () {
    var isOpen = links.classList.toggle("open");
    toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  links.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      links.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  var zoomables = document.querySelectorAll("img.zoomable");
  if (!zoomables.length) return;

  var overlay = document.createElement("div");
  overlay.className = "lightbox-overlay";

  var closeBtn = document.createElement("button");
  closeBtn.className = "lightbox-close";
  closeBtn.setAttribute("aria-label", "Tutup");
  closeBtn.textContent = "×";

  var overlayImg = document.createElement("img");

  overlay.appendChild(closeBtn);
  overlay.appendChild(overlayImg);
  document.body.appendChild(overlay);

  function close() {
    overlay.classList.remove("open");
    document.body.classList.remove("lightbox-open");
  }

  zoomables.forEach(function (img) {
    img.addEventListener("click", function () {
      overlayImg.src = img.src;
      overlayImg.alt = img.alt;
      overlay.classList.add("open");
      document.body.classList.add("lightbox-open");
      overlay.scrollTop = 0;
      overlay.scrollLeft = 0;
    });
  });

  overlay.addEventListener("click", close);
  closeBtn.addEventListener("click", close);
  overlayImg.addEventListener("click", function (e) { e.stopPropagation(); });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") close();
  });
});
