// OceanFL multilingual site translations — English, Español, Italiano, Português.
const SITE_LANGUAGES = ["en", "es", "it", "pt"];
function getSiteLanguage() {
  try { const lang=localStorage.getItem("siteLanguage"); return SITE_LANGUAGES.includes(lang) ? lang : "en"; }
  catch (_) { return "en"; }
}
function setSiteLanguage(language) {
  if (!SITE_LANGUAGES.includes(language)) return;
  try { localStorage.setItem("siteLanguage", language); } catch (_) {}
  applySiteLanguage();
  window.dispatchEvent(new CustomEvent("siteLanguageChanged", { detail: { language } }));
}
const SITE_TRANSLATIONS = {
  "en": {
    "brandSubtitle": "Florida Gulf Coast Real Estate",
    "backHome": "← Back to Home",
    "backCommunities": "← Explore Communities",
    "search": "Search Properties",
    "buy": "Buy",
    "sell": "Sell",
    "newConstruction": "New Construction",
    "waterfront": "Waterfront",
    "communities": "Areas & Communities",
    "calculators": "Calculators",
    "qa": "1,000 Q&A",
    "about": "About",
    "contact": "Contact",
    "heroLabel": "Florida Gulf Coast",
    "heroTitle": "Find Your Place on Florida's Gulf Coast",
    "heroDescription": "Waterfront homes, new construction and exceptional communities from Boca Grande to Sarasota.",
    "findHouse": "Find a House",
    "findCondo": "Find a Condo",
    "introLabel": "Southwest Florida",
    "introTitle": "Real Estate Guidance Without the Complexity",
    "introDescription": "Explore homes, communities and opportunities along Florida's Gulf Coast with straightforward information for buyers and sellers.",
    "choiceHome": "Find a Home",
    "choiceHomeDescription": "Search available properties throughout Florida's Gulf Coast.",
    "choiceSearch": "Search Properties →",
    "choiceNewDescription": "Discover new communities, builders and available homes.",
    "choiceNewLink": "Explore New Homes →",
    "choiceWaterDescription": "Explore Gulf-access, canal-front and waterfront living.",
    "choiceWaterLink": "Explore Waterfront →",
    "footerTagline": "Your guide to real estate on Florida’s Gulf Coast.",
    "footerExplore": "Explore",
    "footerContact": "Contact & Brokerage",
    "footerLicense": "Florida License #SL3363040",
    "footerRights": "All rights reserved.",
    "footerDisclaimer": "Information is for general purposes and is not a guarantee of property availability.",
    "askTino": "Ask Tino",
    "tinoSubtitle": "Florida Gulf Coast Real Estate Assistant",
    "tinoWelcome": "Welcome! I'm Tino's virtual assistant. Are you looking to buy, sell, invest, or simply explore Florida's Gulf Coast?",
    "tinoBuy": "I want to buy",
    "tinoSell": "I want to sell",
    "tinoInvest": "I'm investing",
    "tinoCall": "Book a call",
    "tinoPlaceholder": "Ask Tino anything...",
    "tinoDisclaimer": "Virtual assistant · Not a licensed real estate agent",
    "tinoThinking": "Tino is thinking...",
    "tinoUnavailable": "Tino is temporarily unavailable. Please try again.",
    "searchTitleHouse": "Find a House on the Gulf Coast",
    "searchTitleCondo": "Find a Condo on the Gulf Coast",
    "searchIntro": "Explore real estate opportunities in Southwest Florida's most desirable coastal communities. Choose your property type and preferred location.",
    "searchByLocation": "Explore by Location",
    "searchSelect": "Select a community to view available properties through OneHome.",
    "viewProperties": "View Properties →",
    "requestProperties": "Request Properties →",
    "searchNotice": "Property collections are provided through OneHome. Individual collections may include multiple property types. Availability and listing details should be confirmed directly in OneHome.",
    "locRotonda": "Golf communities, peaceful neighborhoods and Gulf Coast living.",
    "locBoca": "Island living, beaches and distinctive coastal homes.",
    "locCape": "Waterfront neighborhoods and access to the Gulf.",
    "locEnglewood": "Coastal communities with beaches and boating.",
    "locVenice": "Historic downtown charm and Gulf Coast neighborhoods.",
    "locNokomis": "Relaxed coastal living and waterfront properties.",
    "locPunta": "Canal-front neighborhoods and boating lifestyle.",
    "locSiesta": "Barrier island living and coastal residences.",
    "locWellen": "Newer communities and growing Southwest Florida neighborhoods.",
    "rotondaLabel": "Charlotte County · Southwest Florida",
    "rotondaTitle": "Discover Rotonda West",
    "rotondaHero": "Explore a peaceful residential community known for golf courses, freshwater canals, outdoor recreation and convenient access to Florida's beautiful Gulf Coast.",
    "rotondaExplore": "Explore Available Properties →",
    "rotondaLiving": "Living in Rotonda West, Florida",
    "rotondaIntro": "Rotonda West is a planned residential community in Charlotte County, Southwest Florida. Recognized for its distinctive circular layout, golf courses, freshwater canals and quiet neighborhoods, it offers an appealing lifestyle for year-round residents and seasonal homeowners. Nearby destinations include Englewood, Cape Haze, Placida and Boca Grande.",
    "rotondaGolf": "Golf & Recreation",
    "rotondaGolfText": "Enjoy a community shaped by golf courses, green spaces and opportunities for outdoor recreation.",
    "rotondaCanals": "Canals & Residential Living",
    "rotondaCanalsText": "Explore established neighborhoods, freshwater canal surroundings and a variety of residential property options.",
    "rotondaBeaches": "Nearby Gulf Beaches",
    "rotondaBeachesText": "Enjoy convenient access to Gulf Coast destinations, including Englewood Beach and Boca Grande.",
    "rotondaPhotoNote": "Photography is illustrative of Florida lifestyles and does not necessarily depict locations or properties within Rotonda West.",
    "rotondaCta": "Find Your Property in Rotonda West",
    "rotondaCtaText": "Browse available homes, condominiums and other residential properties.",
    "rotondaListings": "View Rotonda West Listings →"
  },
  "es": {
    "brandSubtitle": "Bienes raíces en la costa del Golfo de Florida",
    "backHome": "← Volver al inicio",
    "backCommunities": "← Explorar comunidades",
    "search": "Buscar propiedades",
    "buy": "Comprar",
    "sell": "Vender",
    "newConstruction": "Obra nueva",
    "waterfront": "Propiedades frente al agua",
    "communities": "Áreas y comunidades",
    "calculators": "Calculadoras",
    "qa": "1.000 preguntas y respuestas",
    "about": "Acerca de mí",
    "contact": "Contacto",
    "heroLabel": "Costa del Golfo de Florida",
    "heroTitle": "Encuentra tu lugar en la costa del Golfo de Florida",
    "heroDescription": "Casas frente al agua, construcciones nuevas y comunidades excepcionales desde Boca Grande hasta Sarasota.",
    "findHouse": "Buscar una casa",
    "findCondo": "Buscar un condominio",
    "introLabel": "Suroeste de Florida",
    "introTitle": "Asesoramiento inmobiliario sin complicaciones",
    "introDescription": "Explora viviendas, comunidades y oportunidades en la costa del Golfo de Florida con información clara para compradores y vendedores.",
    "choiceHome": "Encuentra tu hogar",
    "choiceHomeDescription": "Busca propiedades disponibles en toda la costa del Golfo de Florida.",
    "choiceSearch": "Buscar propiedades →",
    "choiceNewDescription": "Descubre nuevas comunidades, constructores y viviendas disponibles.",
    "choiceNewLink": "Explorar viviendas nuevas →",
    "choiceWaterDescription": "Explora viviendas con acceso al Golfo, junto a canales y frente al agua.",
    "choiceWaterLink": "Explorar propiedades frente al agua →",
    "footerTagline": "Tu guía inmobiliaria en la costa del Golfo de Florida.",
    "footerExplore": "Explorar",
    "footerContact": "Contacto y correduría",
    "footerLicense": "Licencia de Florida #SL3363040",
    "footerRights": "Todos los derechos reservados.",
    "footerDisclaimer": "Información general; la disponibilidad de propiedades no está garantizada.",
    "askTino": "Pregunta a Tino",
    "tinoSubtitle": "Asistente inmobiliario de la costa del Golfo de Florida",
    "tinoWelcome": "¡Bienvenido! Soy el asistente virtual de Tino. ¿Quieres comprar, vender, invertir o simplemente explorar la costa del Golfo de Florida?",
    "tinoBuy": "Quiero comprar",
    "tinoSell": "Quiero vender",
    "tinoInvest": "Quiero invertir",
    "tinoCall": "Programar una llamada",
    "tinoPlaceholder": "Pregúntale a Tino...",
    "tinoDisclaimer": "Asistente virtual · No es agente inmobiliario con licencia",
    "tinoThinking": "Tino está pensando...",
    "tinoUnavailable": "Tino no está disponible temporalmente. Inténtalo de nuevo.",
    "searchTitleHouse": "Encuentra una casa en la costa del Golfo",
    "searchTitleCondo": "Encuentra un condominio en la costa del Golfo",
    "searchIntro": "Explora oportunidades inmobiliarias en las comunidades costeras más atractivas del suroeste de Florida. Elige el tipo de propiedad y la ubicación que prefieras.",
    "searchByLocation": "Explorar por ubicación",
    "searchSelect": "Selecciona una comunidad para ver las propiedades disponibles en OneHome.",
    "viewProperties": "Ver propiedades →",
    "requestProperties": "Solicitar propiedades →",
    "searchNotice": "Las colecciones de propiedades se ofrecen a través de OneHome. Pueden incluir diferentes tipos de inmuebles. Confirma la disponibilidad y los detalles directamente en OneHome.",
    "locRotonda": "Comunidades de golf, vecindarios tranquilos y vida junto al Golfo.",
    "locBoca": "Vida isleña, playas y viviendas costeras singulares.",
    "locCape": "Barrios frente al agua y acceso al Golfo.",
    "locEnglewood": "Comunidades costeras con playas y navegación.",
    "locVenice": "Encanto histórico del centro y barrios junto al Golfo.",
    "locNokomis": "Vida costera relajada y propiedades frente al agua.",
    "locPunta": "Barrios junto a canales y estilo de vida náutico.",
    "locSiesta": "Vida en islas barrera y residencias costeras.",
    "locWellen": "Comunidades nuevas y barrios en crecimiento del suroeste de Florida.",
    "rotondaLabel": "Condado de Charlotte · Suroeste de Florida",
    "rotondaTitle": "Descubre Rotonda West",
    "rotondaHero": "Explora una tranquila comunidad residencial conocida por sus campos de golf, canales de agua dulce, actividades al aire libre y fácil acceso a la hermosa costa del Golfo de Florida.",
    "rotondaExplore": "Explorar propiedades disponibles →",
    "rotondaLiving": "Vivir en Rotonda West, Florida",
    "rotondaIntro": "Rotonda West es una comunidad residencial planificada en el condado de Charlotte, en el suroeste de Florida. Destaca por su diseño circular, campos de golf, canales de agua dulce y barrios tranquilos. Ofrece un estilo de vida atractivo tanto para residentes permanentes como de temporada. Cerca se encuentran Englewood, Cape Haze, Placida y Boca Grande.",
    "rotondaGolf": "Golf y recreación",
    "rotondaGolfText": "Disfruta de campos de golf, espacios verdes y oportunidades para actividades al aire libre.",
    "rotondaCanals": "Canales y vida residencial",
    "rotondaCanalsText": "Explora barrios establecidos, canales de agua dulce y diversas opciones de vivienda.",
    "rotondaBeaches": "Playas cercanas del Golfo",
    "rotondaBeachesText": "Disfruta del acceso a destinos costeros como Englewood Beach y Boca Grande.",
    "rotondaPhotoNote": "Las fotografías son ilustrativas del estilo de vida de Florida y no necesariamente muestran lugares o propiedades de Rotonda West.",
    "rotondaCta": "Encuentra tu propiedad en Rotonda West",
    "rotondaCtaText": "Consulta casas, condominios y otras propiedades residenciales disponibles.",
    "rotondaListings": "Ver propiedades en Rotonda West →"
  },
  "it": {
    "brandSubtitle": "Immobili sulla costa del Golfo della Florida",
    "backHome": "← Torna alla home",
    "backCommunities": "← Esplora le comunità",
    "search": "Cerca immobili",
    "buy": "Acquistare",
    "sell": "Vendere",
    "newConstruction": "Nuove costruzioni",
    "waterfront": "Immobili sull’acqua",
    "communities": "Zone e comunità",
    "calculators": "Calcolatori",
    "qa": "1.000 domande e risposte",
    "about": "Chi sono",
    "contact": "Contatti",
    "heroLabel": "Costa del Golfo della Florida",
    "heroTitle": "Trova il tuo posto sulla costa del Golfo della Florida",
    "heroDescription": "Case sull’acqua, nuove costruzioni e comunità esclusive da Boca Grande a Sarasota.",
    "findHouse": "Cerca una casa",
    "findCondo": "Cerca un condominio",
    "introLabel": "Florida sudoccidentale",
    "introTitle": "Consulenza immobiliare senza complicazioni",
    "introDescription": "Scopri case, comunità e opportunità lungo la costa del Golfo della Florida, con informazioni chiare per acquirenti e venditori.",
    "choiceHome": "Trova la tua casa",
    "choiceHomeDescription": "Cerca immobili disponibili lungo la costa del Golfo della Florida.",
    "choiceSearch": "Cerca immobili →",
    "choiceNewDescription": "Scopri nuove comunità, costruttori e abitazioni disponibili.",
    "choiceNewLink": "Esplora le nuove case →",
    "choiceWaterDescription": "Esplora abitazioni con accesso al Golfo, sui canali e sull’acqua.",
    "choiceWaterLink": "Esplora immobili sull’acqua →",
    "footerTagline": "La tua guida immobiliare sulla costa del Golfo della Florida.",
    "footerExplore": "Esplora",
    "footerContact": "Contatti e agenzia",
    "footerLicense": "Licenza Florida #SL3363040",
    "footerRights": "Tutti i diritti riservati.",
    "footerDisclaimer": "Informazioni generali; la disponibilità degli immobili non è garantita.",
    "askTino": "Chiedi a Tino",
    "tinoSubtitle": "Assistente immobiliare della costa del Golfo della Florida",
    "tinoWelcome": "Benvenuto! Sono l’assistente virtuale di Tino. Vuoi acquistare, vendere, investire o semplicemente esplorare la costa del Golfo della Florida?",
    "tinoBuy": "Voglio acquistare",
    "tinoSell": "Voglio vendere",
    "tinoInvest": "Voglio investire",
    "tinoCall": "Prenota una chiamata",
    "tinoPlaceholder": "Chiedi a Tino...",
    "tinoDisclaimer": "Assistente virtuale · Non è un agente immobiliare abilitato",
    "tinoThinking": "Tino sta pensando...",
    "tinoUnavailable": "Tino è temporaneamente non disponibile. Riprova.",
    "searchTitleHouse": "Trova una casa sulla costa del Golfo",
    "searchTitleCondo": "Trova un condominio sulla costa del Golfo",
    "searchIntro": "Esplora le opportunità immobiliari nelle più belle comunità costiere della Florida sudoccidentale. Scegli il tipo di immobile e la zona che preferisci.",
    "searchByLocation": "Esplora per località",
    "searchSelect": "Seleziona una comunità per vedere gli immobili disponibili su OneHome.",
    "viewProperties": "Visualizza immobili →",
    "requestProperties": "Richiedi immobili →",
    "searchNotice": "Le raccolte di immobili sono fornite tramite OneHome e possono includere tipologie diverse. Verifica disponibilità e dettagli direttamente su OneHome.",
    "locRotonda": "Comunità golfistiche, quartieri tranquilli e vita sulla costa del Golfo.",
    "locBoca": "Vita sull’isola, spiagge e caratteristiche case costiere.",
    "locCape": "Quartieri sull’acqua e accesso al Golfo.",
    "locEnglewood": "Comunità costiere con spiagge e navigazione.",
    "locVenice": "Fascino del centro storico e quartieri sul Golfo.",
    "locNokomis": "Vita costiera rilassata e immobili sull’acqua.",
    "locPunta": "Quartieri sui canali e stile di vita nautico.",
    "locSiesta": "Vita sulle isole barriera e residenze costiere.",
    "locWellen": "Nuove comunità e quartieri in crescita nella Florida sudoccidentale.",
    "rotondaLabel": "Contea di Charlotte · Florida sudoccidentale",
    "rotondaTitle": "Scopri Rotonda West",
    "rotondaHero": "Esplora una tranquilla comunità residenziale nota per campi da golf, canali d’acqua dolce, attività all’aperto e facile accesso alla splendida costa del Golfo della Florida.",
    "rotondaExplore": "Esplora gli immobili disponibili →",
    "rotondaLiving": "Vivere a Rotonda West, Florida",
    "rotondaIntro": "Rotonda West è una comunità residenziale pianificata nella contea di Charlotte, nella Florida sudoccidentale. Con la sua caratteristica pianta circolare, i campi da golf, i canali d’acqua dolce e i quartieri tranquilli, offre uno stile di vita piacevole sia ai residenti permanenti sia a quelli stagionali. Nelle vicinanze si trovano Englewood, Cape Haze, Placida e Boca Grande.",
    "rotondaGolf": "Golf e tempo libero",
    "rotondaGolfText": "Goditi campi da golf, spazi verdi e tante occasioni per attività all’aperto.",
    "rotondaCanals": "Canali e vita residenziale",
    "rotondaCanalsText": "Scopri quartieri consolidati, canali d’acqua dolce e diverse soluzioni abitative.",
    "rotondaBeaches": "Spiagge del Golfo vicine",
    "rotondaBeachesText": "Raggiungi facilmente destinazioni costiere come Englewood Beach e Boca Grande.",
    "rotondaPhotoNote": "Le fotografie illustrano lo stile di vita in Florida e non rappresentano necessariamente luoghi o immobili di Rotonda West.",
    "rotondaCta": "Trova il tuo immobile a Rotonda West",
    "rotondaCtaText": "Consulta case, condomini e altre proprietà residenziali disponibili.",
    "rotondaListings": "Vedi immobili a Rotonda West →"
  },
  "pt": {
    "brandSubtitle": "Imóveis na costa do Golfo da Flórida",
    "backHome": "← Voltar ao início",
    "backCommunities": "← Explorar comunidades",
    "search": "Buscar imóveis",
    "buy": "Comprar",
    "sell": "Vender",
    "newConstruction": "Novas construções",
    "waterfront": "Imóveis à beira d’água",
    "communities": "Áreas e comunidades",
    "calculators": "Calculadoras",
    "qa": "1.000 perguntas e respostas",
    "about": "Sobre mim",
    "contact": "Contato",
    "heroLabel": "Costa do Golfo da Flórida",
    "heroTitle": "Encontre o seu lugar na costa do Golfo da Flórida",
    "heroDescription": "Casas à beira d’água, novas construções e comunidades excepcionais de Boca Grande a Sarasota.",
    "findHouse": "Encontrar uma casa",
    "findCondo": "Encontrar um condomínio",
    "introLabel": "Sudoeste da Flórida",
    "introTitle": "Orientação imobiliária sem complicações",
    "introDescription": "Explore casas, comunidades e oportunidades na costa do Golfo da Flórida, com informações claras para compradores e vendedores.",
    "choiceHome": "Encontre seu lar",
    "choiceHomeDescription": "Busque imóveis disponíveis ao longo da costa do Golfo da Flórida.",
    "choiceSearch": "Buscar imóveis →",
    "choiceNewDescription": "Descubra novas comunidades, construtoras e casas disponíveis.",
    "choiceNewLink": "Explorar casas novas →",
    "choiceWaterDescription": "Explore imóveis com acesso ao Golfo, em canais e à beira d’água.",
    "choiceWaterLink": "Explorar imóveis à beira d’água →",
    "footerTagline": "Seu guia imobiliário na costa do Golfo da Flórida.",
    "footerExplore": "Explorar",
    "footerContact": "Contato e corretora",
    "footerLicense": "Licença da Flórida #SL3363040",
    "footerRights": "Todos os direitos reservados.",
    "footerDisclaimer": "Informações gerais; a disponibilidade dos imóveis não é garantida.",
    "askTino": "Pergunte ao Tino",
    "tinoSubtitle": "Assistente imobiliário da costa do Golfo da Flórida",
    "tinoWelcome": "Bem-vindo! Sou o assistente virtual do Tino. Você quer comprar, vender, investir ou apenas explorar a costa do Golfo da Flórida?",
    "tinoBuy": "Quero comprar",
    "tinoSell": "Quero vender",
    "tinoInvest": "Quero investir",
    "tinoCall": "Agendar uma ligação",
    "tinoPlaceholder": "Pergunte ao Tino...",
    "tinoDisclaimer": "Assistente virtual · Não é corretor de imóveis licenciado",
    "tinoThinking": "Tino está pensando...",
    "tinoUnavailable": "Tino está temporariamente indisponível. Tente novamente.",
    "searchTitleHouse": "Encontre uma casa na costa do Golfo",
    "searchTitleCondo": "Encontre um condomínio na costa do Golfo",
    "searchIntro": "Explore oportunidades imobiliárias nas comunidades costeiras mais desejadas do sudoeste da Flórida. Escolha o tipo de imóvel e a localização de sua preferência.",
    "searchByLocation": "Explorar por localização",
    "searchSelect": "Selecione uma comunidade para ver imóveis disponíveis pelo OneHome.",
    "viewProperties": "Ver imóveis →",
    "requestProperties": "Solicitar imóveis →",
    "searchNotice": "As coleções de imóveis são oferecidas pelo OneHome e podem incluir diferentes tipos de propriedades. Confirme a disponibilidade e os detalhes diretamente no OneHome.",
    "locRotonda": "Comunidades de golfe, bairros tranquilos e vida na costa do Golfo.",
    "locBoca": "Vida em ilha, praias e casas costeiras diferenciadas.",
    "locCape": "Bairros à beira d’água e acesso ao Golfo.",
    "locEnglewood": "Comunidades costeiras com praias e navegação.",
    "locVenice": "Charme do centro histórico e bairros na costa do Golfo.",
    "locNokomis": "Vida costeira tranquila e imóveis à beira d’água.",
    "locPunta": "Bairros em canais e estilo de vida náutico.",
    "locSiesta": "Vida em ilhas-barreira e residências costeiras.",
    "locWellen": "Comunidades novas e bairros em crescimento no sudoeste da Flórida.",
    "rotondaLabel": "Condado de Charlotte · Sudoeste da Flórida",
    "rotondaTitle": "Descubra Rotonda West",
    "rotondaHero": "Explore uma comunidade residencial tranquila, conhecida pelos campos de golfe, canais de água doce, atividades ao ar livre e acesso conveniente à bela costa do Golfo da Flórida.",
    "rotondaExplore": "Explorar imóveis disponíveis →",
    "rotondaLiving": "Viver em Rotonda West, Flórida",
    "rotondaIntro": "Rotonda West é uma comunidade residencial planejada no condado de Charlotte, no sudoeste da Flórida. Conhecida por seu formato circular, campos de golfe, canais de água doce e bairros tranquilos, oferece um estilo de vida atraente para moradores permanentes e sazonais. Nas proximidades estão Englewood, Cape Haze, Placida e Boca Grande.",
    "rotondaGolf": "Golfe e lazer",
    "rotondaGolfText": "Aproveite campos de golfe, áreas verdes e oportunidades de lazer ao ar livre.",
    "rotondaCanals": "Canais e vida residencial",
    "rotondaCanalsText": "Explore bairros consolidados, canais de água doce e várias opções de moradia.",
    "rotondaBeaches": "Praias próximas do Golfo",
    "rotondaBeachesText": "Tenha acesso conveniente a destinos costeiros como Englewood Beach e Boca Grande.",
    "rotondaPhotoNote": "As fotografias ilustram o estilo de vida na Flórida e não representam necessariamente locais ou imóveis em Rotonda West.",
    "rotondaCta": "Encontre seu imóvel em Rotonda West",
    "rotondaCtaText": "Consulte casas, condomínios e outros imóveis residenciais disponíveis.",
    "rotondaListings": "Ver imóveis em Rotonda West →"
  }
};
function siteText(key) {
  const lang = getSiteLanguage();
  return (SITE_TRANSLATIONS[lang] && SITE_TRANSLATIONS[lang][key]) || SITE_TRANSLATIONS.en[key] || key;
}
function applySiteLanguage() {
  const lang = getSiteLanguage();
  document.documentElement.lang = lang;
  const indicator = document.getElementById("currentLanguage");
  if (indicator) indicator.textContent = ({en:"English",es:"Español",it:"Italiano",pt:"Português"})[lang];
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (SITE_TRANSLATIONS[lang][key]) el.textContent = SITE_TRANSLATIONS[lang][key];
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
    el.setAttribute("placeholder", siteText(el.getAttribute("data-i18n-placeholder")));
  });
  const footerYear = document.getElementById("footerYear");
  if (footerYear) footerYear.textContent = String(new Date().getFullYear());
}
window.addEventListener("siteLanguageChanged", applySiteLanguage);
if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", applySiteLanguage);
else applySiteLanguage();

// Shared accessible header search: internal navigation, not a live MLS listing search.
const SITE_SEARCH_PLACEHOLDERS = {
 en:'Search properties or communities...', es:'Buscar propiedades o comunidades...',
 it:'Cerca immobili o località...', pt:'Buscar imóveis ou comunidades...'
};
function updateSiteSearchPlaceholder(){
 const input=document.getElementById('siteSearchInput');
 if(input) input.placeholder=SITE_SEARCH_PLACEHOLDERS[getSiteLanguage()]||SITE_SEARCH_PLACEHOLDERS.en;
}
function toggleSiteSearch(button){
 const panel=document.getElementById('searchBox'); if(!panel)return;
 const open=panel.classList.toggle('open');
 if(button)button.setAttribute('aria-expanded',String(open));
 if(open){const input=document.getElementById('siteSearchInput');if(input)input.focus();}
}
function submitSiteSearch(event){
 event.preventDefault();
 const input=document.getElementById('siteSearchInput');
 const q=(input?.value||'').trim().toLocaleLowerCase();
 if(!q)return false;
 const condo=/condo|condom|apartament|appartament|apartamento|condomínio|condominio/.test(q);
 const rotonda=/rotonda/.test(q);
 const homes=/home|house|casa|casas|immobil|imóve|property|propert|vivienda|new construction|construcci|nuova costruzione/.test(q);
 let url=rotonda?'rotonda-west.html':condo?'search-properties.html?type=condo':homes?'search-properties.html?type=house':'search-properties.html';
 window.location.href=url; return false;
}
window.addEventListener('siteLanguageChanged',updateSiteSearchPlaceholder);
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',updateSiteSearchPlaceholder);else updateSiteSearchPlaceholder();
document.addEventListener('keydown',e=>{if(e.key==='Escape'){document.getElementById('searchBox')?.classList.remove('open');document.querySelector('.search-icon')?.setAttribute('aria-expanded','false');}});

// Close search after clicking outside its panel or trigger.
document.addEventListener('click',function(e){const panel=document.getElementById('searchBox');const btn=document.querySelector('.site-header .search-icon');if(panel&&btn&&!panel.contains(e.target)&&!btn.contains(e.target)){panel.classList.remove('open');btn.setAttribute('aria-expanded','false');}});
