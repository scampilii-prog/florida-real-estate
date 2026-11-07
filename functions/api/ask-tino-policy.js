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
 const s=norm(q);return /\b(race|racial|raza|razza|religio\w*|ethnic\w*|etni\w*|muslim\w*|musulman\w*|jew\w*|judi\w*|ebre\w*|christian\w*|cristian\w*|black|blanco\w*|negro\w*|white|gay|gays|disab\w*|discap\w*|families with children|familias con ninos|famiglie con bambini|national origin|nacionalidad|nazionalita)\b/.test(s)&&/\b(area\w*|neighbou?rhood\w*|barrio\w*|vecindario\w*|quartier\w*|bairro\w*|vivienda\w*|homes?|casa\w*|live|vivir|vivere|morar|avoid|evita\w*|exclude|exclu\w*)\b/.test(s);
}
export function policyReply(q,state,lang='en'){
 const t=L[lang]||L.en,s=norm(q);const contact='\n'+CONTACT.form;
 if(protectedSteering(q))return t.fair;
 if(/remember across|save my criteria|guardar mis criterios|recordaras manana|ricorderai domani|salva i criteri|lembra amanha/.test(s))return t.reset;
 if(/what.*(?:worth|offer)|cuanto vale|cuanto (?:debo|ofrezco)|que oferta|valoracion|tasacion|valutazione|quanto (?:vale|offr)|negotia|negocia|trattativ/.test(s))return t.agent+contact;
 // Real inventory must come from a real feed. This application has none.
 if(/(?:show|find|give|dame|muestr|busc|trova|mostra|encontr|procuro|cerco|looking for)/.test(s)&&/address|direcciones|indirizz|enderec|available|disponib|listing|listad/.test(s))return criteriaText(state,lang)+'\n\n'+t.inventory+contact;
 const search=/\b(cerco|busco|procuro|looking for|searching for|voglio|quiero)\b/.test(s)&&/casa|home|property|propriet|vivienda|imovel/.test(s)&&!/finanz|financ|mutuo|mortgage|impuest|tax|gastos|cost|spese|document|puedo|posso|can i|ley|law|legal/.test(s);
 const update=/\b(cambia|change|aggiorna|actualiza|atualiza|togli|quita|remove|mantieni|keep)\b/.test(s)&&/city|citta|ciudad|comunidad|community|budget|presupuesto|orcamento|piscina|pool|bedroom|habitacion|camere|quartos/.test(s)&&Object.keys(state).length>0;
 if(search||update){
 const summary=criteriaText(state,lang);
 const missing=!state.city?t.city:!state.budget?t.budget:null;
 return summary+'\n\n'+(missing||t.inventory+'\n'+t.next+': '+CONTACT.buy+'\n'+t.contact+': '+CONTACT.form);
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
