// Florida Real Estate
// Shared website functions
// Languages: English, Spanish, Italian, Portuguese

const SITE_LANGUAGES = ["en", "es", "it", "pt"];

function getSiteLanguage() {
  const saved = localStorage.getItem("siteLanguage");
  return SITE_LANGUAGES.includes(saved) ? saved : "en";
}

function setSiteLanguage(language) {
  if (!SITE_LANGUAGES.includes(language)) return;
  localStorage.setItem("siteLanguage", language);
  document.documentElement.lang = language;
  window.dispatchEvent(new CustomEvent("siteLanguageChanged", {
    detail: { language }
  }));
}
const SITE_TRANSLATIONS = {
  en: {
    search: "Search Properties",
    buy: "Buy",
    sell: "Sell",
    communities: "Areas & Communities",
    calculators: "Calculators",
    about: "About",
    contact: "Contact"
  },
  es: {
    search: "Buscar propiedades",
    buy: "Comprar",
    sell: "Vender",
    communities: "Áreas y comunidades",
    calculators: "Calculadoras",
    about: "Acerca de mí",
    contact: "Contacto"
  },
  it: {
    search: "Cerca immobili",
    buy: "Acquistare",
    sell: "Vendere",
    communities: "Zone e comunità",
    calculators: "Calcolatori",
    about: "Chi sono",
    contact: "Contatti"
  },
  pt: {
    search: "Buscar imóveis",
    buy: "Comprar",
    sell: "Vender",
    communities: "Áreas e comunidades",
    calculators: "Calculadoras",
    about: "Sobre mim",
    contact: "Contato"
  }
};
function applySiteLanguage() {
  const language = getSiteLanguage();
  const translations = SITE_TRANSLATIONS[language];

  document.documentElement.lang = language;

  document.querySelectorAll("[data-i18n]").forEach(element => {
    const key = element.getAttribute("data-i18n");

    if (translations[key]) {
      element.textContent = translations[key];
    }
  });
}

window.addEventListener("siteLanguageChanged", applySiteLanguage);

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", applySiteLanguage);
} else {
  applySiteLanguage();
}
