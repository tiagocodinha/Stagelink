/* ========= EmailJS ========= */
// Carrega SDK no HTML. Aqui inicializamos e tratamos o envio.
(function initEmailJS() {
  if (!window.emailjs) return;
  emailjs.init({ publicKey: "w8cq1CUL3lCf5PJgq" });
})();

/* ========= Toast util ========= */
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
    type === "success"
      ? "border-emerald-200"
      : type === "error"
      ? "border-rose-200"
      : "border-slate-200",
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
  textWrap.innerHTML = `
    <p class="text-sm font-semibold ${
      type === "success" ? "text-emerald-800" : type === "error" ? "text-rose-800" : "text-slate-800"
    }">${title}</p>
    <p class="text-sm mt-0.5 text-slate-600">${message}</p>
  `;

  const closeBtn = document.createElement("button");
  closeBtn.type = "button";
  closeBtn.className = "ml-1 shrink-0 text-slate-400 hover:text-slate-700 transition-colors";
  closeBtn.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.3 5.71a1 1 0 00-1.41 0L12 10.59 7.11 5.7A1 1 0 105.7 7.11L10.59 12l-4.9 4.89a1 1 0 101.41 1.41L12 13.41l4.89 4.9a1 1 0 001.41-1.41L13.41 12l4.9-4.89a1 1 0 000-1.4z"/>
    </svg>
  `;

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

/* ========= App init ========= */
document.addEventListener("DOMContentLoaded", () => {
  /* --- Mobile menu --- */
  const mobileMenuBtn = document.querySelector(".mobile-menu-button");
  const mobileMenu = document.getElementById("mobile-menu");

  function toggleMobileMenu() {
    mobileMenu.classList.toggle("active");
    const isOpen = mobileMenu.classList.contains("active");
    mobileMenu.setAttribute("aria-hidden", String(!isOpen));
  }
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener("click", toggleMobileMenu);

    // Fechar ao clicar nas âncoras do menu mobile
    mobileMenu.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => mobileMenu.classList.remove("active"))
    );
  }

  /* --- Carousel --- */
  let currentSlide = 0;
  const slides = Array.from(document.querySelectorAll(".carousel-slide"));
  const dotsContainer = document.getElementById("carousel-dots");
  const prevBtn = document.querySelector(".carousel-prev");
  const nextBtn = document.querySelector(".carousel-next");
  let slideInterval = null;

  function updateSlides() {
    slides.forEach((s, i) => s.classList.toggle("active", i === currentSlide));
    const dots = dotsContainer?.children || [];
    for (let i = 0; i < dots.length; i++) {
      dots[i].className = `w-3 h-3 rounded-full transition-colors ${
        i === currentSlide ? "bg-black" : "bg-gray-300"
      }`;
    }
  }
  function goToSlide(i) {
    currentSlide = (i + slides.length) % slides.length;
    updateSlides();
  }
  function nextSlide() {
    goToSlide(currentSlide + 1);
  }
  function prevSlide() {
    goToSlide(currentSlide - 1);
  }
  function startAuto() {
    stopAuto();
    slideInterval = setInterval(nextSlide, 5000);
  }
  function stopAuto() {
    if (slideInterval) clearInterval(slideInterval);
  }

  if (slides.length) {
    // Cria dots
    if (dotsContainer) {
      slides.forEach((_, index) => {
        const dot = document.createElement("button");
        dot.className = `w-3 h-3 rounded-full transition-colors ${
          index === 0 ? "bg-black" : "bg-gray-300"
        }`;
        dot.ariaLabel = `Ir para slide ${index + 1}`;
        dot.addEventListener("click", () => goToSlide(index));
        dotsContainer.appendChild(dot);
      });
    }
    // Navegação
    prevBtn?.addEventListener("click", prevSlide);
    nextBtn?.addEventListener("click", nextSlide);

    // Pausa ao passar o rato nos slides
    slides.forEach((slide) => {
      slide.addEventListener("mouseenter", stopAuto);
      slide.addEventListener("mouseleave", startAuto);
    });

    // Inicia
    updateSlides();
    startAuto();
  }

  /* --- Formulário de contacto + EmailJS --- */
  const form = document.getElementById("contactForm");
  const btn = document.getElementById("sendBtn");
  if (form && btn) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const name = form.name?.value?.trim();
      const email = form.email?.value?.trim();
      const message = form.message?.value?.trim();

      if (!name || !email || !message) {
        showToast("Preenche todos os campos, por favor.", "error", {
          title: "Campos em falta",
          duration: 4000,
        });
        return;
      }

      btn.disabled = true;
      const originalText = btn.innerText;
      btn.innerText = "A enviar...";

      try {
        const serviceId = "service_iyooo0p";
        const templateId = "template_4wi67kr";

        await emailjs.send(serviceId, templateId, { name, email, message });

        showToast("Vamos responder em breve.", "success", {
          title: "Mensagem enviada",
          duration: 4000,
        });
        form.reset();
      } catch (err) {
        console.error("EmailJS ERROR:", err);
        showToast("Não foi possível enviar. Tenta novamente ou usa o email direto.", "error", {
          title: "Falha no envio",
          duration: 5000,
        });
      } finally {
        btn.disabled = false;
        btn.innerText = originalText;
      }
    });
  }
});

/* Opcional: exemplos de toasts iniciais (remover se não quiser auto-exibir)
showToast('Email enviado com sucesso! Vamos responder em breve.', 'success', {
  title: 'Mensagem enviada',
  duration: 4000
});
showToast('Não foi possível enviar. Tenta novamente ou usa o email direto.', 'error', {
  title: 'Falha no envio',
  duration: 5000
});
*/
