
// =====================================
// DXXX MEHENDI ART - WEBSITE SETTINGS
// =====================================

const SITE_CONFIG = {
  whatsappNumber: "919723259009",
  instagram: "https://www.instagram.com/dimpal.mehendiart?lqvp=OGZiOGtscGJzcXgz",
  youtube: "https://youtube.com/@dimpalmehendiart?si=_AzLCuCr1iPIEwoN",
  googleMaps: "https://maps.app.goo.gl/9gFsiEkBqvrZoYGX6",
  email: "dimpalmehendiart@gmail.com"
};


// =====================================
// GALLERY PHOTOS - ALL 36 ORIGINALS
// =====================================

const photos = [
  "IMG-20261113-WA0113.jpg",
  "IMG-20261111-WA0014.jpg",
  "IMG-20261111-WA0015.jpg",
  "IMG-20261113-WA0008.jpg",
  "IMG-20261113-WA0009.jpg",
  "IMG-20261113-WA0010.jpg",
  "IMG-20261113-WA0011.jpg",
  "IMG-20261113-WA0013.jpg",
  "IMG-20261113-WA0053.jpg",
  "IMG-20261113-WA0091.jpg",
  "IMG-20261113-WA0093.jpg",
  "IMG-20261113-WA0094.jpg",
  "IMG-20261113-WA0095.jpg",
  "IMG-20261113-WA0098.jpg",
  "IMG-20261113-WA0105.jpg",
  "IMG-20261113-WA0106.jpg",
  "IMG-20261113-WA0107.jpg",
  "IMG-20261113-WA0108.jpg",
  "IMG-20261113-WA0112.jpg",
  "IMG-20261111-WA0008.jpg",
  "IMG-20261113-WA0114.jpg",
  "IMG-20261113-WA0115.jpg",
  "IMG-20261113-WA0116.jpg",
  "IMG-20261113-WA0118.jpg",
  "IMG-20261113-WA0119.jpg",
  "IMG-20261113-WA0121.jpg",
  "IMG_20261113_174830.jpg",
  "IMG_20261113_174932.jpg",
  "IMG-20261113-WA0125.jpg",
  "IMG-20261113-WA0127.jpg",
  "IMG_20261111_230341.jpg",
  "IMG_20261113_174829.jpg",
  "IMG-20261113-WA0122.jpg",
  "IMG_20261113_174831.jpg",
  "IMG_20261113_174832.jpg",
  "IMG-20261113-WA0124.jpg"
];


// =====================================
// CREATE GALLERY
// =====================================

const galleryGrid = document.getElementById("galleryGrid");

if (galleryGrid) {
  const fragment = document.createDocumentFragment();

  photos.forEach((photo, index) => {
    const button = document.createElement("button");

    button.className = "gallery-item";
    button.type = "button";
    button.setAttribute(
      "aria-label",
      `View mehendi design ${index + 1}`
    );

    const img = document.createElement("img");

    img.src = `images/${photo}`;
    img.alt = `Mehendi design ${index + 1}`;
    img.loading = "lazy";
    img.decoding = "async";

    // Keep gallery images lazy-loaded.
    // Lightbox will always use the original JPG.
    img.addEventListener("error", () => {
      button.classList.add("image-error");
      button.title = `Image not found: ${photo}`;
      button.style.background = "#d9d2c4";
      img.style.display = "none";
    });

    button.appendChild(img);

    button.addEventListener("click", () => {
      openLightbox(index);
    });

    fragment.appendChild(button);
  });

  galleryGrid.appendChild(fragment);
}


// =====================================
// GALLERY LIGHTBOX
// =====================================

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxCount = document.getElementById("lightboxCount");

const closeButton = document.getElementById("lightboxClose");
const previousButton = document.getElementById("lightboxPrev");
const nextButton = document.getElementById("lightboxNext");

let currentPhoto = 0;

function openLightbox(index) {
  if (!lightbox) return;

  currentPhoto = index;
  showLightboxPhoto();

  lightbox.classList.add("open");
  lightbox.setAttribute("aria-hidden", "false");

  document.body.style.overflow = "hidden";
}

function showLightboxPhoto() {
  if (!lightboxImage || !lightboxCount) return;

  // Original, full-quality JPG for the lightbox.
  lightboxImage.src = `images/${photos[currentPhoto]}`;
  lightboxImage.alt = `Mehendi design ${currentPhoto + 1}`;

  lightboxCount.textContent =
    `${currentPhoto + 1} / ${photos.length}`;
}

function closeLightbox() {
  if (!lightbox) return;

  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");

  document.body.style.overflow = "";
}

function showNextPhoto() {
  currentPhoto = (currentPhoto + 1) % photos.length;
  showLightboxPhoto();
}

function showPreviousPhoto() {
  currentPhoto =
    (currentPhoto - 1 + photos.length) % photos.length;

  showLightboxPhoto();
}

if (closeButton) {
  closeButton.addEventListener("click", closeLightbox);
}

if (nextButton) {
  nextButton.addEventListener("click", showNextPhoto);
}

if (previousButton) {
  previousButton.addEventListener("click", showPreviousPhoto);
}

if (lightbox) {
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });

  // Swipe support for phones
  let touchStartX = 0;

  lightbox.addEventListener("touchstart", (event) => {
    touchStartX = event.changedTouches[0].screenX;
  }, { passive: true });

  lightbox.addEventListener("touchend", (event) => {
    const touchEndX = event.changedTouches[0].screenX;
    const distance = touchEndX - touchStartX;

    if (Math.abs(distance) < 45) return;

    if (distance < 0) {
      showNextPhoto();
    } else {
      showPreviousPhoto();
    }
  }, { passive: true });
}

document.addEventListener("keydown", (event) => {
  if (!lightbox || !lightbox.classList.contains("open")) return;

  if (event.key === "Escape") closeLightbox();
  if (event.key === "ArrowRight") showNextPhoto();
  if (event.key === "ArrowLeft") showPreviousPhoto();
});


// =====================================
// HEADER — APPEAR WHEN ABOUT ENTERS
// =====================================

const navbar = document.getElementById("navbar");
const storySection = document.getElementById("story");

function updateHeader() {
  if (!navbar || !storySection) return;

  const storyTop = storySection.getBoundingClientRect().top;
  const shouldShow = storyTop < window.innerHeight - 1;

  navbar.classList.toggle("nav-visible", shouldShow);
  navbar.classList.toggle("scrolled", shouldShow);
}

window.addEventListener("scroll", updateHeader, { passive: true });
window.addEventListener("resize", updateHeader);

updateHeader();


// =====================================
// GALLERY — DECORATIVE EDGE VINES
// =====================================

(function createGalleryVines() {
  const gallerySection = document.getElementById("gallery");
  if (!gallerySection) return;

  const VINE_COUNT = 6;
  const RANGE_START = 0.12;
  const RANGE_END = 0.88;
  const EDGE_INSET = -6;
  const SVG_NS = "http://www.w3.org/2000/svg";

  const ART = { w: 260, h: 520, rootX: 20, rootY: 510 };

  const rand = (min, max) => min + Math.random() * (max - min);

  const slot = (RANGE_END - RANGE_START) / VINE_COUNT;
  const firstSide = Math.random() < 0.5 ? 0 : 1;

  const vines = Array.from({ length: VINE_COUNT }, (_, i) => {
    const size = Math.random();

    const spec = {
      isLeft: (i + firstSide) % 2 === 0,
      y: RANGE_START + (i + rand(0.15, 0.85)) * slot,
      size,
      angle: rand(15, 55),
      opacity: 0.2 + (size * 0.6 + Math.random() * 0.4) * 0.3,
      sway: rand(5.5, 8.5)
    };

    const svg = document.createElementNS(SVG_NS, "svg");

    svg.setAttribute(
      "class",
      `vine gallery-vine ${spec.isLeft ? "gallery-vine-left" : "gallery-vine-right"}`
    );

    svg.setAttribute("viewBox", `0 0 ${ART.w} ${ART.h}`);
    svg.setAttribute("aria-hidden", "true");

    const use = document.createElementNS(SVG_NS, "use");
    use.setAttribute("href", "#vine-art");
    svg.appendChild(use);

    svg.style.setProperty("--vine-opacity", spec.opacity.toFixed(2));
    svg.style.setProperty("--vine-sway", `${spec.sway.toFixed(1)}s`);

    gallerySection.appendChild(svg);

    return { svg, spec };
  });

  let lastScale = 0;

  function layoutVines() {
    const vw = window.innerWidth;
    const scale = vw <= 600 ? 0.7 : vw <= 900 ? 0.85 : 1;

    if (scale === lastScale) return;
    lastScale = scale;

    vines.forEach(({ svg, spec }) => {
      const width = (260 + spec.size * 230) * scale;
      const height = width * 2;
      const s = width / ART.w;

      const flip = spec.isLeft ? 1 : -1;
      const deg = spec.isLeft ? spec.angle : -spec.angle;
      const rad = deg * Math.PI / 180;

      const rootX = flip * (ART.rootX - ART.w / 2);
      const rootY = ART.rootY - ART.h / 2;

      const dx =
        (rootX * Math.cos(rad) - rootY * Math.sin(rad)) * s;

      const dy =
        (rootX * Math.sin(rad) + rootY * Math.cos(rad)) * s;

      const edge = -flip * dx + EDGE_INSET - width / 2;

      svg.style.setProperty("--vine-w", `${width.toFixed(1)}px`);
      svg.style.setProperty("--vine-edge", `${edge.toFixed(1)}px`);

      svg.style.setProperty(
        "--vine-top",
        `calc(${(spec.y * 100).toFixed(2)}% - ${(dy + height / 2).toFixed(1)}px)`
      );

      svg.style.setProperty("--vine-rot", `${deg.toFixed(1)}deg`);
      svg.style.setProperty("--vine-flip", String(flip));
    });
  }

  layoutVines();
  window.addEventListener("resize", layoutVines, { passive: true });
})();


// =====================================
// BOTANICAL VINES — DRAW AND RETRACT
// =====================================

const vineElements = document.querySelectorAll(".vine");

if ("IntersectionObserver" in window) {
  const vineObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      } else {
        entry.target.classList.remove("is-visible");
      }
    });
  }, {
    threshold: 0.05,
    rootMargin: "0px 0px -8% 0px"
  });

  vineElements.forEach((vine) => {
    vineObserver.observe(vine);
  });
} else {
  vineElements.forEach((vine) => {
    vine.classList.add("is-visible");
  });
}


// =====================================
// CONTACT LINKS
// =====================================

function setLink(id, url) {
  const element = document.getElementById(id);

  if (!element || !url || url.startsWith("PASTE_")) {
    return;
  }

  element.href = url;
}

setLink("instagramLink", SITE_CONFIG.instagram);
setLink("youtubeLink", SITE_CONFIG.youtube);
setLink("mapsLink", SITE_CONFIG.googleMaps);

const emailLink = document.getElementById("emailLink");

if (
  SITE_CONFIG.email &&
  SITE_CONFIG.email !== "YOUR_BUSINESS_EMAIL"
) {
  setLink("emailLink", `mailto:${SITE_CONFIG.email}`);
} else if (emailLink) {
  emailLink.style.display = "none";
}


// =====================================
// WHATSAPP BUTTON
// =====================================

const whatsappLink = document.getElementById("whatsappLink");

if (whatsappLink) {
  const number = SITE_CONFIG.whatsappNumber;

  if (number && !number.includes("X")) {
    const message = encodeURIComponent(
      "Hello! I would like to enquire about mehendi booking."
    );

    whatsappLink.href =
      `https://wa.me/${number}?text=${message}`;

    whatsappLink.style.display = "flex";
  } else {
    whatsappLink.style.display = "none";
  }
}


// =====================================
// AUTOMATIC COPYRIGHT YEAR
// =====================================

const yearElement = document.getElementById("year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}


// =====================================
// BOOKING DATE — PREVENT PAST DATES
// =====================================

const eventDate = document.getElementById("date");

if (eventDate) {
  const today = new Date();

  const localDate = new Date(
    today.getTime() - today.getTimezoneOffset() * 60000
  ).toISOString().split("T")[0];

  eventDate.min = localDate;
}


// =====================================
// HAMBURGER MENU
// =====================================

const menuToggle = document.getElementById("menuToggle");
const menuPanel = document.getElementById("menuPanel");

if (menuToggle && menuPanel) {
  function closeMenu() {
    menuToggle.classList.remove("active");
    menuPanel.classList.remove("open");

    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
  }

  menuToggle.addEventListener("click", () => {
    const isOpen = menuPanel.classList.toggle("open");

    menuToggle.classList.toggle("active", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));

    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Close navigation menu" : "Open navigation menu"
    );
  });

  menuPanel.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("click", (event) => {
    if (
      !menuPanel.contains(event.target) &&
      !menuToggle.contains(event.target)
    ) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });
}
