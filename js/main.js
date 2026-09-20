const burger = document.getElementById("burger");
const nav = document.querySelector(".header__nav");

burger.addEventListener("click", () => {
  nav.classList.toggle("open");
});

document.querySelectorAll(".header__nav a").forEach((link) => {
  link.addEventListener("click", () => nav.classList.remove("open"));
});

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxClose = document.getElementById("lightboxClose");
const lightboxPrev = document.getElementById("lightboxPrev");
const lightboxNext = document.getElementById("lightboxNext");

let lightboxGroup = [];
let lightboxIndex = 0;

function openLightbox(img, group) {
  lightboxGroup = Array.prototype.slice.call(group || [img]);
  lightboxIndex = lightboxGroup.indexOf(img);
  if (lightboxIndex < 0) lightboxIndex = 0;
  updateLightbox();
  lightbox.classList.add("open");
  document.body.style.overflow = "hidden";
}

function updateLightbox() {
  const img = lightboxGroup[lightboxIndex];
  if (!img) return;
  lightboxImg.src = img.src;
  lightboxImg.alt = img.alt;
  if (lightboxPrev) lightboxPrev.style.visibility = lightboxGroup.length > 1 ? "visible" : "hidden";
  if (lightboxNext) lightboxNext.style.visibility = lightboxGroup.length > 1 ? "visible" : "hidden";
}

function stepLightbox(dir) {
  if (!lightboxGroup.length) return;
  lightboxIndex = (lightboxIndex + dir + lightboxGroup.length) % lightboxGroup.length;
  updateLightbox();
}

document.querySelectorAll(".work").forEach((work) => {
  const img = work.querySelector("img");
  if (!img) return;
  img.addEventListener("click", () => {
    const pop = work.closest(".project-pop") || work.closest(".portfolio");
    const group = pop ? pop.querySelectorAll(".work img") : [img];
    openLightbox(img, group);
  });
});

function closeLightbox() {
  lightbox.classList.remove("open");
  lightboxImg.src = "";
  lightboxGroup = [];
  document.body.style.overflow = "";
}

lightboxClose.addEventListener("click", closeLightbox);
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) closeLightbox();
});
if (lightboxPrev) lightboxPrev.addEventListener("click", (e) => {
  e.stopPropagation();
  stepLightbox(-1);
});
if (lightboxNext) lightboxNext.addEventListener("click", (e) => {
  e.stopPropagation();
  stepLightbox(1);
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeLightbox();
  if (e.key === "ArrowLeft") stepLightbox(-1);
  if (e.key === "ArrowRight") stepLightbox(1);
});

const projectCards = document.querySelectorAll(".project-card");
projectCards.forEach((card) => {
  card.addEventListener("click", () => {
    const targetId = card.getAttribute("data-open");
    const pop = document.getElementById(targetId);
    if (!pop) return;
    const alreadyOpen = pop.classList.contains("open");
    document.querySelectorAll(".project-pop.open").forEach((p) => {
      p.classList.remove("open");
    });
    if (!alreadyOpen) {
      pop.classList.add("open");
      pop.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  });
});

const revealEls = document.querySelectorAll("section, .card");
revealEls.forEach((el, i) => {
  el.classList.add("reveal");
  el.style.transitionDelay = (i % 3) * 0.06 + "s";
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

revealEls.forEach((el) => revealObserver.observe(el));

setTimeout(() => {
  document.querySelectorAll(".reveal").forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      el.classList.add("visible");
    }
  });
}, 600);

const PROJECTS = [
  {
    id: "pop-1",
    title: "Проект Кухня",
    city: "",
    type: "кухня",
    img: "img/works/Елена Федорцова/Проект Кухня/Подбор вариантов/Общий кадр.jpg",
    area: 0
  },
  {
    id: "pop-2",
    title: "Проект Тихий полдень, 71 квадратов, Екатеринбург",
    city: "Екатеринбург",
    type: "квартира, 71 м²",
    img: "img/works/Ксения Муравьева/Квартира 70 квадратов/1.1 Спальня.jpg",
    x: 217,
    y: 370,
    area: 71
  },
  {
    id: "pop-3",
    title: "Проект Итальянская вилла, 102 квадрата, Санкт-Петербург",
    city: "Санкт-Петербург",
    type: "двухуровневая квартира, 102 м²",
    img: "img/works/Мария Чернышова/Проект Итальянская вилла 102 квадрата, Санкт-Петербург/Спальня родителей.jpg",
    x: 95,
    y: 335,
    area: 102
  },
  {
    id: "pop-4",
    title: "Проект Скалистый утес, 103 квадрата, Санкт-Петербург",
    city: "Санкт-Петербург",
    type: "двухуровневая квартира, 103 м²",
    img: "img/works/Мария Чернышова/Проект Скалистый утес, 103 квадрата, Санкт-Петербург/1.jpg",
    x: 105,
    y: 325,
    area: 103
  },
  {
    id: "pop-5",
    title: "Проект Мягкий Ритм, 40 квадратов, Москва",
    city: "Москва",
    type: "квартира, 40 м²",
    img: "img/works/Ксения Фадеева/Проект Мягкий Ритм, 40 квадратов, Москва/3. Кухня.jpg",
    x: 128.5,
    y: 384.6,
    area: 40
  },
  {
    id: "pop-6",
    title: "Проект Тихая роскошь, 27 квадратов, Санкт-Петербург",
    city: "Санкт-Петербург",
    type: "квартира, 27 м²",
    img: "img/works/Мария Чернышова/Проект Тихая роскошь, 27 квадратов, Санкт-Петербург/1.0 Спальня.jpg",
    x: 98,
    y: 332,
    area: 27
  },
  {
    id: "pop-7",
    title: "Монохром в голубых тонах",
    city: "",
    type: "квартира, 32 м²",
    img: "img/works/Монохром в голубых тонах, 32 квадрата/close_up.jpg",
    area: 32
  }
];

function openProject(targetId) {
  const pop = document.getElementById(targetId);
  if (!pop) return;
  const alreadyOpen = pop.classList.contains("open");
  document.querySelectorAll(".project-pop.open").forEach((p) => {
    p.classList.remove("open");
  });
  if (!alreadyOpen) {
    pop.classList.add("open");
    pop.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }
}

function animateCountTo(el, target, onTick) {
  if (!el) return Promise.resolve();
  const duration = 900;
  const start = performance.now();
  return new Promise((resolve) => {
    function tick(now) {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      const val = Math.round(eased * target);
      el.textContent = val;
      if (onTick) onTick(val);
      if (t < 1) {
        requestAnimationFrame(tick);
      } else {
        el.textContent = target;
        if (onTick) onTick(target);
        resolve();
      }
    }
    requestAnimationFrame(tick);
  });
}

function pluralRu(n, one, few, many) {
  const n10 = n % 10;
  const n100 = n % 100;
  if (n10 === 1 && n100 !== 11) return one;
  if (n10 >= 2 && n10 <= 4 && (n100 < 12 || n100 > 14)) return few;
  return many;
}

function animateProjectCount() {
  const cityNames = new Set();
  let totalArea = 0;
  PROJECTS.forEach((p) => {
    if (p.city && p.city.trim()) cityNames.add(p.city);
    if (p.area) totalArea += p.area;
  });

  const projectsEl = document.getElementById("statsProjects");
  const projectsLabel = document.getElementById("statsProjectsLabel");
  const citiesEl = document.getElementById("statsCities");
  const citiesLabel = document.getElementById("statsCitiesLabel");

  animateCountTo(projectsEl, PROJECTS.length, (v) => {
    if (projectsLabel) projectsLabel.textContent = pluralRu(v, "проект", "проекта", "проектов");
  });
  animateCountTo(citiesEl, cityNames.size, (v) => {
    if (citiesLabel) citiesLabel.textContent = pluralRu(v, "город", "города", "городов");
  });
  animateCountTo(document.getElementById("statsArea"), totalArea);
}

const mapSvg = document.querySelector(".map-project__svg");
const mapPins = document.getElementById("mapPins");
const mapTip = document.getElementById("mapTip");
const mapCard = document.querySelector(".map-project__card");

function setMapData() {
  if (!mapSvg || !mapPins || !mapTip || !mapCard) return;

  const cities = [];
  const cityIndex = new Map();
  PROJECTS.forEach((p) => {
    if (!p.city || !p.city.trim()) return;
    if (!cityIndex.has(p.city)) {
      const entry = { city: p.city, x: p.x, y: p.y, projects: [] };
      cityIndex.set(p.city, entry);
      cities.push(entry);
    }
    cityIndex.get(p.city).projects.push(p);
  });

  let hideTimer = null;

  function showTip(city) {
    if (!city.projects.length) return;
    mapTip.innerHTML = "";

    const tipCity = document.createElement("p");
    tipCity.className = "map-tip__city";
    tipCity.textContent = city.city;

    const list = document.createElement("div");
    list.className = "map-tip__list";
    city.projects.forEach((p) => {
      const item = document.createElement("a");
      item.className = "map-tip__item";
      item.href = "#";
      item.setAttribute("role", "button");
      item.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        mapTip.classList.remove("is-open");
        if (p.pop) {
          openProject(p.pop);
        } else {
          document.getElementById("portfolio").scrollIntoView({ behavior: "smooth" });
        }
      });

      const img = document.createElement("img");
      img.className = "map-tip__img";
      img.src = p.img;
      img.alt = p.title;

      const body = document.createElement("span");
      body.className = "map-tip__body";
      const title = document.createElement("h3");
      title.className = "map-tip__title";
      title.textContent = p.title;
      const type = document.createElement("p");
      type.className = "map-tip__type";
      type.textContent = p.type;
      body.appendChild(title);
      body.appendChild(type);

      item.appendChild(img);
      item.appendChild(body);
      list.appendChild(item);
    });

    mapTip.appendChild(tipCity);
    mapTip.appendChild(list);

    const cardRect = mapCard.getBoundingClientRect();
    const svgRect = mapSvg.getBoundingClientRect();
    const nX = (city.x / 1000) * svgRect.width;
    const nY = (city.y / 560) * svgRect.height;
    let tipX = svgRect.left - cardRect.left + nX;
    let tipY = svgRect.top - cardRect.top + nY;
    mapTip.style.left = tipX + "px";
    mapTip.style.top = tipY + "px";

    mapTip.classList.add("is-open");
    const tipW = mapTip.offsetWidth;
    const tipH = mapTip.offsetHeight;
    const cardW = cardRect.width;
    tipX = Math.max(tipW / 2 + 8, Math.min(cardW - tipW / 2 - 8, tipX));
    tipY = tipY - tipH - 18;
    if (tipY < 10) tipY = 10;
    mapTip.style.left = tipX + "px";
    mapTip.style.top = tipY + "px";
  }

  function hideTip() {
    mapTip.classList.remove("is-open");
    mapTip.innerHTML = "";
  }

  cities.forEach((city) => {
    const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
    g.setAttribute("class", "map-pin");
    g.setAttribute("tabindex", "0");
    g.setAttribute("role", "button");
    g.setAttribute("aria-label", city.city);

    const ring = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    ring.setAttribute("class", "map-pin__ring");
    ring.setAttribute("cx", city.x);
    ring.setAttribute("cy", city.y);
    ring.setAttribute("r", 15);

    const dot = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    dot.setAttribute("class", "map-pin__dot");
    dot.setAttribute("cx", city.x);
    dot.setAttribute("cy", city.y);
    dot.setAttribute("r", 5);

    const plus = document.createElementNS("http://www.w3.org/2000/svg", "text");
    plus.setAttribute("class", "map-pin__plus");
    plus.setAttribute("x", city.x);
    plus.setAttribute("y", city.y);
    plus.setAttribute("text-anchor", "middle");
    plus.setAttribute("dominant-baseline", "central");
    plus.textContent = "+";

    const label = document.createElementNS("http://www.w3.org/2000/svg", "text");
    label.setAttribute("class", "map-pin__label");
    label.setAttribute("x", city.x + 14);
    label.setAttribute("y", city.y + 7);
    label.textContent = city.city;

    g.appendChild(ring);
    g.appendChild(dot);
    g.appendChild(plus);
    g.appendChild(label);

    g.addEventListener("mouseenter", () => {
      clearTimeout(hideTimer);
      showTip(city);
    });

    g.addEventListener("mouseleave", () => {
      hideTimer = setTimeout(hideTip, 250);
    });

    g.addEventListener("click", (e) => {
      e.stopPropagation();
      if (city.projects.length === 1 && city.projects[0].pop) {
        hideTip();
        openProject(city.projects[0].pop);
      } else {
        clearTimeout(hideTimer);
        showTip(city);
      }
    });

    g.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        g.click();
      }
    });

    mapPins.appendChild(g);
  });

  mapTip.addEventListener("mouseenter", () => clearTimeout(hideTimer));
  mapTip.addEventListener("mouseleave", () => {
    hideTimer = setTimeout(hideTip, 250);
  });
}

animateProjectCount();
setMapData();

/* =====================================================
   Пасхалка: маленькая девочка-блондинка
   -----------------------------------------------------
   Отключить:  EASTER_EGG.enabled = false
   Задержка:   EASTER_EGG.IDLE_DELAY (мс) — бездействие
     до случайного запуска сценария (по умолчанию 3000)
   -----------------------------------------------------
   Слой поверх страницы, pointer-events: none —
   не мешает обычному взаимодействию с сайтом.
   ===================================================== */
(function () {
  const EASTER_EGG = {
    enabled: true,      // false — полностью отключить пасхалку
    IDLE_DELAY: 3000,   // мс бездействия до запуска
    COOLDOWN: 9000      // мс паузы между сценариями
  };
  if (!EASTER_EGG.enabled) return;

  if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const GIRL_SVG =
    '<svg class="egg-svg" viewBox="0 0 90 112" role="img" aria-label="маленькая хулиганистая девочка">' +
    '<ellipse cx="45" cy="106" rx="26" ry="4" fill="rgba(0,0,0,0.08)"/>' +
    '<path d="M45 6 C72 6 85 26 82 52 C80 76 68 92 45 92 C22 92 10 76 8 52 C5 26 18 6 45 6 Z" fill="#F3C55C"/>' +
    '<circle cx="6" cy="56" r="9" fill="#F3C55C"/>' +
    '<circle cx="84" cy="56" r="9" fill="#F3C55C"/>' +
    '<path d="M0 62 q2 12 10 14" stroke="#F3C55C" stroke-width="5" fill="none" stroke-linecap="round"/>' +
    '<path d="M90 62 q-2 12 -10 14" stroke="#F3C55C" stroke-width="5" fill="none" stroke-linecap="round"/>' +
    '<circle cx="6" cy="64" r="2.2" fill="#E8795A"/>' +
    '<circle cx="84" cy="64" r="2.2" fill="#E8795A"/>' +
    '<ellipse cx="45" cy="56" rx="19" ry="20" fill="#FFE7CF"/>' +
    '<path d="M27 48 Q29 28 45 28 Q61 28 63 48 Q56 40 45 42 Q34 40 27 48 Z" fill="#F3C55C"/>' +
    '<path d="M30 48 Q36 44 42 47" stroke="#8A5A33" stroke-width="2.4" stroke-linecap="round" fill="none"/>' +
    '<path d="M48 47 Q54 44 60 48" stroke="#8A5A33" stroke-width="2.4" stroke-linecap="round" fill="none"/>' +
    '<g class="egg-eye">' +
    '<ellipse cx="35" cy="57" rx="6.4" ry="8" fill="#fff" stroke="#5C3A1E" stroke-width="1.6"/>' +
    '<circle cx="35" cy="58" r="3.6" fill="#7A4E24"/>' +
    '<circle cx="35" cy="58" r="1.8" fill="#241505"/>' +
    '<circle cx="33.5" cy="55.5" r="1.4" fill="#fff"/>' +
    '</g>' +
    '<g class="egg-eye">' +
    '<ellipse cx="55" cy="57" rx="6.4" ry="8" fill="#fff" stroke="#5C3A1E" stroke-width="1.6"/>' +
    '<circle cx="55" cy="58" r="3.6" fill="#7A4E24"/>' +
    '<circle cx="55" cy="58" r="1.8" fill="#241505"/>' +
    '<circle cx="53.5" cy="55.5" r="1.4" fill="#fff"/>' +
    '</g>' +
    '<path d="M44 63 q1 2 2 0" stroke="#D9A26F" stroke-width="1.6" fill="none" stroke-linecap="round"/>' +
    '<ellipse cx="29" cy="63" rx="3.6" ry="2.2" fill="#F49B83" opacity="0.55"/>' +
    '<ellipse cx="61" cy="63" rx="3.6" ry="2.2" fill="#F49B83" opacity="0.55"/>' +
    '<path d="M40 69 q5 4 10 0" stroke="#B3452D" stroke-width="2.2" fill="none" stroke-linecap="round"/>' +
    '<path d="M33 80 Q45 76 57 80 L64 104 Q45 110 26 104 Z" fill="#E8795A"/>' +
    '<path d="M35 80 Q45 84 55 80 L54 86 Q45 90 36 86 Z" fill="#FCE9DA"/>' +
    '<path d="M30 82 q-6 10 -4 18" stroke="#FFE7CF" stroke-width="6" fill="none" stroke-linecap="round"/>' +
    '<path d="M60 82 q6 10 4 18" stroke="#FFE7CF" stroke-width="6" fill="none" stroke-linecap="round"/>' +
    '<path d="M38 104 v6" stroke="#FFE7CF" stroke-width="7" stroke-linecap="round"/>' +
    '<path d="M52 104 v6" stroke="#FFE7CF" stroke-width="7" stroke-linecap="round"/>' +
    '<path d="M33 111 h10" stroke="#B07A48" stroke-width="5" stroke-linecap="round"/>' +
    '<path d="M47 111 h10" stroke="#B07A48" stroke-width="5" stroke-linecap="round"/>' +
    '<g class="egg-mag">' +
    '<circle cx="60" cy="50" r="10" fill="#DCF3FA" stroke="#C9923C" stroke-width="3"/>' +
    '<circle cx="57" cy="47" r="2.6" fill="#fff" opacity="0.9"/>' +
    '<path d="M67 57 l9 11" stroke="#C9923C" stroke-width="4" stroke-linecap="round"/>' +
    '</g>' +
    '<g class="egg-star">' +
    '<path d="M72 22 l3 6 7 1 -5 5 1 7 -6 -3 -6 3 1 -7 -5 -5 7 -1 Z" fill="#F9C74F"/>' +
    '<circle cx="83" cy="36" r="1.6" fill="#F9C74F"/>' +
    '<circle cx="68" cy="40" r="1.2" fill="#F9C74F"/>' +
    '</g>' +
    '</svg>';

  const stage = document.createElement("div");
  stage.className = "easter-stage";
  stage.innerHTML =
    '<div class="easter-girl egg-left" id="easterGirl"><div class="egg-bob">' + GIRL_SVG + "</div></div>";
  document.body.appendChild(stage);

  const girl = stage.firstElementChild;
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const reduceReflow = () => { void girl.offsetLeft; };

  function setFace(dir) {
    girl.classList.toggle("egg-right", dir === -1);
    girl.classList.toggle("egg-left", dir === 1);
  }

  function showGirl() { girl.classList.add("is-visible"); }
  function hideGirl() {
    girl.classList.remove("is-running", "egg-tilt", "egg-nod", "egg-chew", "egg-squint", "egg-mag", "egg-happy");
    girl.classList.remove("is-visible");
  }

  function jumpGirl(x, y) {
    girl.style.transition = "none";
    girl.style.left = x + "px";
    girl.style.top = y + "px";
    reduceReflow();
  }

  function moveTo(x, y, dur, face) {
    if (face) setFace(face);
    return new Promise((res) => {
      girl.style.transition = "left " + dur + "ms cubic-bezier(0.4,0.2,0.3,1), top " + dur + "ms cubic-bezier(0.4,0.2,0.3,1)";
      girl.style.left = x + "px";
      girl.style.top = y + "px";
      setTimeout(res, dur + 60);
    });
  }

  function letterAbs(span, rect, ax, ay, ms) {
    span.style.transition = "transform " + ms + "ms cubic-bezier(0.3,0.4,0.4,1)";
    span.style.transform = "translate(" + (ax - rect.left) + "px," + (ay - rect.top) + "px)";
  }

  function letterHome(span) {
    span.style.transition = "transform 0.8s cubic-bezier(0.16,0.9,0.3,1.15)";
    span.style.transform = "translate(0,0)";
  }

  function removeSpan(span) {
    const t = document.createTextNode(span.textContent || "");
    span.parentNode.replaceChild(t, span);
  }

  function cleanup() {
    stage.querySelectorAll(".egg-letter").forEach((sp) => {
      sp.classList.remove("bitten");
      sp.style.transition = "none";
      sp.style.transform = "translate(0,0)";
      removeSpan(sp);
    });
    hideGirl();
  }

  /* Случайная буква в обычном тексте (не в портфолио, не в попапах). */
  function pickLetter() {
    const modes = ["h1", "h2", "h3", "h4", "h5", "p", "li", "figcaption", "blockquote", "strong", "em", "span"];
    const els = document.querySelectorAll(modes.join(","));
    const pool = [];
    for (let i = 0; i < els.length; i++) {
      const el = els[i];
      if (el.closest(".portfolio, .map-tip, .lightbox, .project-pop, .header, .header__nav, header, footer, nav, .easter-stage, .contacts, .stats, .egg-letter, a, button, [data-open], [hidden]")) continue;
      const cs = window.getComputedStyle(el);
      if (cs.display === "none" || cs.visibility === "hidden") continue;
      const r = el.getBoundingClientRect();
      if (r.width < 20 || r.height < 8) continue;
      if (r.right < 0 || r.left > innerWidth || r.bottom < 0 || r.top > innerHeight) continue;
      if (!el.textContent || el.textContent.trim().length < 8) continue;
      pool.push(el);
    }
    if (!pool.length) return null;

    const el = pool[Math.floor(Math.random() * pool.length)];
    const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, {
      acceptNode: function (n) {
        return n.data && n.data.trim().length > 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
      }
    });
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    if (!nodes.length) return null;

    const tn = nodes[Math.floor(Math.random() * nodes.length)];
    const data = tn.data;
    const idxs = [];
    for (let i = 0; i < data.length; i++) {
      if (/[\p{L}]/u.test(data[i])) idxs.push(i);
    }
    if (!idxs.length) return null;
    const idx = idxs[Math.floor(Math.random() * idxs.length)];

    const range = document.createRange();
    range.setStart(tn, idx);
    range.setEnd(tn, idx + 1);
    const span = document.createElement("span");
    span.className = "egg-letter";
    span.setAttribute("data-egg", "1");
    try {
      range.surroundContents(span);
    } catch (e) {
      return null;
    }
    return span;
  }

  /* Видимая картинка портфолио для «Инспектора». */
  function pickPortImage() {
    const imgs = document.querySelectorAll(".project-card__cover img, .work img");
    for (let i = 0; i < imgs.length; i++) {
      const r = imgs[i].getBoundingClientRect();
      if (r.width < 80 || r.height < 60) continue;
      if (r.right < 40 || r.left > innerWidth - 40 || r.bottom < 40 || r.top > innerHeight - 40) continue;
      return { img: imgs[i], rect: r };
    }
    return null;
  }

  const W = () => innerWidth;
  const H = () => innerHeight;
  const GIRL_W = 96;
  const GIRL_H = 120;

  /* --- Сценарий 1: Воровка буквы --- */
  async function sceneThief() {
    const span = pickLetter();
    if (!span) return;
    const rect = span.getBoundingClientRect();
    const dir = Math.random() < 0.5 ? -1 : 1;
    const cy = clamp(rect.top + 6, 44, H() - GIRL_H);

    setFace(dir);
    jumpGirl(dir === -1 ? -GIRL_W - 40 : W() + 30, cy);
    showGirl();
    girl.classList.add("is-running");
    await moveTo(dir === -1 ? -GIRL_W - 10 : W() + 10, cy, 60, dir);

    const standX = clamp(rect.left - dir * 36, 8, Math.max(8, W() - GIRL_W - 8));
    await moveTo(standX, cy, 520, dir);

    const handX = standX + dir * 24;
    const handY = cy + 44;
    letterAbs(span, rect, handX, handY, 140);
    await sleep(240);

    const exitDir = -dir;
    const exitX = exitDir === 1 ? W() + 110 : -GIRL_W - 60;
    const letterExit = { x: exitX + (exitDir === 1 ? 34 : -34), y: cy + 44 };
    const p = moveTo(exitX, cy, 620, exitDir);
    letterAbs(span, rect, letterExit.x, letterExit.y, 620);
    await p;
    girl.classList.remove("is-running");
    hideGirl();

    await sleep(1300);
    letterHome(span);
    await sleep(900);
    removeSpan(span);
  }

  /* --- Сценарий 2: Инспектор --- */
  async function sceneInspector() {
    const t = pickPortImage();
    if (!t) return;
    const r = t.rect;
    const dir = Math.random() < 0.5 ? 1 : -1;
    const cy = clamp(r.top + r.height / 2 - GIRL_H / 2, 44, H() - GIRL_H);
    const standX = clamp(dir === 1 ? r.left - GIRL_W - 14 : r.right + 12, 8, W() - GIRL_W - 8);

    setFace(-dir);
    jumpGirl(dir === 1 ? r.left - GIRL_W - 140 : r.right + 100, cy);
    showGirl();
    girl.classList.add("is-running");
    await moveTo(standX, cy, 600, -dir);
    girl.classList.remove("is-running");

    girl.classList.add("egg-squint");
    await moveTo(standX, cy - 10, 240);
    await sleep(320);
    girl.classList.add("egg-mag");
    girl.classList.add("egg-tilt");
    await sleep(700);
    girl.classList.remove("egg-tilt");
    girl.classList.add("egg-squint");
    await moveTo(standX, cy, 260, -dir);
    await sleep(400);
    girl.classList.add("egg-tilt");
    await sleep(650);
    girl.classList.remove("egg-tilt", "egg-squint", "egg-mag");

    girl.classList.add("egg-nod");
    girl.classList.add("egg-happy");
    await sleep(750);
    girl.classList.remove("egg-nod", "egg-happy");

    const exitDir = -dir;
    const exitX = exitDir === 1 ? W() + 70 : -GIRL_W - 60;
    girl.classList.add("is-running");
    await moveTo(exitX, cy, 600, exitDir);
    girl.classList.remove("is-running");
    hideGirl();
  }

  /* --- Сценарий 3: Голодная --- */
  async function sceneHungry() {
    const span = pickLetter();
    if (!span) return;
    const rect = span.getBoundingClientRect();
    const dir = Math.random() < 0.5 ? -1 : 1;
    const cy = clamp(rect.top + 6, 44, H() - GIRL_H);

    setFace(dir);
    jumpGirl(dir === -1 ? -GIRL_W - 40 : W() + 30, cy);
    showGirl();
    girl.classList.add("is-running");
    await moveTo(dir === -1 ? -GIRL_W - 10 : W() + 10, cy, 60, dir);

    const standX = clamp(rect.left - dir * 40, 8, Math.max(8, W() - GIRL_W - 8));
    await moveTo(standX, cy, 540, dir);
    girl.classList.remove("is-running");

    const mouthX = standX + dir * 12;
    const mouthY = cy + 18;
    letterAbs(span, rect, mouthX, mouthY, 140);
    await sleep(220);
    span.classList.add("bitten");
    girl.classList.add("egg-chew");
    await sleep(620);
    girl.classList.remove("egg-chew");

    girl.classList.add("egg-happy");
    await sleep(820);
    girl.classList.remove("egg-happy");

    const exitDir = -dir;
    const exitX = exitDir === 1 ? W() + 110 : -GIRL_W - 60;
    const p = moveTo(exitX, cy, 600, exitDir);
    span.classList.remove("bitten");
    letterHome(span);
    await p;
    girl.classList.remove("is-running");
    hideGirl();

    await sleep(600);
    removeSpan(span);
  }

  /* --- Таймер бездействия + запуск --- */
  let lastActivity = Date.now();
  let busy = false;
  let nextRunAt = Date.now() + EASTER_EGG.COOLDOWN;

  const refreshActivity = () => { lastActivity = Date.now(); };
  const activityEvts = ["mousemove", "mousedown", "pointerdown", "keydown", "wheel", "scroll", "touchstart", "touchmove", "click"];
  activityEvts.forEach((ev) => window.addEventListener(ev, refreshActivity, { passive: true }));

  function runRandomScene() {
    busy = true;
    const key = Math.random();
    const p =
      key < 0.34 ? sceneThief() :
      key < 0.67 ? sceneInspector() :
      sceneHungry();
    Promise.resolve(p).catch(function () {}).then(function () {
      cleanup();
      nextRunAt = Date.now() + EASTER_EGG.COOLDOWN;
      busy = false;
    });
  }

  setInterval(function () {
    if (!EASTER_EGG.enabled || busy) return;
    if (document.visibilityState !== "visible") return;
    if (Date.now() < nextRunAt) return;
    if (Date.now() - lastActivity < EASTER_EGG.IDLE_DELAY) return;
    if (document.querySelector(".lightbox.open, .project-pop.open")) return;
    runRandomScene();
  }, 400);
})();
