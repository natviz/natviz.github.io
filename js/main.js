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
   Пасхалка: котёнок-озорник
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
    COOLDOWN: 6000      // мс паузы между сценариями
  };
  if (!EASTER_EGG.enabled) return;

  if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const stage = document.createElement("div");
  stage.className = "easter-stage";
  stage.innerHTML =
    '<div class="easter-girl egg-left" id="easterGirl"><div class="egg-bob">' +
    '<img class="egg-svg" id="eggImg" src="assets/cat/play/walk-01.png" alt="котёнок-озорник" draggable="false">' +
    '<span class="egg-dust" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i></span></div></div>';
  document.body.appendChild(stage);

  const girl = stage.firstElementChild;
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const reduceReflow = () => { void girl.offsetLeft; };

  // --- Кадры котёнка: по папкам на сценарий ---
  const CAT_SET = {
    thief: "assets/cat/thief/",
    play: "assets/cat/play/",
    lick: "assets/cat/lick/",
    sleep: "assets/cat/sleep/"
  };
  const CAT_FACING = {
    thief: { walk: "right", run: "right" },
    play: { walk: "right", run: "right" },
    lick: { walk: "right", run: "right" },
    sleep: { walk: "right", run: "right" }
  };
  const CAT_FALLBACK = { thief: "walk-01", play: "walk-01", lick: "walk-01", sleep: "forward-01" };
  const CAT_WALK = ["walk-01", "walk-02", "walk-03", "walk-04"];
  const CAT_RUN = ["run-01", "run-02", "run-03", "run-04"];
  const CAT_PLAY = ["play-01", "play-02", "play-03", "play-04"];
  const CAT_LICK = ["lick-01", "lick-02", "lick-03", "lick-04", "lick-05", "lick-06"];
  const CAT_FWD = { sleep: ["forward-01", "forward-02", "forward-03", "forward-04", "forward-05"] };
  const CAT_BACK = { sleep: ["back-0", "back-01", "back-02", "back-03", "back-04"] };
  const CAT_POSE = {
    "egg-chew": "bite",
    "egg-squint": "sniff",
    "egg-happy": "happy",
    "egg-mag": "look-right",
    "egg-lookright": "look-right",
    "egg-tilt": "curious",
    "egg-nod": "look-up",
    "egg-lookleft": "look-left",
    "egg-surprise": "surprised",
    "egg-tailup": "tail-up",
    "egg-withtoy": "with-toy",
    "egg-sit": "sit",
    "egg-purr": "purr",
    "egg-sleep": "sleep"
  };
  const eggImg = stage.querySelector("#eggImg");
  let catFrame = 0;
  let activeSet = "play";
  const catFrameNames = [].concat(CAT_RUN, CAT_WALK, Object.keys(CAT_POSE).map(function (k) { return CAT_POSE[k]; }),
    CAT_PLAY, CAT_LICK, Object.keys(CAT_FWD).reduce(function (a, k) { return a.concat(CAT_FWD[k]); }, []),
    Object.keys(CAT_BACK).reduce(function (a, k) { return a.concat(CAT_BACK[k]); }, []));
  const catCache = {};
  Object.keys(CAT_SET).forEach(function (s) {
    catFrameNames.forEach(function (n) {
      const im = new Image();
      im.src = CAT_SET[s] + n + ".png";
      catCache[s + "/" + n] = im;
    });
  });

  function catSrc() {
    if (girl.classList.contains("is-running")) return CAT_RUN[catFrame % 4];
    if (girl.classList.contains("is-walking")) {
      const f = CAT_FWD[activeSet] || CAT_WALK;
      return f[catFrame % f.length];
    }
    if (girl.classList.contains("is-backing")) {
      const b = CAT_BACK[activeSet] || CAT_RUN;
      return b[catFrame % b.length];
    }
    if (girl.classList.contains("is-playing")) return CAT_PLAY[catFrame % 4];
    if (girl.classList.contains("is-licking")) return CAT_LICK[catFrame % 6];
    for (const k in CAT_POSE) {
      if (girl.classList.contains(k)) return CAT_POSE[k];
    }
    return CAT_FALLBACK[activeSet] || "idle";
  }

  function renderFrame() {
    const p = CAT_SET[activeSet] + catSrc() + ".png";
    if (eggImg.getAttribute("src") !== p) eggImg.src = p;
  }

  function setScene(name) {
    activeSet = CAT_SET[name] ? name : "play";
  }

  let lastStep = 0;
  setInterval(function () {
    const running = girl.classList.contains("is-running");
    const walking = girl.classList.contains("is-walking");
    const backing = girl.classList.contains("is-backing");
    const playing = girl.classList.contains("is-playing");
    const licking = girl.classList.contains("is-licking");
    if (running || walking || backing || playing || licking) {
      const stepMs = running ? 190 : backing ? 260 : walking ? 300 : playing ? 340 : 380;
      if (performance.now() - lastStep >= stepMs) {
        if (activeSet === "sleep" && (walking || backing)) {
          const len = walking ? (CAT_FWD[activeSet] || CAT_WALK).length : (CAT_BACK[activeSet] || CAT_RUN).length;
          if (catFrame < len - 1) catFrame++;
        } else {
          catFrame++;
        }
        lastStep = performance.now();
      }
    } else {
      catFrame = 0;
    }
    renderFrame();
  }, 60);

  function setFace(dir) {
    const walking = girl.classList.contains("is-walking");
    const facing = CAT_FACING[activeSet] || CAT_FACING.play;
    const faceLeft = walking ? facing.walk === "left" : facing.run === "left";
    girl.classList.toggle("egg-right", faceLeft ? dir === 1 : dir === -1);
    girl.classList.toggle("egg-left", faceLeft ? dir === -1 : dir === 1);
  }

  function showGirl() { girl.classList.add("is-visible"); }
  function hideGirl() {
    girl.className = "easter-girl egg-left";
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

  function letterMagnet(span, rect, ax, ay) {
    span.style.transition = "transform 420ms cubic-bezier(0.18,0.9,0.3,1.3)";
    span.style.transform = "translate(" + (ax - rect.left) + "px," + (ay - rect.top) + "px)";
  }

  function letterHome(span) {
    span.style.transition = "transform 1.6s cubic-bezier(0.16,0.9,0.3,1.15)";
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
      if (data.charCodeAt(i) < 0xffff && /[\p{L}]/u.test(data[i])) idxs.push(i);
    }
    if (!idxs.length) return null;
    const good = [];
    for (let k = 0; k < idxs.length; k++) {
      const i = idxs[k];
      if (i > 0 && data.charCodeAt(i - 1) >= 0xd800 && data.charCodeAt(i - 1) <= 0xdbff) continue;
      if (i + 1 < data.length && data.charCodeAt(i + 1) >= 0xdc00 && data.charCodeAt(i + 1) <= 0xdfff) continue;
      good.push(i);
    }
    if (!good.length) return null;
    const idx = good[Math.floor(Math.random() * good.length)];

    const range = document.createRange();
    range.setStart(tn, idx);
    range.setEnd(tn, idx + 1);
    const span = document.createElement("span");
    span.className = "egg-letter";
    span.setAttribute("data-egg", "1");
    span.style.position = "relative";
    try {
      range.surroundContents(span);
    } catch (e) {
      return null;
    }
    return span;
  }

  const W = () => innerWidth;
  const H = () => innerHeight;
  const GIRL_W = 96;
  const GIRL_H = 120;

  /* --- Сценарий 1: Воровка буквы --- */
  async function sceneThief() {
    setScene("thief");
    let span = null;
    for (let attempt = 0; attempt < 10 && !span; attempt++) {
      try { span = pickLetter(); } catch (e) { span = null; }
    }
    if (!span) return;
    const rect = span.getBoundingClientRect();
    const dir = Math.random() < 0.5 ? -1 : 1;
    const cy = clamp(rect.top + 6, 44, H() - GIRL_H);
    const startX = dir === 1 ? -GIRL_W - 60 : W() + 60;
    const standX = clamp(rect.left - dir * 36, 8, Math.max(8, W() - GIRL_W - 8));

    setFace(dir);
    jumpGirl(startX, cy);
    showGirl();

    /* 1. Идёт (все walk-кадры) */
    girl.classList.add("is-walking");
    await moveTo(standX, cy, 2400, dir);
    girl.classList.remove("is-walking");

    /* 2. Буква примагнитилась к котику */
    const grabX = standX - dir * 46;
    const grabY = cy + 58;
    letterMagnet(span, rect, grabX, grabY);
    await sleep(560);

    /* 3. Побежал (все run-кадры), тащит букву */
    const exitDir = -dir;
    const exitX = exitDir === 1 ? W() + 110 : -GIRL_W - 60;
    const letterExit = { x: exitX + (exitDir === 1 ? 38 : -38), y: cy + 58 };
    girl.classList.add("is-running");
    const p = moveTo(exitX, cy, 2300, exitDir);
    letterAbs(span, rect, letterExit.x, letterExit.y, 2300);
    await p;
    girl.classList.remove("is-running");
    hideGirl();

    await sleep(3000);
    letterHome(span);
    await sleep(2200);
    removeSpan(span);
  }

  /* --- Сценарий 2: Игра --- */
  async function scenePlay() {
    setScene("play");
    const dir = Math.random() < 0.5 ? -1 : 1;
    const cy = clamp(H() * 0.55, 44, H() - GIRL_H);
    const startX = dir === 1 ? -GIRL_W - 60 : W() + 60;
    const playX = clamp(W() * 0.5 + (Math.random() * 0.14 - 0.07) * W(), 30, W() - GIRL_W - 30);

    setFace(dir);
    jumpGirl(startX, cy);
    showGirl();

    // 1. Идёт
    girl.classList.add("is-walking");
    await moveTo(playX, cy, 2400, dir);
    girl.classList.remove("is-walking");

    // 2. Удивляется
    girl.classList.add("egg-surprise");
    await sleep(1100);
    girl.classList.remove("egg-surprise");

    // 3. Играет (все play-кадры)
    girl.classList.add("is-playing");
    await sleep(2800);
    girl.classList.remove("is-playing");

    // 4. Бежит обратно
    const exitDir = -dir;
    const exitX = exitDir === 1 ? W() + 70 : -GIRL_W - 60;
    girl.classList.add("is-running");
    await moveTo(exitX, cy, 2000, exitDir);
    girl.classList.remove("is-running");
    hideGirl();
  }

  /* --- Сценарий 4: Сон (всё на одной точке) --- */
  async function sceneSleep() {
    setScene("sleep");
    const standX = clamp(W() * 0.5 + (Math.random() * 0.1 - 0.05) * W(), 30, W() - GIRL_W - 30);
    const cy = clamp(H() * 0.55, 44, H() - GIRL_H);

    jumpGirl(standX, cy);
    showGirl();

    /* 1. Вперёд (все forward-кадры строго по нумерации, на месте) */
    girl.classList.add("is-walking");
    await sleep(2000);
    girl.classList.remove("is-walking");

    /* 2. Нюхает */
    girl.classList.add("egg-squint");
    await sleep(1200);
    girl.classList.remove("egg-squint");

    /* 3. Спит (задержка 5 секунд) */
    girl.classList.add("egg-sleep");
    await sleep(5000);
    girl.classList.remove("egg-sleep");

    /* 4. Садится */
    girl.classList.add("egg-sit");
    await sleep(1400);
    girl.classList.remove("egg-sit");

    /* 5. Назад (все back-кадры, на месте) */
    girl.classList.add("is-backing");
    await sleep(1600);
    girl.classList.remove("is-backing");
    hideGirl();
  }

  /* --- Сценарий 1: Лизание экрана --- */
  async function sceneLick() {
    setScene("lick");
    const dir = Math.random() < 0.5 ? -1 : 1;
    const cy = clamp(H() * 0.55, 44, H() - GIRL_H);
    const startX = dir === 1 ? -GIRL_W - 60 : W() + 60;
    const standX = clamp(W() * 0.5 + (Math.random() * 0.1 - 0.05) * W(), 30, W() - GIRL_W - 30);

    setFace(dir);
    jumpGirl(startX, cy);
    showGirl();

    // 1. Идёт
    girl.classList.add("is-walking");
    await moveTo(standX, cy, 2400, dir);
    girl.classList.remove("is-walking");

    // 2. Оглядывается (look-картинки поочерёдно)
    const looks = ["egg-lookleft", "egg-lookright", "egg-nod", "egg-lookleft", "egg-lookright"];
    for (let i = 0; i < looks.length; i++) {
      girl.classList.add(looks[i]);
      await sleep(950);
      girl.classList.remove(looks[i]);
    }

    // 3. Лижет экран
    girl.classList.add("is-licking");
    await sleep(2700);
    girl.classList.remove("is-licking");

    // 4. Садится
    girl.classList.add("egg-sit");
    await sleep(900);
    girl.classList.remove("egg-sit");

    // 5. Довольный
    girl.classList.add("egg-happy");
    await sleep(1000);
    girl.classList.remove("egg-happy");

    // 6. Бежит обратно
    const exitDir = -dir;
    const exitX = exitDir === 1 ? W() + 70 : -GIRL_W - 60;
    girl.classList.add("is-running");
    await moveTo(exitX, cy, 2000, exitDir);
    girl.classList.remove("is-running");
    hideGirl();
  }

  /* --- Таймер бездействия + запуск --- */
  let lastActivity = Date.now();
  let busy = false;
  let nextRunAt = Date.now() + EASTER_EGG.COOLDOWN;

  const refreshActivity = () => { lastActivity = Date.now(); };
  const activityEvts = ["mousemove", "mousedown", "pointerdown", "keydown", "wheel", "scroll", "touchstart", "touchmove", "click"];
  activityEvts.forEach((ev) => window.addEventListener(ev, refreshActivity, { passive: true }));

  const SCENE_ORDER = ["thief", "play", "lick", "sleep"];
  let sceneIndex = 0;

  function runRandomScene() {
    busy = true;
    const forced = window.__eggNext;
    window.__eggNext = undefined;
    const valid = forced === "thief" || forced === "play" || forced === "lick" || forced === "sleep";
    const which = valid ? forced : SCENE_ORDER[sceneIndex % SCENE_ORDER.length];
    sceneIndex++;
    console.info("[egg] запуск сценария: " + which);
    const p =
      which === "thief" ? sceneThief() :
      which === "lick" ? sceneLick() :
      which === "sleep" ? sceneSleep() : scenePlay();
    Promise.resolve(p).catch(function (e) { console.warn("[egg] ошибка сценария:", e); }).then(function () {
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

  (function selfCheck() {
    try {
      const modes = ["h1", "h2", "h3", "h4", "h5", "p", "li", "figcaption", "blockquote", "strong", "em", "span"];
      const els = document.querySelectorAll(modes.join(","));
      let n = 0;
      for (let i = 0; i < els.length; i++) {
        const el = els[i];
        if (el.closest(".portfolio, .map-tip, .lightbox, .project-pop, .header, .header__nav, header, footer, nav, .easter-stage, .contacts, .stats, .egg-letter, a, button, [data-open], [hidden]")) continue;
        if (window.getComputedStyle(el).display === "none") continue;
        if (!el.textContent || el.textContent.trim().length < 8) continue;
        n++;
      }
      console.info("[egg] кандидатов под букву: " + n);
    } catch (e) {
      console.warn("[egg] self-check:", e);
    }
  })();
})();
