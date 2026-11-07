// Application rules enforce the public design patterns; no proprietary prompts or listing access.
import {CONTACT,criteriaText} from '../../assets/ask-tino-core.js';
const L={
 en:{fair:'I can help compare homes by price, location, property features and objective information. I cannot recommend or exclude neighborhoods based on protected personal characteristics.',agent:'Sabatino must review the property and current information to advise on value, offers or negotiations. I cannot give a verified valuation or act as your agent.',unknown:'I cannot verify that information or confirm an action. Sabatino can check it with you.',inventory:'I do not have a live MLS listing feed. Sabatino must verify property availability, prices and details.',city:'Which city or community are you considering?',budget:'What is your maximum purchase budget?',next:'Explore buying options',contact:'Contact Sabatino',reset:'I retain these criteria only while this page stays open; reloading or changing pages starts a new conversation.'},
 es:{fair:'Puedo comparar viviendas por precio, ubicación, características y datos objetivos. No puedo recomendar ni excluir vecindarios por características personales protegidas.',agent:'Sabatino debe revisar la propiedad y los datos actuales para orientarte sobre valor, ofertas o negociación. No puedo darte una valoración verificada ni actuar como tu agente.',unknown:'No puedo verificar esa información ni confirmar una gestión. Sabatino puede comprobarla contigo.',inventory:'No tengo una conexión de listados MLS en vivo. Sabatino debe verificar disponibilidad, precios y detalles de las propiedades.',city:'¿En qué ciudad o comunidad buscas?',budget:'¿Cuál es tu presupuesto máximo de compra?',next:'Ver opciones de compra',contact:'Contactar a Sabatino',reset:'Conservo estos criterios solo mientras esta página siga abierta; al recargar o cambiar de página comienza otra conversación.'},
 it:{fair:'Posso confrontare immobili per prezzo, posizione, caratteristiche e dati oggettivi. Non posso consigliare o escludere quartieri in base a caratteristiche personali protette.',agent:'Sabatino deve esaminare l’immobile e i dati attuali per valutazioni, offerte o trattative. Non posso fornire una valutazione verificata né agire come tuo agente.',unknown:'Non posso verificare questa informazione né confermare un’operazione. Sabatino può verificarla con te.',inventory:'Non ho un collegamento MLS in tempo reale. Sabatino deve verificare disponibilità, prezzi e dettagli degli immobili.',city:'In quale città o comunità stai cercando?',budget:'Qual è il tuo budget massimo di acquisto?',next:'Esplora le opzioni di acquisto',contact:'Contatta Sabatino',reset:'Conservo questi criteri solo finché questa pagina rimane aperta; ricaricando o cambiando pagina inizia una nuova conversazione.'},
 pt:{fair:'Posso comparar imóveis por preço, localização, características e dados objetivos. Não posso recomendar ou excluir bairros por características pessoais protegidas.',agent:'Sabatino precisa analisar o imóvel e os dados atuais para orientar sobre valor, propostas ou negociação. Não posso fornecer avaliação verificada nem atuar como seu corretor.',unknown:'Não posso verificar essa informação nem confirmar uma ação. Sabatino pode verificá-la com você.',inventory:'Não tenho conexão MLS em tempo real. Sabatino precisa verificar disponibilidade, preços e detalhes dos imóveis.',city:'Em qual cidade ou comunidade procura?',budget:'Qual é seu orçamento máximo de compra?',next:'Ver opções de compra',contact:'Contatar Sabatino',reset:'Mantenho estes critérios apenas enquanto esta página estiver aberta; recarregar ou trocar de página inicia outra conversa.'}
};
const norm=s=>s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
export function protectedSteering(q){
 const s=norm(q);const colorGroup=/\b(white|black|blanc[oa]s?|negr[oa]s?)\b/.test(s)&&/people|famil|neighbors?|neighbours?|vecinos?|personas?|neighbou?rhood|barrio|quartier|bairro/.test(s);return colorGroup||/\b(race|racial|raza|razza|religio\w*|ethnic\w*|etni\w*|muslim\w*|musulman\w*|jew\w*|judi\w*|ebre\w*|christian\w*|cristian\w*|gay|gays|disab\w*|discap\w*|families with children|familias con ninos|famiglie con bambini|national origin|nacionalidad|nazionalita)\b/.test(s)&&/\b(area\w*|neighbou?rhood\w*|barrio\w*|vecindario\w*|quartier\w*|bairro\w*|vivienda\w*|homes?|casa\w*|live|vivir|vivere|morar|avoid|evita\w*|exclude|exclu\w*)\b/.test(s);
}
export function policyReply(q,state,lang='en'){
 const t=L[lang]||L.en,s=norm(q);const contact='\n'+CONTACT.form;
 if(protectedSteering(q))return t.fair;
 const propertyPrivacy=/privacy|privacidad|riservatezza|privacidade/.test(s)&&/home|house|casa|vivienda|immobile|imovel/.test(s)&&!/data|datos|dati|dados|chat|conversa|policy|politica|mensaje|message/.test(s);
 if(!propertyPrivacy&&/\b(privacy|privacidad|privacidade|riservatezza|datos personales|dati personali|personal data|dados pessoais)\b/.test(s))return ({
 en:'Read the privacy policy before sharing personal information. Do not enter passwords, identity documents or bank details here. For privacy questions, contact Sabatino.',
 es:'Consulta la política de privacidad antes de compartir datos personales. No introduzcas aquí contraseñas, documentos de identidad ni datos bancarios. Para preguntas de privacidad, contacta a Sabatino.',
 it:'Consulta la privacy prima di condividere dati personali. Non inserire password, documenti di identità o dati bancari. Per domande sulla privacy, contatta Sabatino.',
 pt:'Consulte a política de privacidade antes de compartilhar dados pessoais. Não informe senhas, documentos de identidade ou dados bancários. Para questões de privacidade, contate Sabatino.'
 }[lang]||L.en.unknown)+'\nhttps://floridacostiera.com/privacy'+contact;

 if(/guard.*convers|save.*conversation|remember.*tomorrow|ricord.*domani|conversa.*amanha|remember across|save my criteria|guardar mis criterios|recordaras manana|ricorderai domani|salva i criteri|lembra amanha/.test(s))return t.reset+'\nhttps://floridacostiera.com/privacy#ask-tino-privacy';
 if(/what.*(?:worth|offer)|cuanto vale|cuanto (?:debo|ofrezco)|que oferta|valoracion|tasacion|valutazione|quanto (?:vale|offr)|negotia|negocia|trattativ/.test(s))return t.agent+contact;
 // Real inventory must come from a real feed. This application has none.
 if(!/no busco|not looking|non cerco|nao procuro/.test(s)&&/(?:show|find|give|dame|muestr|busc|trova|mostra|encontr|procuro|cerco|looking for)/.test(s)&&/address|direcciones|indirizz|enderec|available|disponib|listing|listad/.test(s))return criteriaText(state,lang)+'\n\n'+t.inventory+contact;
 // A seller's substantive question must reach an answer, not the intent-only handoff.
 if(state.activity==='sell'&&/[?¿]|hipoteca|mortgage|mutuo|financiamento|por donde|how to|where.*start|da dove|document|pasos|steps/.test(s))return null;
 const search=/\b(cerco|busco|procuro|looking for|searching for|voglio|quiero)\b/.test(s)&&/casa|home|house|condo|apartment|property|propriet|vivienda|imovel/.test(s)&&!/finanz|financ|mutuo|mortgage|impuest|tax|gastos|cost|spese|document|puedo|posso|can i|ley|law|legal/.test(s);
 const update=/\b(cambia|cambio|change|aggiorna|actualiza|atualiza|mude|togli|quita|remove|mantieni|keep|quiero|voglio|quero|want)\b/.test(s)&&/city|citta|ciudad|cidade|comunidad|community|budget|presupuesto|orcamento|piscina|pool|bedroom|habitacion|camere|quartos/.test(s)&&Object.keys(state).length>0;
 const shortCriterion=(state.city&&s===norm(state.city))||(!/[?¿]/.test(q)&&q.length<90&&/budget|presupuesto|orcamento/.test(s))||/^\s*\$[\d.,]+\s*[km]?\s*$/i.test(q);
 if(state.activity==='sell'&&(search||update||shortCriterion||/vender|vendere|selling|\bsell\b/.test(s)))return criteriaText(state,lang)+'\n\n'+(!state.city?({en:'In which city or community is the property you want to sell?',es:'¿En qué ciudad o comunidad está la propiedad que quieres vender?',it:'In quale città o comunità si trova l’immobile che vuoi vendere?',pt:'Em qual cidade ou comunidade fica o imóvel que deseja vender?'}[lang]||t.city):({en:'For selling guidance, contact Sabatino to review your property and next steps.',es:'Para vender, contacta a Sabatino para revisar tu propiedad y los próximos pasos.',it:'Per vendere, contatta Sabatino per esaminare l’immobile e i prossimi passi.',pt:'Para vender, contate Sabatino para analisar o imóvel e os próximos passos.'}[lang]||t.agent)+contact);
 if(search||update||shortCriterion||state.activity==='invest'&&/invert|invest/.test(s)){
 const summary=Object.keys(state).length?criteriaText(state,lang):'';
 const missing=!state.city?t.city:!state.budget&&!state.budgetAny?t.budget:null;
 return (summary?summary+'\n\n':'')+(missing||t.inventory+'\n'+t.next+': '+CONTACT.buy+'\n'+t.contact+': '+CONTACT.form);
 }
 return null;
}
export function validateModelReply(reply,lang='en'){
 const t=L[lang]||L.en,s=norm(reply);
 const claimed=/\b(i (?:have )?(?:booked|scheduled|sent|verified|checked|searched|browsed)|he (?:reservado|agendado|enviado|verificado|consultado|buscado)|ho (?:prenotato|inviato|verificato|consultato)|(?:reservei|agendei|enviei|verifiquei))\b/.test(s);
 const guarantee=/\b(?:guarantee|garantizo|garantisco|garanto)\b/.test(s)&&!/cannot|can't|no puedo|non posso|nao posso|not guarantee/.test(s);
 if(claimed||guarantee||protectedSteering(reply))return t.unknown+'\n'+CONTACT.form;
 // Only the application source directory may provide outside citations.
 const urls=reply.match(/https?:\/\/[^\s)<>]+/g)||[];
 if(urls.some(raw=>{try{return new URL(raw).hostname!=='floridacostiera.com';}catch{return true;}}))return t.unknown+'\n'+CONTACT.form;
 return reply;
}

