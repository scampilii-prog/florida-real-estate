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
