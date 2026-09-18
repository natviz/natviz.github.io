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

document.querySelectorAll(".work img").forEach((img) => {
  img.addEventListener("click", () => {
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightbox.classList.add("open");
    document.body.style.overflow = "hidden";
  });
});

function closeLightbox() {
  lightbox.classList.remove("open");
  lightboxImg.src = "";
  document.body.style.overflow = "";
}

lightboxClose.addEventListener("click", closeLightbox);
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) closeLightbox();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeLightbox();
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
