// ─── Analytics ────────────────────────────────────────────────
// Substitua as duas constantes abaixo pelas suas credenciais.
// Como este é um site estático (client-side only), o WRITE_KEY ficará
// exposto no bundle — use um key com permissão somente de escrita.
const ANALYTICS_ENDPOINT = "http://74.234.32.215/api/v1/events";
const WRITE_KEY = "79cb76434616a567049793968cb1997e4d3836e61b5da748";

function getOrCreateStorageId(key, storage) {
  try {
    const existing = storage.getItem(key);
    if (existing) return existing;
    const value = crypto.randomUUID();
    storage.setItem(key, value);
    return value;
  } catch {
    return crypto.randomUUID();
  }
}

async function trackEvent(eventName, options = {}) {
  try {
    const visitorId = getOrCreateStorageId("afp_visitor_id", localStorage);
    const sessionId = getOrCreateStorageId("afp_session_id", sessionStorage);
    await fetch(ANALYTICS_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Analytics-Key": WRITE_KEY
      },
      body: JSON.stringify({
        eventName,
        visitorId,
        sessionId,
        path: options.path ?? window.location.pathname,
        metadata: options.metadata ?? {}
      })
    });
  } catch {
    // Silent fail — analytics never quebram a página
  }
}

// Expõe globalmente para que script.js possa chamar
window.trackEvent = trackEvent;

document.addEventListener("DOMContentLoaded", () => {

  // ── 1. page_view ─────────────────────────────────────────────
  // Dispara automaticamente em cada página ao carregar
  trackEvent("page_view", {
    metadata: { title: document.title }
  });

  // ── 2. nav_click ─────────────────────────────────────────────
  // Links da navbar: home, social, projects, contact
  document.querySelectorAll(".nav a").forEach(link => {
    link.addEventListener("click", () => {
      trackEvent("nav_click", {
        metadata: {
          label: link.textContent.trim(),
          href: link.getAttribute("href")
        }
      });
    });
  });

  // ── 3. cta_click ─────────────────────────────────────────────
  // Botões CTA da home: "VER PROJETOS" e "ENTRAR EM CONTATO"
  // channel = "hero" pois ficam no corpo principal da página
  document.querySelectorAll(".cta-card .project-link").forEach(link => {
    link.addEventListener("click", () => {
      trackEvent("cta_click", {
        metadata: {
          label: link.textContent.trim(),
          href: link.getAttribute("href"),
          channel: "hero"
        }
      });
    });
  });

  // ── 4. social_click ──────────────────────────────────────────
  // Links sociais: GitHub, Instagram, X, Discord, LinkedIn, Email
  document.querySelectorAll("#links a").forEach(link => {
    link.addEventListener("click", () => {
      const platform =
        link.querySelector(".label")?.textContent.trim() ||
        link.getAttribute("aria-label") ||
        link.href;
      trackEvent("social_click", {
        metadata: { platform, href: link.href }
      });
    });
  });

  // ── 5. project_link_click ────────────────────────────────────
  // Botões WEBSITE / GITHUB nos cards de projetos (projetos.html)
  document.querySelectorAll(".project-links .project-link").forEach(link => {
    link.addEventListener("click", () => {
      const card = link.closest(".project-card");
      const project = card?.querySelector(".project-title")?.textContent.trim() ?? "unknown";
      trackEvent("project_link_click", {
        metadata: {
          project,
          type: link.textContent.trim(),   // "WEBSITE" ou "GITHUB"
          href: link.href
        }
      });
    });
  });

  // ── 6. contact_form_submit ───────────────────────────────────
  // Formulário de contato (contact.html) via Formspree
  const contactForm = document.querySelector(".contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", () => {
      trackEvent("contact_form_submit");
    });
  }

});
