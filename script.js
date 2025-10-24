/* ================= EmailJS ================= */
(function initEmailJS() {
  if (!window.emailjs) return;
  emailjs.init({ publicKey: "w8cq1CUL3lCf5PJgq" });
})();

/* ================= Toast util ================= */
function showToast(message, type = "info", options = {}) {
  const {
    duration = 3500,
    title = type === "success" ? "Sucesso" : type === "error" ? "Erro" : "Info",
  } = options;

  const root = document.getElementById("toast-root");
  if (!root) return console.warn("toast-root não encontrado");

  const base = document.createElement("div");
  base.role = "status";
  base.ariaLive = "polite";
  base.className = [
    "pointer-events-auto w-[320px] rounded-2xl shadow-xl ring-1 ring-black/5",
    "backdrop-blur bg-white/90",
    "border",
    type === "success" ? "border-emerald-200" : type === "error" ? "border-rose-200" : "border-slate-200",
    "p-4",
    "translate-y-2 opacity-0",
    "transition-all duration-300 ease-out",
  ].join(" ");

  const row = document.createElement("div");
  row.className = "flex items-start gap-3";

  const iconWrap = document.createElement("div");
  iconWrap.className = [
    "shrink-0 rounded-xl p-2",
    type === "success" ? "bg-emerald-50" : type === "error" ? "bg-rose-50" : "bg-slate-50",
    "ring-1",
    type === "success" ? "ring-emerald-100" : type === "error" ? "ring-rose-100" : "ring-slate-100",
  ].join(" ");

  const icons = {
    success:
      '<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>',
    error:
      '<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v4m0 4h.01M12 5a7 7 0 100 14 7 7 0 000-14z"/></svg>',
    info:
      '<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M12 5a7 7 0 100 14 7 7 0 000-14z"/></svg>',
  };

  iconWrap.innerHTML = `<div class="${
    type === "success" ? "text-emerald-600" : type === "error" ? "text-rose-600" : "text-slate-600"
  }">${icons[type] || ""}</div>`;

  const textWrap = document.createElement("div");
  textWrap.className = "flex-1";
  textWrap.innerHTML = `<p class="text-sm font-semibold ${
    type === "success" ? "text-emerald-800" : type === "error" ? "text-rose-800" : "text-slate-800"
  }">${title}</p><p class="text-sm mt-0.5 text-slate-600">${message}</p>`;

  const closeBtn = document.createElement("button");
  closeBtn.type = "button";
  closeBtn.className = "ml-1 shrink-0 text-slate-400 hover:text-slate-700 transition-colors";
  closeBtn.innerHTML =
    '<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M18.3 5.71a1 1 0 00-1.41 0L12 10.59 7.11 5.7A1 1 0 105.7 7.11L10.59 12l-4.9 4.89a1 1 0 101.41 1.41L12 13.41l4.89 4.9a1 1 0 001.41-1.41L13.41 12l4.9-4.89a1 1 0 000-1.4z"/></svg>';

  const bar = document.createElement("div");
  bar.className = "relative mt-3 h-1 w-full rounded-full bg-slate-100 overflow-hidden";
  const barInner = document.createElement("div");
  barInner.className = `absolute left-0 top-0 h-full ${
    type === "success" ? "bg-emerald-500" : type === "error" ? "bg-rose-500" : "bg-slate-500"
  }`;
  bar.appendChild(barInner);

  row.appendChild(iconWrap);
  row.appendChild(textWrap);
  row.appendChild(closeBtn);

  base.appendChild(row);
  base.appendChild(bar);
  root.appendChild(base);

  requestAnimationFrame(() => {
    base.classList.remove("translate-y-2", "opacity-0");
    base.classList.add("translate-y-0", "opacity-100");
  });

  let start = null;
  let frame = null;

  const animate = (ts) => {
    if (!start) start = ts;
    const p = Math.min(1, (ts - start) / duration);
    barInner.style.width = `${(1 - p) * 100}%`;
    if (p < 1) frame = requestAnimationFrame(animate);
  };
  frame = requestAnimationFrame(animate);

  const close = () => {
    cancelAnimationFrame(frame);
    base.classList.add("translate-y-2", "opacity-0");
    base.classList.remove("opacity-100");
    setTimeout(() => base.remove(), 250);
  };

  const auto = setTimeout(close, duration);
  closeBtn.addEventListener("click", () => {
    clearTimeout(auto);
    close();
  });
  base.addEventListener("mouseenter", () => {
    clearTimeout(auto);
    cancelAnimationFrame(frame);
  });
  base.addEventListener("mouseleave", () => {
    start = null;
    frame = requestAnimationFrame(animate);
  });

  return { close };
}

/* ================= App init ================= */
document.addEventListener("DOMContentLoaded", () => {
  /* -------- Mobile menu -------- */
  (function mobileMenuAnimated() {
    const btn = document.querySelector(".mobile-menu-button");
    const menu = document.getElementById("mobile-menu");
    if (!btn || !menu) return;

    const open = () => {
      menu.classList.add("is-open");
      btn.setAttribute("aria-expanded", "true");
      document.body.classList.add("overflow-hidden");
    };
    const close = () => {
      menu.classList.remove("is-open");
      btn.setAttribute("aria-expanded", "false");
      document.body.classList.remove("overflow-hidden");
    };
    const toggle = () => (menu.classList.contains("is-open") ? close() : open());

    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      toggle();
    });
    menu.querySelectorAll("a").forEach((a) => a.addEventListener("click", close));
    document.addEventListener("click", (e) => {
      if (menu.classList.contains("is-open") && !menu.contains(e.target) && !btn.contains(e.target)) close();
    });
    document.addEventListener("keydown", (e) => e.key === "Escape" && close());
  })();

  // ---- Ir direto para /projetos com a categoria selecionada ----
  (function goToProjectsCategory(){
    document.querySelectorAll('.js-go-cat').forEach(el=>{
      el.style.cursor = 'pointer';
      el.addEventListener('click', ()=>{
        const cat = el.dataset.goCat || '';
        const url = `/projetos/?cat=${encodeURIComponent(cat)}`;
        window.location.href = url;
      });
    });
  })();


  /* -------- Carousel (secção Eventos) -------- */
  (function heroCarousel() {
    const slides = Array.from(document.querySelectorAll(".carousel-slide"));
    if (!slides.length) return;

    let currentSlide = 0;
    const dotsContainer = document.getElementById("carousel-dots");
    const prevBtn = document.querySelector(".carousel-prev");
    const nextBtn = document.querySelector(".carousel-next");
    let slideInterval = null;

    const updateSlides = () => {
      slides.forEach((s, i) => s.classList.toggle("active", i === currentSlide));
      const dots = dotsContainer?.children || [];
      for (let i = 0; i < dots.length; i++) {
        dots[i].className = `w-3 h-3 rounded-full transition-colors ${i === currentSlide ? "bg-black" : "bg-gray-300"}`;
      }
    };

    const goToSlide = (i) => {
      currentSlide = (i + slides.length) % slides.length;
      updateSlides();
    };
    const nextSlide = () => goToSlide(currentSlide + 1);
    const prevSlide = () => goToSlide(currentSlide - 1);

    const startAuto = () => {
      stopAuto();
      slideInterval = setInterval(nextSlide, 5000);
    };
    const stopAuto = () => {
      if (slideInterval) clearInterval(slideInterval);
    };

    if (dotsContainer) {
      slides.forEach((_, index) => {
        const dot = document.createElement("button");
        dot.className = `w-3 h-3 rounded-full transition-colors ${index === 0 ? "bg-black" : "bg-gray-300"}`;
        dot.ariaLabel = `Ir para slide ${index + 1}`;
        dot.addEventListener("click", () => goToSlide(index));
        dotsContainer.appendChild(dot);
      });
    }

    prevBtn?.addEventListener("click", prevSlide);
    nextBtn?.addEventListener("click", nextSlide);

    slides.forEach((slide) => {
      slide.addEventListener("mouseenter", stopAuto);
      slide.addEventListener("mouseleave", startAuto);
    });

    updateSlides();
    startAuto();
  })();

  /* -------- Formulário + EmailJS + reCAPTCHA -------- */
  (function contactFormHandler() {
    const form = document.getElementById("contactForm");
    const btn = document.getElementById("sendBtn");
    if (!form || !btn) return;

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const name = form.name?.value?.trim();
      const email = form.email?.value?.trim();
      const message = form.message?.value?.trim();

      if (!name || !email || !message) {
        showToast?.("Preenche todos os campos, por favor.", "error", { title: "Campos em falta", duration: 4000 });
        return;
      }

      if (typeof grecaptcha === "undefined") {
        showToast?.("reCAPTCHA não carregou. Atualiza a página e tenta de novo.", "error", {
          title: "reCAPTCHA",
          duration: 4500,
        });
        return;
      }

      const recaptchaToken = grecaptcha.getResponse();
      if (!recaptchaToken) {
        showToast?.("Confirma que não és um robô.", "error", { title: "Validação necessária", duration: 3500 });
        return;
      }

      btn.disabled = true;
      const originalText = btn.innerText;
      btn.innerText = "A enviar...";

      try {
        const serviceId = "service_iyooo0p";
        const templateId = "template_4wi67kr";
        await emailjs.send(serviceId, templateId, { name, email, message, "g-recaptcha-response": recaptchaToken });

        showToast?.("Vamos responder em breve.", "success", { title: "Mensagem enviada", duration: 4000 });
        form.reset();
        grecaptcha.reset();
      } catch (err) {
        console.error("EmailJS ERROR:", err);
        showToast?.("Não foi possível enviar. Tenta novamente ou usa o email direto.", "error", {
          title: "Falha no envio",
          duration: 5000,
        });
        grecaptcha.reset();
      } finally {
        btn.disabled = false;
        btn.innerText = originalText;
      }
    });
  })();

  /* -------- Âncoras suaves sem # no URL -------- */
  (function smoothAnchorsNoHash() {
    const inPageLinks = document.querySelectorAll('a[href^="#"]');

    inPageLinks.forEach((a) => {
      a.addEventListener("click", (e) => {
        const targetId = a.getAttribute("href");
        if (!targetId || targetId === "#") return;

        const el = document.querySelector(targetId);
        if (!el) return;

        e.preventDefault();
        const header = document.querySelector("nav");
        const offset = header ? header.offsetHeight : 0;
        const top = el.getBoundingClientRect().top + window.pageYOffset - offset;

        window.scrollTo({ top, behavior: "smooth" });

        const clean = window.location.pathname + window.location.search;
        history.replaceState(null, "", clean);
      });
    });

    if (window.location.hash) {
      const el = document.querySelector(window.location.hash);
      if (el) {
        const header = document.querySelector("nav");
        const offset = header ? header.offsetHeight : 0;
        const top = el.getBoundingClientRect().top + window.pageYOffset - offset;

        window.scrollTo({ top, behavior: "smooth" });
        const clean = window.location.pathname + window.location.search;
        history.replaceState(null, "", clean);
      }
    }
  })();

  /* -------- Link ativo na homepage -------- */
  (function activeLinkOnHome() {
    const path = window.location.pathname;
    if (path !== "/" && !path.endsWith("/index.html")) return;

    const links = document.querySelectorAll(".nav-link");
    const sectionIds = ["inicio", "servicos", "eventos", "sobre", "contactos"];

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (!visible) return;
        const id = visible.target.id;

        const activeLink = document.querySelector(`.nav-link[href*="#${id}"]`);
        if (activeLink) {
          links.forEach((l) => l.classList.remove("active"));
          activeLink.classList.add("active");
        }
      },
      { threshold: [0.5, 0.6, 0.75], rootMargin: "-20% 0px -20% 0px" }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
  })();

  /* -------- Marcar "Projetos" como ativo em /projetos -------- */
  (function highlightProjetosOnProjectsPage() {
    if (!location.pathname.startsWith("/projetos")) return;
    const proj = document.querySelector('a[href="/projetos/"]');
    if (proj) proj.classList.add("active");
  })();

  /* -------- Modal dos Projetos (CASE STUDY + fallback) -------- */
  (function portfolioModalV2() {
    const cards = document.querySelectorAll('.proj-card:not([data-disable-popup="1"])');
    const modal = document.getElementById("portfolio-modal");
    if (!cards.length || !modal) return;

    const pmTitle  = document.getElementById("pm-title");
    const pmClient = document.getElementById("pm-client");
    const pmTags   = document.getElementById("pm-tags");
    const pmBody   = document.getElementById("pm-body");
    const pmClose  = document.getElementById("pm-close");

    const open = () => {
      modal.classList.remove("hidden");
      document.body.classList.add("overflow-hidden");
    };
    const close = () => {
      modal.classList.add("hidden");
      document.body.classList.remove("overflow-hidden");
      pmBody.innerHTML = ""; // limpa conteúdo e pára vídeos
    };

    // --- Helpers ---
    const csv = (str="") => str.split("|").map(s=>s.trim()).filter(Boolean);

    // URLs correctos p/ autoplay/mute/loop (YouTube/Vimeo)
    function buildIframeSrc(raw) {
      try {
        const url = new URL(raw, location.origin);

        // YouTube
        if (/youtube\.com\/embed\//i.test(url.href)) {
          const id = (url.pathname.split("/").pop() || "").split("?")[0];
          url.searchParams.set("autoplay", "1");
          url.searchParams.set("mute", "1");
          url.searchParams.set("playsinline", "1");
          url.searchParams.set("controls", "0");
          url.searchParams.set("rel", "0");
          url.searchParams.set("modestbranding", "1");
          url.searchParams.set("loop", "1");
          if (id) url.searchParams.set("playlist", id); // necessário p/ loop
          return url.toString();
        }

        // Vimeo
        if (/player\.vimeo\.com\/video\//i.test(url.href)) {
          url.searchParams.set("autoplay", "1");
          url.searchParams.set("muted", "1");
          url.searchParams.set("loop", "1");
          url.searchParams.set("background", "0");
          url.searchParams.set("title", "0");
          url.searchParams.set("byline", "0");
          url.searchParams.set("portrait", "0");
          return url.toString();
        }
        return raw;
      } catch { return raw; }
    }

    function makeVideoEl(src) {
      // ficheiro direto => <video>
      if (/\.(mp4|webm|ogg)(\?.*)?$/i.test(src)) {
        const v = document.createElement("video");
        v.src = src;
        v.muted = true;
        v.loop = true;
        v.autoplay = true;
        v.playsInline = true;
        v.controls = false;
        v.setAttribute("muted","");
        v.setAttribute("playsinline","");
        v.className = "feed-video";
        return v;
      }
      // YouTube/Vimeo => <iframe>
      const iframe = document.createElement("iframe");
      iframe.src = buildIframeSrc(src);
      iframe.allow = "autoplay; encrypted-media; picture-in-picture; web-share";
      iframe.allowFullscreen = true;
      iframe.className = "feed-video";
      return iframe;
    }

    function buildCaseStudy(card) {
      const title    = card.dataset.title  || "";
      const client   = card.dataset.client || "";
      const tags     = card.dataset.tags   || "";
      const logo     = card.dataset.logo   || card.querySelector(".proj-logo")?.getAttribute("src") || "";
      const services = card.dataset.services || "";
      const images   = (card.dataset.images || "").split("|").map(s=>s.trim()).filter(Boolean);
      const reels    = (card.dataset.reels  || "").split("|").map(s=>s.trim()).filter(Boolean);

      pmTitle.textContent  = title;
      pmClient.textContent = client;
      pmTags.textContent   = tags;
      pmBody.innerHTML     = "";

      const wrap = document.createElement("div");
      wrap.className = "pm-case";

      /* ---------- HEADER (LOGO + INFO) – mantém a CAIXA ---------- */
      const header = document.createElement("div");
      header.style.display = "grid";
      header.style.gridTemplateColumns = "200px 1fr";
      header.style.gap = "20px";
      header.style.alignItems = "center";
      // a “caixa” que envolve logo + info:
      header.style.background = "#fff";
      header.style.border = "1px solid rgba(15,23,42,.08)";
      header.style.borderRadius = "16px";
      header.style.padding = "18px 20px";
      header.style.boxShadow = "0 10px 26px rgba(2,8,20,.05)";
      header.style.marginBottom = "16px";

      // LOGO (esquerda, a preto)
      const logoCol = document.createElement("div");
      logoCol.style.display = "flex";
      logoCol.style.alignItems = "center";
      logoCol.style.justifyContent = "flex-start";
      if (logo) {
        const img = document.createElement("img");
        img.src = logo;
        img.alt = client || title || "Logo";
        img.loading = "lazy";
        img.style.maxHeight = "64px";
        img.style.width = "auto";
        img.style.filter = "grayscale(1) brightness(0) contrast(1000%) opacity(.9)";
        logoCol.appendChild(img);
      }

      // INFO (direita) — apenas “Projeto” (sem Ano/Sector)
      const infoCol = document.createElement("div");
      const infoGrid = document.createElement("div");
      infoGrid.style.display = "grid";
      infoGrid.style.gridTemplateColumns = "repeat(3, minmax(0,1fr))";
      infoGrid.style.gap = "16px";

      const mk = (k, v) => {
        const b = document.createElement("div");
        const kk = document.createElement("div");
        kk.textContent = k.toUpperCase();
        kk.style.fontSize = "11px";
        kk.style.letterSpacing = ".06em";
        kk.style.fontWeight = "800";
        kk.style.color = "#64748b"; // slate-500
        kk.style.marginBottom = "6px";

        const vv = document.createElement("div");
        vv.textContent = v;
        vv.style.fontWeight = "700";
        vv.style.color = "#0f172a"; // slate-900
        vv.style.lineHeight = "1.25";

        b.appendChild(kk); b.appendChild(vv);
        return b;
      };

      if (services) {
        const projeto = mk("Project", services);
        projeto.style.gridColumn = "1 / -1"; // ocupa a largura total
        infoGrid.appendChild(projeto);
      }

      // (INTENCIONAL) sem ano / setor

      infoCol.appendChild(infoGrid);

      header.appendChild(logoCol);
      header.appendChild(infoCol);
      wrap.appendChild(header);
      /* ---------- /HEADER ---------- */

      /* ---------- GALERIA — imagens 4:5 com cover ---------- */
      if (images.length) {
        const gal = document.createElement("div");
        gal.style.display = "grid";
        gal.style.gridTemplateColumns = "repeat(3, minmax(0,1fr))";
        gal.style.gap = "12px";
        gal.style.margin = "8px 0 6px";

        images.forEach(src => {
          const cell = document.createElement("div");
          cell.style.position = "relative";
          cell.style.aspectRatio = "4 / 5";         // <-- 4:5
          cell.style.borderRadius = "14px";
          cell.style.overflow = "hidden";
          cell.style.background = "#f3f4f6";

          const im = document.createElement("img");
          im.src = src;
          im.alt = title || "Imagem do projeto";
          im.loading = "lazy";
          im.style.position = "absolute";
          im.style.inset = "0";
          im.style.width = "100%";
          im.style.height = "100%";
          im.style.objectFit = "cover";            // adapta-se ao 4:5
          im.style.objectPosition = "center";

          cell.appendChild(im);
          gal.appendChild(cell);
        });
        wrap.appendChild(gal);
      }

      
      /* ---------- /GALERIA ---------- */

      // Reels (telemóveis)
      if (reels.length) {
        const phones = document.createElement("div");
        phones.className = "pm-phones";
        phones.style.display = "grid";
        phones.style.gap = "24px";
        phones.style.padding = "22px 16px 8px";
        phones.style.alignItems = "center";

        const count = Math.min(3, reels.length);

        // 👉 Mantemos SEMPRE 3 colunas para preservar o mesmo tamanho
        phones.style.gridTemplateColumns = "repeat(3, 1fr)";

        const sources = reels.slice(0, count);

        const makeVideoEl = (src) => {
          if (/\.(mp4|webm|ogg)(\?.*)?$/i.test(src)) {
            const v = document.createElement("video");
            v.src = src;
            v.muted = true;
            v.loop = true;
            v.autoplay = true;
            v.playsInline = true;
            v.controls = false;
            v.setAttribute("muted", "");
            v.setAttribute("playsinline", "");
            v.style.width = "100%";
            v.style.height = "100%";
            v.style.objectFit = "cover";
            return v;
          }
          const iframe = document.createElement("iframe");
          iframe.src = src;
          iframe.allow = "autoplay; encrypted-media; picture-in-picture; web-share";
          iframe.allowFullscreen = true;
          iframe.style.width = "100%";
          iframe.style.height = "100%";
          iframe.style.border = "0";
          return iframe;
        };

        sources.forEach((src, i) => {
          const phone = document.createElement("div");
          phone.className = "phone";
          phone.style.position = "relative";
          phone.style.aspectRatio = "9 / 19.5";
          phone.style.borderRadius = "28px";
          phone.style.background = "#0b0b0b";
          phone.style.boxShadow = "0 18px 40px rgba(0,0,0,.35), inset 0 0 0 2px rgba(255,255,255,.06)";

          const screen = document.createElement("div");
          screen.className = "screen";
          screen.style.position = "absolute";
          screen.style.inset = "12px 10px 14px";
          screen.style.borderRadius = "22px";
          screen.style.overflow = "hidden";
          screen.appendChild(makeVideoEl(src));
          phone.appendChild(screen);

          wrap.className = "pm-case";
          const isMichael = card.classList.contains("case-michael");
          if (isMichael) wrap.classList.add("case-michael");


          // 👉 Posicionamento para manter o tamanho:
          if (count === 1) {
            // único vídeo na coluna do meio
            phone.style.gridColumn = "2 / span 1";
          } else if (count === 2) {
            // dois vídeos nas colunas 1 e 3
            phone.style.gridColumn = i === 0 ? "1 / span 1" : "3 / span 1";
          }
          // count === 3 -> sem gridColumn: ocupam 1,2,3 normalmente

          phones.appendChild(phone);
        });

        wrap.appendChild(phones);
      }



      /* ---------- /TELEMÓVEIS ---------- */

      pmBody.appendChild(wrap);
    }





    // Click -> abre modal
    cards.forEach((card) => {
      card.addEventListener("click", () => {
        const isCase =
          !!(card.dataset.logo || card.dataset.reels || card.dataset.images || card.dataset.services);
        if (isCase) buildCaseStudy(card); else buildLegacy(card);
        open();
      });
    });

    // Fechar (botão, ESC, clique fora do painel)
    pmClose?.addEventListener("click", close);
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !modal.classList.contains("hidden")) close();
    });

    const panel = modal.querySelector(".modal-panel");
        // --- Botão "X" dentro do pop-up ---
    let pmX = panel.querySelector('.pm-x');
    if (!pmX) {
      pmX = document.createElement('button');
      pmX.className = 'pm-x';
      pmX.type = 'button';
      pmX.setAttribute('aria-label', 'Fechar');
      pmX.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M6.225 4.811a1 1 0 011.414 0L12 9.172l4.361-4.361a1 1 0 111.414 1.414L13.414 10.586l4.361 4.361a1 1 0 01-1.414 1.414L12 12l-4.361 4.361a1 1 0 01-1.414-1.414l4.361-4.361-4.361-4.361a1 1 0 010-1.414z"/>
        </svg>
      `;
      panel.appendChild(pmX);
      pmX.addEventListener('click', (e) => { e.stopPropagation(); close(); });
    }

    modal.addEventListener("mousedown", (e) => {
      if (!panel) return;
      if (!panel.contains(e.target)) close();
    });
  })();

  /* -------- Filtro antigo do portfólio (opcional) -------- */
  (function legacyPortfolioFilters() {
    const btns = document.querySelectorAll("#portfolio-filters button");
    const items = Array.from(document.querySelectorAll(".portfolio-item"));
    if (!btns.length || !items.length) return;

    const fadeIn = (el, duration = 350) =>
      el
        .animate(
          [
            { opacity: 0, transform: "scale(0.98)" },
            { opacity: 1, transform: "scale(1)" },
          ],
          { duration, easing: "cubic-bezier(.22,.61,.36,1)", fill: "forwards" }
        )
        .finished;

    const fadeOut = (el, duration = 250) =>
      el
        .animate(
          [
            { opacity: 1, transform: "scale(1)" },
            { opacity: 0, transform: "scale(0.98)" },
          ],
          { duration, easing: "cubic-bezier(.4,0,.2,1)", fill: "forwards" }
        )
        .finished;

    const setActiveBtn = (active) => {
      btns.forEach((b) => {
        b.classList.remove("bg-cyan-500", "text-white", "shadow-sm", "active-filter");
        b.classList.add("bg-gray-100", "text-gray-800", "filter-hover");
      });
      active.classList.add("bg-cyan-500", "text-white", "shadow-sm", "active-filter");
      active.classList.remove("bg-gray-100", "text-gray-800", "filter-hover");
    };

    const showItem = async (el) => {
      el.style.display = "";
      await fadeIn(el);
    };
    const hideItem = async (el) => {
      await fadeOut(el);
      el.style.display = "none";
    };

    items.forEach((el) => {
      el.style.opacity = 1;
      el.style.transform = "scale(1)";
      el.style.display = "";
    });

    const defaultBtn = document.querySelector('[data-filter="*"]');
    if (defaultBtn) setActiveBtn(defaultBtn);

    let running = false;

    btns.forEach((btn) => {
      btn.addEventListener("click", async () => {
        if (running) return;
        running = true;
        setActiveBtn(btn);

        const filter = btn.getAttribute("data-filter");
        const className = filter === "*" ? null : filter.slice(1);

        const toShow = [];
        const toHide = [];

        items.forEach((el) => {
          const has = className ? el.classList.contains(className) : true;
          const isHidden = el.style.display === "none";
          if (has && isHidden) toShow.push(el);
          if (!has && !isHidden) toHide.push(el);
        });

        await Promise.all(toHide.map(hideItem));
        await Promise.all(toShow.map(showItem));
        running = false;
      });
    });

    btns.forEach((b) => b.classList.add("filter-hover"));
  })();

  /* -------- Spotlight no hero -------- */
  (function heroSpotlight() {
    const hero = document.getElementById("inicio");
    const overlay = document.querySelector("#inicio .hero-overlay");
    if (!hero || !overlay) return;

    const update = (clientX, clientY) => {
      const r = hero.getBoundingClientRect();
      const x = ((clientX - r.left) / r.width) * 100;
      const y = ((clientY - r.top) / r.height) * 100;
      overlay.style.setProperty("--mx", `${x}%`);
      overlay.style.setProperty("--my", `${y}%`);
    };

    hero.addEventListener("mousemove", (e) => update(e.clientX, e.clientY));
    hero.addEventListener("mouseenter", (e) => update(e.clientX, e.clientY));

    const isTouch = matchMedia("(pointer: coarse)").matches;
    if (isTouch) {
      overlay.style.setProperty("--mx", "50%");
      overlay.style.setProperty("--my", "50%");
      overlay.style.setProperty("--spot", "300px");
      overlay.style.setProperty("--dark", "0.5");
    }
  })();

  /* -------- Logos marquee: duplicação + loop com largura real -------- */
  (function logosMarqueeLoop() {
    const track = document.querySelector('.logo-track');
    if (!track) return;

    const SPEED_PX_PER_SEC = 70;
    const MIN_DURATION_S   = 20;

    if (![...track.children].some(n => n.classList?.contains('clone'))) {
      const originals = Array.from(track.children);
      originals.forEach(n => { const c = n.cloneNode(true); c.classList.add('clone'); track.appendChild(c); });
    }

    const setLoopWidth = () => {
      const loopPx = track.scrollWidth / 2;
      track.style.setProperty('--loop-px', `${loopPx}px`);
      const dur = Math.max(MIN_DURATION_S, loopPx / SPEED_PX_PER_SEC);
      track.style.setProperty('--marquee-duration', `${dur}s`);
    };

    const onReady = () => setLoopWidth();
    if (document.readyState === 'complete') onReady(); else window.addEventListener('load', onReady);

    let rAF = null;
    window.addEventListener('resize', () => {
      if (rAF) cancelAnimationFrame(rAF);
      rAF = requestAnimationFrame(setLoopWidth);
    });
  })();

  /* -------- Scroll Reveal (IntersectionObserver) -------- */
  (function scrollReveal(){
    // se o user preferir menos movimento, não ativa
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const obs = new IntersectionObserver((entries)=>{
      entries.forEach(e=>{
        if (e.isIntersecting){
          e.target.classList.add('in');
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "-8% 0px -8% 0px" });

    const add = (selector, variant='up', stagger=90, extraDelay=0) => {
      const els = document.querySelectorAll(selector);
      let i = 0;
      els.forEach(el=>{
        el.classList.add('sr');
        if (variant) el.classList.add(`sr-${variant}`);
        el.style.setProperty('--sr-delay', `${extraDelay + i*stagger}ms`);
        obs.observe(el);
        i++;
      });
    };

    // Headings principais “de cima para baixo”
    add('#sobre h2, #servicos .heading-decor, #eventos h2, #contactos h2', 'down', 0);

    // Parágrafos da intro (stagger suave)
    add('#sobre p', 'up', 120);

    // Cards dos serviços em grelha (stagger por ordem)
    add('#servicos .service-card', 'up', 100);

    // Carrossel de eventos + CTA
    add('#eventos .carousel-container', 'zoom', 0);
    add('#servicos .pill-cta, .pill-projetos', 'up', 0);

    // Logos (track inteiro aparece suave)
    add('.logo-carousel', 'up', 0);

    // Colunas do footer
    add('footer .grid > *', 'up', 80);

    // Hero: botão aparece depois do texto
    const heroTitle  = document.querySelector('#inicio h1');
    const heroSub    = document.querySelector('#inicio .hero-subcopy');
    const heroBtn    = document.querySelector('#inicio .hero-btn');
    [heroTitle, heroSub, heroBtn].forEach((el,i)=>{
      if (!el) return;
      el.classList.add('sr','sr-down');
      el.style.setProperty('--sr-delay', `${i*120}ms`);
      obs.observe(el);
    });
  })();




}); // DOMContentLoaded end


/* -------- Projetos: filtros simples + ordem aleatória -------- */
(function projectsSimpleFilters(){
  const container = document.querySelector('#proj-filters .max-w-7xl');
  const scope  = document.querySelector('main .max-w-7xl .proj-grid');
  if(!container || !scope) return;

  // 1) Recolhe os cartões e dá-lhes um "rank" aleatório
  const allCards = Array.from(scope.querySelectorAll('.proj-card'));
  const RESHUFFLE_EACH_CLICK = true; // ← põe true se quiseres baralhar em cada clique de filtro

  function seedRandomRanks() {
    allCards.forEach(c => c.dataset.rand = Math.random().toString().slice(2));
  }
  seedRandomRanks();

  function appendInRandomOrder(cards) {
    // ordena por rank e re-apende (sem flicker)
    const frag = document.createDocumentFragment();
    cards
      .slice()
      .sort((a,b) => (a.dataset.rand|0) - (b.dataset.rand|0))
      .forEach(el => frag.appendChild(el));
    scope.appendChild(frag);
  }

  // 2) Apanha categorias via data-cat
  const cats = Array.from(
    new Set(
      allCards
        .flatMap(c => (c.dataset.cat || '').split(','))
        .map(s => s.trim())
        .filter(Boolean)
    )
  );

  // 3) UI mínima dos filtros (igual ao que tinhas)
  const wrap = document.createElement('div');  wrap.className = 'pf-wrap';
  const rail = document.createElement('div');  rail.className = 'pf-rail';
  const indicator = document.createElement('div'); indicator.className = 'pf-indicator';
  rail.appendChild(indicator);

  const mk = (label)=>{ const b=document.createElement('button');
    b.type='button'; b.className='pf-chip'; b.dataset.value=label; b.textContent=label; return b; };

  const btnAll = mk('TODOS'); rail.appendChild(btnAll);
  const btns = cats.map(c => mk(c)); btns.forEach(b=>rail.appendChild(b));
  wrap.appendChild(rail); container.appendChild(wrap);

  let active = 'ALL', activeBtn = btnAll;

  function setActive(btn){
    activeBtn = btn;
    rail.querySelectorAll('.pf-chip').forEach(x=>x.classList.remove('is-active'));
    btn.classList.add('is-active');
  }
  function posIndicator(btn){
    const br = btn.getBoundingClientRect();
    const rr = rail.getBoundingClientRect();
    const left = (br.left - rr.left) + rail.scrollLeft;
    const top  = (parseFloat(getComputedStyle(rail).paddingTop) || 0);
    indicator.style.transform = `translate3d(${left}px, ${top}px, 0)`;
    indicator.style.width  = `${br.width}px`;
    indicator.style.height = `${br.height}px`;
  }
  function center(btn){
    const target = btn.offsetLeft - (rail.clientWidth/2 - btn.offsetWidth/2);
    rail.scrollTo({left: Math.max(0, target), behavior: 'smooth'});
  }

  // 4) Aplica filtro + ordem aleatória
  function apply(){
    // (opcional) baralhar sempre que se clica num filtro
    if (RESHUFFLE_EACH_CLICK) seedRandomRanks();

    const wantAll = (active==='ALL');
    const visible = [];

    allCards.forEach(c=>{
      const cardCats = (c.dataset.cat || '').split(',').map(s => s.trim());
      const show = wantAll || cardCats.includes(active);
      c.style.display = show ? '' : 'none';
      if (show) visible.push(c);
    });

    // Re-apende os visíveis na ordem aleatória
    appendInRandomOrder(visible);
  }

  // normaliza strings (sem acentos, lowercase, sem espaços duplos)
  const norm = (s='') => s
    .toString()
    .normalize('NFD').replace(/[\u0300-\u036f]/g,'')
    .toLowerCase().replace(/\s+/g,' ')
    .trim();

  // cria um mapa label-normalizado -> botão
  const btnMap = new Map();
  [btnAll, ...btns].forEach(b => btnMap.set(norm(b.dataset.value || b.textContent || ''), b));

  // tenta obter categoria da URL (?cat=...) ou do hash (#cat=...)
  function getCatFromURL(){
    const q = new URLSearchParams(location.search).get('cat');
    if (q) return q;
    const m = location.hash.match(/cat=([^&]+)/i);
    return m ? decodeURIComponent(m[1]) : '';
  }


  // 5) Eventos
  btnAll.addEventListener('click', ()=>{ active='ALL'; setActive(btnAll); posIndicator(btnAll); center(btnAll); apply(); });
  btns.forEach(b=>{
    b.addEventListener('click', ()=>{ active=b.dataset.value; setActive(b); posIndicator(b); center(b); apply(); });
  });

  // 6) Inicialização
  const raf = (fn)=>{ let t=null; return (...a)=>{ if(t) cancelAnimationFrame(t); t=requestAnimationFrame(()=>fn(...a)); }; };
  rail.addEventListener('scroll', raf(()=>posIndicator(activeBtn)), {passive:true});
  window.addEventListener('resize', raf(()=>posIndicator(activeBtn)));
  new ResizeObserver(raf(()=>posIndicator(activeBtn))).observe(rail);

  // ---- Inicialização ----
setActive(btnAll);

  // posiciona indicador depois de as fontes carregarem (evita “salto”)
  (document.fonts?.ready || Promise.resolve()).then(()=>{
    posIndicator(btnAll);

    // primeira randomização global
    appendInRandomOrder(allCards);

    // aplica filtro vindo da URL (se existir)
    const wanted = getCatFromURL();
    if (wanted) {
      const key = norm(wanted);
      const targetBtn = btnMap.get(key);
      if (targetBtn) {
        active = targetBtn.dataset.value;
        setActive(targetBtn);
        posIndicator(targetBtn);
        center(targetBtn);
        apply();
        return; // já filtrou; não cai no apply() default
      }
    }

    // senão, mostra ALL
    apply();
  });
})();
