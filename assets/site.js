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
    contact: "Contact",
heroTitle: "Find Your Place on Florida's Gulf Coast"
  },
  es: {
    search: "Buscar propiedades",
    buy: "Comprar",
    sell: "Vender",
    communities: "Áreas y comunidades",
    calculators: "Calculadoras",
    about: "Acerca de mí",
    contact: "Contacto",
heroTitle: "Encuentra tu lugar en la costa del Golfo de Florida"
  },
  it: {
    search: "Cerca immobili",
    buy: "Acquistare",
    sell: "Vendere",
    communities: "Zone e comunità",
    calculators: "Calcolatori",
    about: "Chi sono",
    contact: "Contatti",
heroTitle: "Trova il tuo posto sulla costa del Golfo della Florida"
  },
  pt: {
    search: "Buscar imóveis",
    buy: "Comprar",
    sell: "Vender",
    communities: "Áreas e comunidades",
    calculators: "Calculadoras",
    about: "Sobre mim",
    contact: "Contato",
heroTitle: "Encontre o seu lugar na costa do Golfo da Flórida"
  }
};
function applySiteLanguage() {
  const language = getSiteLanguage();
  const translations = SITE_TRANSLATIONS[language];
document.documentElement.lang = language;
const indicator = document.getElementById("currentLanguage");
if (indicator) indicator.textContent = {
  en: "English",
  es: "Español",
  it: "Italiano",
  pt: "Português"
}[language];

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
