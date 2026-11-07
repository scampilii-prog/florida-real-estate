// One source of truth for visitor criteria and supported deterministic replies.
export const CONTACT = Object.freeze({phone:'(941) 270-4877',tel:'tel:+19412704877',email:'sabatino@floridacostiera.com',buy:'https://floridacostiera.com/buy',form:'https://floridacostiera.com/contact#tell-us-your-plans'});
// Bounded detection of obvious secrets, not a complete personal-data classifier.
export function sensitiveInput(text){
 if(typeof text!=='string')return false;
 if(/\b\d{3}[- ]\d{2}[- ]\d{4}\b/.test(text))return true;
 if(/\b(?:password|contrase[nñ]a|senha|ssn|social security(?: number)?|numero (?:de )?cuenta|account number|routing number|iban)\s*(?::|=|is\b|es\b|e\b|è\b|é\b)\s*\S+/i.test(text))return true;
 for(const match of text.matchAll(/\b(?:\d[ -]?){12,18}\d\b/g)){
  const digits=match[0].replace(/\D/g,'');if(digits.length<13||digits.length>19||/^(\d)\1+$/.test(digits))continue;
  let sum=0;for(let i=digits.length-1;i>=0;i--){let n=Number(digits[i]);if((digits.length-1-i)%2){n*=2;if(n>9)n-=9;}sum+=n;}
  if(sum%10===0)return true;
 }
 return false;
}
export function sensitiveReply(lang='en'){
 return ({en:'Please remove identity, account or password details before sending. Ask Tino does not need them for an initial property question.',es:'Quita los datos de identidad, cuentas o contraseñas antes de enviar. Ask Tino no los necesita para una consulta inmobiliaria inicial.',it:'Rimuovi dati di identità, conti o password prima di inviare. Ask Tino non ne ha bisogno per una prima domanda immobiliare.',pt:'Remova dados de identidade, contas ou senhas antes de enviar. Ask Tino não precisa deles para uma consulta imobiliária inicial.'})[lang]||sensitiveReply('en');
}
const CITIES = /Rotonda West|Port Charlotte|North Port|Punta Gorda(?: Isles)?|Boca Grande|Gasparilla Island|Cape Haze|Placida|Wellen Park|Englewood|Manasota Key|Venice|Sarasota|Siesta Key|Longboat Key|Nokomis|Casey Key/gi;
const POOL_NO = /senza piscina|sin piscina|without (?:a )?pool|sem piscina|non (?:voglio|desidero)(?: più)? (?:una |la )?piscina|no (?:quiero|deseo)(?: ya)? (?:una |la )?piscina|(?:don't|do not|no longer) want (?:a |the )?pool|(?:remove|drop) (?:the )?pool|(?:togli|rimuovi|quita|elimina|retira) (?:la )?piscina/i;
const POOL_YES = /con (?:una )?piscina|with (?:a )?pool|and (?:a )?pool|y piscina|e piscina|com piscina|(?:voglio|desidero)(?: di nuovo)? (?:una |la )?piscina|(?:quiero|deseo)(?: de nuevo)? (?:una |la )?piscina|(?:want|add)(?: again)? (?:a |the )?pool/i;
const NUMBERS = {one:1,uno:1,una:1,un:1,two:2,dos:2,due:2,dois:2,duas:2,three:3,tres:3,tre:3,'três':3,four:4,cuatro:4,quattro:4,quatro:4,five:5,cinco:5,cinque:5,six:6,seis:6,sei:6};
export function language(text, fallback='en') {
 if (/in English|en ingl[eé]s|in inglese/i.test(text)) return 'en';
 if (/in italiano|en italiano/i.test(text)) return 'it';
 if (/in Spanish|en español|in spagnolo/i.test(text)) return 'es';
 if (/in Portuguese|em português|en portugués/i.test(text)) return 'pt';
 if (/\b(quero|você|orçamento|minha|mude|procuro|gostaria|resuma|quartos)\b/i.test(text)) return 'pt';
 if (/\b(cerco|vorrei|posso|puoi|ricordi|riassumi|preferisco|mantieni|voglio|mio|città|mutuo|vendere)\b/i.test(text)) return 'it';
 if (/[¿¡]|\b(busco|quiero|puedo|recuerdas|presupuesto|resumen|comprar|vender|habitaciones|hipoteca)\b/i.test(text)) return 'es';
 if (/\b(procuro|gostaria|você|orçamento|lembra|resuma|quartos|mude|cidade|minha|apenas)\b/i.test(text)) return 'pt';
 if (/\b(looking|want|can you|summari[sz]e|remember|what|my|budget now|buy|sell|mortgage|remove|change)\b/i.test(text)) return 'en';
 return ['en','es','it','pt'].includes(fallback) ? fallback : 'en';
}
export function cleanCriteria(value={}) {
 const c={};
 if (!value || typeof value!=='object') return c;
 if (typeof value.city==='string' && (value.city.match(CITIES)||[]).some(city=>city.toLowerCase()===value.city.toLowerCase())) c.city=value.city;
 if(['sell','invest'].includes(value.activity))c.activity=value.activity;
 if(value.budgetAny===true)c.budgetAny=true;
 if (!c.budgetAny && typeof value.budget==='string' && /^\$[\d,.]+(?:\s*[km])?$/i.test(value.budget) && value.budget.length<25) c.budget=value.budget;
 if (Number.isInteger(Number(value.bedrooms)) && Number(value.bedrooms)>0 && Number(value.bedrooms)<=30) c.bedrooms=Number(value.bedrooms);
 if(['condo','house','townhouse','land'].includes(value.propertyType))c.propertyType=value.propertyType;
 if(['yes','no','any'].includes(value.pets))c.pets=value.pets;
 if(value.accessibility==='wheelchair')c.accessibility='wheelchair';
 if (['yes','no','any'].includes(value.pool)) c.pool=value.pool;
 return c;
}
export function updateCriteria(previous, text) {
 const c=cleanCriteria(previous);
 if(/wheelchair|silla de ruedas|sedia a rotelle|cadeira de rodas/i.test(text))c.accessibility='wheelchair';
 if(/busco|cerco|procuro|looking for|quiero|prefiero|preferisco|prefer|quero/i.test(text)){if(/condomin|\bcondo\b/i.test(text))c.propertyType='condo';else if(/casa|house|home/i.test(text))c.propertyType='house';}
 if(/mascotas|pets|animali|animais/i.test(text)){if(/sin mascotas|no pets|senza animali|sem animais/i.test(text))c.pets='no';else if(/permita|permit|allowed|indispens|necesit|need|accept|ammess|aceit/i.test(text))c.pets='yes';}
 const cities=text.match(CITIES);
 if(cities?.length===1) c.city=cities[0];
 const normalized=text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
 const calculation=/calcul|cuota mensual|monthly payment|rata mensile|pagamento mensal|down payment|anticipo|net proceeds/.test(normalized);
 if(!calculation){
  if(/(?:quiero|voy a|want to|planning to|voglio|vorrei|quero|pretendo)\s+(?:vender|sell|vendere)|^vendo\b/.test(normalized)){c.activity='sell';delete c.budget;delete c.budgetAny;}
  else if(/invertir|investir|investire|\binvest\b/.test(normalized))c.activity='invest';
  else if(/comprar|acquistare|\bbuy\b|cerco|busco|looking for|procuro/.test(normalized))delete c.activity;
  const budgetContext=/budget|presupuesto|orcamento|price range|subir hasta|aumentar|increase|raise|invertir|investir|investire|\binvest\b/.test(normalized)||/busco|cerco|procuro|looking for|searching for/.test(normalized)||/^\s*\$[\d.,]+\s*[km]?\s*$/i.test(text);
  if(/(?:remove|clear|drop|quita|elimina|togli|rimuovi|remova).{0,25}(?:budget|presupuesto|orcamento)|(?:sin limite|sem limite|senza limite|no limit).{0,25}(?:budget|presupuesto|orcamento)|(?:budget|presupuesto|orcamento).{0,25}(?:sin limite|sem limite|senza limite|no limit)/.test(normalized)){delete c.budget;c.budgetAny=true;}
  else if(budgetContext&&c.activity!=='sell'){
   const amounts=[...text.matchAll(/\$\s*\d[\d.,]*(?:\s*[kKmM]\b)?/g)];
   if(amounts.length===1){c.budget=amounts[0][0].replace(/\s/g,'').replace(/[.,]$/,'');delete c.budgetAny;}
   else if(!/euros?|reais|pounds?|sterline/.test(normalized)){
    const scaled=normalized.match(/\b(\d+(?:[.,]\d+)?)\s*(mil(?:a)?|thousand|millon(?:es)?|milion[ei]|million)\b/);
    const words={cien:100,doscientos:200,trescientos:300,cuatrocientos:400,quinientos:500,seiscientos:600,setecientos:700,ochocientos:800,novecientos:900};
    const written=normalized.match(/\b(cien|doscientos|trescientos|cuatrocientos|quinientos|seiscientos|setecientos|ochocientos|novecientos)\s+mil\b/);
    if(scaled){c.budget='$'+Number(Number(scaled[1].replace(',','.'))*(/millon|milion|million/.test(scaled[2])?1000000:1000));delete c.budgetAny;}
    else if(written){c.budget='$'+words[written[1]]*1000;delete c.budgetAny;}
   }
  }
 }
 const rooms=text.match(/\b(\d{1,2}|one|uno|una|un|two|dos|due|dois|duas|three|tres|tre|três|four|cuatro|quattro|quatro|five|cinco|cinque|six|seis|sei)\s*(?:bedrooms?|beds?|BR\b|habitaciones?|dormitorios?|camere(?: da letto)?|quartos?)\b/i);
 const replacement=text.match(/\b(\d{1,2}|one|uno|una|un|two|dos|due|dois|three|tres|tre|four|cuatro|quattro)\s+(?:ser[ií]a|would be|sarebbe)\s+(?:suficiente|enough|sufficiente)/i);
 if(replacement&&(rooms||c.bedrooms))c.bedrooms=NUMBERS[replacement[1].toLowerCase()]||Number(replacement[1]);
 else if(rooms) c.bedrooms=NUMBERS[rooms[1].toLowerCase()]||Number(rooms[1]);
 if(/(?:pool|piscina).{0,20}(?:indifferente|indiferente|no preference)|(?:indifferente|indiferente|no preference).{0,20}(?:pool|piscina)/i.test(text)) c.pool='any';
 else if(POOL_NO.test(text)) c.pool='no';
 else if(POOL_YES.test(text)) c.pool='yes';
 return cleanCriteria(c);
}
const COPY={
 en:{city:'City',budget:'Budget',bedrooms:'Bedrooms',pool:'Pool',yes:'yes',no:'no',any:'no preference',summary:'Current criteria',missing:'I do not have those details in this conversation yet. Please share the city, budget and preferences.',search:'I can help you organize your search. Availability, addresses and prices must be verified with Sabatino. Explore buying options: ',contact:'Contact Sabatino Campilii, Realtor® with LoKation® Real Estate.',form:'Contact form',email:'Email',phone:'Phone',virtual:'I cannot book or confirm a visit. Send Sabatino your preferred date, time and time zone using the contact form. He can confirm availability and arrange a virtual tour.',guarantee:'I cannot guarantee a sale price or a selling deadline. These depend on the property, pricing, market conditions and the offers received.',mortgage:'You can generally sell a home even if you still have a mortgage. Start by requesting a payoff statement from your loan servicer for the expected payoff date; it can differ from the balance on your monthly statement. Then review an estimated sale price and selling costs with Sabatino to estimate what would remain. Sale proceeds normally pay off the mortgage at closing. If they will not cover the debt and costs, discuss the shortfall with the servicer before proceeding. Do not share account numbers or loan documents here.',before:'Before commissions and expenses',final:'Actual closing costs and adjustments still need to be deducted.',shortfall:'The price would not cover the mortgage; the shortfall and selling costs must be resolved.',error:'The assistant is temporarily unavailable. Please try again or contact Sabatino: ',long:'Please split your question into shorter messages.'},
 es:{city:'Ciudad',budget:'Presupuesto',bedrooms:'Habitaciones',pool:'Piscina',yes:'sí',no:'no',any:'sin preferencia',summary:'Criterios actuales',missing:'Todavía no tengo esos datos en esta conversación. Indícame la ciudad, el presupuesto y tus preferencias.',search:'Puedo ayudarte a organizar la búsqueda. Sabatino debe verificar disponibilidad, direcciones y precios. Ver opciones de compra: ',contact:'Contacta a Sabatino Campilii, Realtor® de LoKation® Real Estate.',form:'Formulario',email:'Correo',phone:'Teléfono',virtual:'No puedo reservar ni confirmar una visita. Envía a Sabatino la fecha, la hora y la zona horaria que prefieres mediante el formulario. Él podrá confirmar disponibilidad y coordinar una visita virtual.',guarantee:'No puedo garantizar un precio de venta ni un plazo. Dependen de la propiedad, el precio, las condiciones del mercado y las ofertas recibidas.',mortgage:'Normalmente puedes vender aunque todavía tengas hipoteca. Empieza solicitando al administrador de tu préstamo un saldo de cancelación (payoff) para la fecha prevista; puede ser distinto del saldo de tu estado de cuenta. Después, revisa con Sabatino un precio estimado de venta y los gastos para calcular cuánto quedaría. La hipoteca normalmente se paga al cierre con los fondos de la venta. Si no alcanzan para la deuda y los gastos, consulta la diferencia con el prestamista antes de avanzar. No compartas aquí números de cuenta ni documentos del préstamo.',before:'Antes de comisiones y gastos',final:'Todavía deben descontarse los gastos y ajustes reales del cierre.',shortfall:'El precio no cubriría la hipoteca; habría que resolver la diferencia y los gastos.',error:'El asistente no está disponible temporalmente. Inténtalo de nuevo o contacta a Sabatino: ',long:'Divide tu consulta en mensajes más cortos.'},
 it:{city:'Città',budget:'Budget',bedrooms:'Camere da letto',pool:'Piscina',yes:'sì',no:'no',any:'indifferente',summary:'Criteri attuali',missing:'Non ho ancora questi dati in questa conversazione. Indicami città, budget e preferenze.',search:'Posso aiutarti a organizzare la ricerca. Sabatino deve verificare disponibilità, indirizzi e prezzi. Esplora le opzioni di acquisto: ',contact:'Contatta Sabatino Campilii, Realtor® con LoKation® Real Estate.',form:'Modulo',email:'Email',phone:'Telefono',virtual:'Non posso prenotare o confermare una visita. Invia a Sabatino la data, l’ora e il fuso orario desiderati tramite il modulo. Potrà confermare la disponibilità e organizzare una visita virtuale.',guarantee:'Non posso garantire un prezzo di vendita o una scadenza. Dipendono dall’immobile, dal prezzo, dal mercato e dalle offerte ricevute.',mortgage:'Normalmente puoi vendere anche con un mutuo ancora aperto. Inizia chiedendo al gestore del mutuo il conteggio di estinzione alla data prevista: può differire dal saldo dell’estratto conto. Poi esamina con Sabatino un prezzo di vendita indicativo e le spese per stimare il ricavato netto. Il mutuo viene normalmente estinto al rogito con il ricavato della vendita. Se non copre debito e spese, chiarisci la differenza con il finanziatore prima di procedere. Non condividere qui numeri di conto o documenti del mutuo.',before:'Prima delle commissioni e delle spese',final:'Restano da detrarre le spese e i conguagli effettivi.',shortfall:'Il prezzo non coprirebbe il mutuo; occorre risolvere la differenza e le spese.',error:'L’assistente non è temporaneamente disponibile. Riprova o contatta Sabatino: ',long:'Dividi la richiesta in messaggi più brevi.'},
 pt:{city:'Cidade',budget:'Orçamento',bedrooms:'Quartos',pool:'Piscina',yes:'sim',no:'não',any:'sem preferência',summary:'Critérios atuais',missing:'Ainda não tenho esses dados nesta conversa. Informe a cidade, o orçamento e suas preferências.',search:'Posso ajudar a organizar a busca. Sabatino deve verificar disponibilidade, endereços e preços. Ver opções de compra: ',contact:'Contate Sabatino Campilii, Realtor® da LoKation® Real Estate.',form:'Formulário',email:'Email',phone:'Telefone',virtual:'Não posso reservar ou confirmar uma visita. Envie a Sabatino a data, o horário e o fuso horário desejados pelo formulário. Ele poderá confirmar a disponibilidade e organizar uma visita virtual.',guarantee:'Não posso garantir um preço ou prazo de venda. Dependem do imóvel, preço, mercado e ofertas recebidas.',mortgage:'Normalmente é possível vender mesmo com financiamento em aberto. Comece solicitando ao administrador do empréstimo o valor de quitação para a data prevista; ele pode diferir do saldo do extrato. Depois, analise com Sabatino um preço de venda estimado e as despesas para estimar o valor líquido. A dívida normalmente é quitada no fechamento com os recursos da venda. Se não cobrirem a dívida e as despesas, esclareça a diferença com o credor antes de prosseguir. Não compartilhe números de conta ou documentos do empréstimo aqui.',before:'Antes de comissões e despesas',final:'Ainda é necessário descontar os custos e ajustes reais.',shortfall:'O preço não cobriria a dívida; a diferença e os custos precisam ser resolvidos.',error:'O assistente está temporariamente indisponível. Tente novamente ou contate Sabatino: ',long:'Divida a consulta em mensagens mais curtas.'}
};
export const copy=lang=>COPY[lang]||COPY.en;
export function criteriaText(state,lang='en',only) {
 const c=cleanCriteria(state),t=copy(lang),parts=[];
 if(!only&&c.propertyType)parts.push(({en:{condo:'Property: condominium',house:'Property: house',townhouse:'Property: townhouse',land:'Property: land'},es:{condo:'Tipo: condominio',house:'Tipo: casa',townhouse:'Tipo: townhouse',land:'Tipo: terreno'},it:{condo:'Tipo: condominio',house:'Tipo: casa',townhouse:'Tipo: villetta a schiera',land:'Tipo: terreno'},pt:{condo:'Tipo: condomínio',house:'Tipo: casa',townhouse:'Tipo: sobrado',land:'Tipo: terreno'}}[lang]||{})[c.propertyType]);
 if(!only&&c.pets)parts.push(({en:'Pets',es:'Mascotas',it:'Animali domestici',pt:'Animais de estimação'}[lang]||'Pets')+': '+t[c.pets]);
 if(c.activity)parts.push(({en:{sell:'Goal: sell',invest:'Goal: invest'},es:{sell:'Objetivo: vender',invest:'Objetivo: invertir'},it:{sell:'Obiettivo: vendere',invest:'Obiettivo: investire'},pt:{sell:'Objetivo: vender',invest:'Objetivo: investir'}}[lang]||{sell:'Goal: sell',invest:'Goal: invest'})[c.activity]);
 if(c.budgetAny)parts.push(({en:'No maximum budget specified',es:'Sin presupuesto máximo indicado',it:'Nessun budget massimo indicato',pt:'Sem orçamento máximo informado'})[lang]||'No maximum budget specified');
 if(c.accessibility)parts.push(({en:'Accessibility: wheelchair access',es:'Accesibilidad: silla de ruedas',it:'Accessibilità: sedia a rotelle',pt:'Acessibilidade: cadeira de rodas'})[lang]||'Accessibility: wheelchair access');
 for(const key of ['city','budget','bedrooms','pool']) if((!only||key===only)&&c[key]!==undefined) parts.push(t[key]+': '+(key==='pool'?t[c[key]]:c[key]));
 return parts.length ? (only?'':t.summary+': ')+parts.join('. ')+'.' : t.missing;
}
export function money(raw) {
 let s=raw.replace(/[$\s]/g,'');const suffix=s.match(/[km]$/i)?.[0];if(suffix)s=s.slice(0,-1);
 if(/^\d{1,3}(?:[.,]\d{3})+$/.test(s))s=s.replace(/[.,]/g,'');else s=s.replace(/,/g,'');
 return Number(s)*(suffix?.toLowerCase()==='k'?1000:suffix?.toLowerCase()==='m'?1000000:1);
}
export function monthlyPrincipalInterest(principal,annualPercent,years){
 if(!Number.isFinite(principal)||principal<=0||!Number.isFinite(annualPercent)||annualPercent<0||annualPercent>100||!Number.isInteger(years)||years<1||years>50)return null;
 const n=years*12,r=annualPercent/1200;return r===0?principal/n:principal*r/(1-Math.pow(1+r,-n));
}
function calculationReply(message,lang){
 const amounts=[...message.matchAll(/\$\s*\d[\d.,]*(?:\s*[kKmM]\b)?/g)].map(m=>money(m[0]));
 const rates=[...message.matchAll(/(\d+(?:[.,]\d+)?)\s*%/g)].map(m=>Number(m[1].replace(',','.')));
 const fmt=n=>'$'+n.toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2});
 if(/down payment|anticipo|entrada|enganche/i.test(message)&&/calcul|cu[aá]nto|how much|quanto/i.test(message)){
  if(amounts.length!==1||rates.length!==1||rates[0]<0||rates[0]>100)return {en:'Please provide the purchase price and down-payment percentage.',es:'Indica el precio de compra y el porcentaje de anticipo.',it:'Indica il prezzo di acquisto e la percentuale di anticipo.',pt:'Informe o preço de compra e o percentual de entrada.'}[lang];
  const down=amounts[0]*rates[0]/100,loan=amounts[0]-down;
  return {en:'Down payment',es:'Anticipo',it:'Anticipo',pt:'Entrada'}[lang]+': '+fmt(amounts[0])+' × '+rates[0]+'% = '+fmt(down)+'. '+{en:'Loan before fees',es:'Préstamo antes de gastos',it:'Mutuo prima delle spese',pt:'Empréstimo antes das despesas'}[lang]+': '+fmt(loan)+'.';
 }
 if(/monthly payment|cuota mensual|pago mensual|rata mensile|pagamento mensal/i.test(message)){
  const years=message.match(/(\d{1,2})\s*(?:years?|a[nñ]os?|anni|anos?)\b/i);
  if(amounts.length!==1||rates.length!==1||!years||!/loan|pr[eé]stamo|mutuo|empr[eé]stimo|hipoteca|mortgage/i.test(message))return {en:'Provide the loan principal, annual interest rate and term in years. The calculation will cover principal and interest only.',es:'Indica el importe del préstamo, el interés anual y el plazo en años. El cálculo cubrirá solo capital e intereses.',it:'Indica l’importo del mutuo, il tasso annuo e la durata in anni. Il calcolo includerà solo capitale e interessi.',pt:'Informe o valor do empréstimo, a taxa anual e o prazo em anos. O cálculo incluirá apenas principal e juros.'}[lang];
  const payment=monthlyPrincipalInterest(amounts[0],rates[0],Number(years[1]));if(payment===null)return copy(lang).long;
  return {en:'Fixed-rate assumption. Monthly principal and interest',es:'Supuesto: tasa fija. Capital e intereses mensuales',it:'Ipotesi: tasso fisso. Capitale e interessi mensili',pt:'Hipótese: taxa fixa. Principal e juros mensais'}[lang]+': '+fmt(payment)+'. '+{en:'Inputs',es:'Datos',it:'Dati',pt:'Dados'}[lang]+': '+fmt(amounts[0])+', '+rates[0]+'%, '+years[1]+' '+{en:'years',es:'años',it:'anni',pt:'anos'}[lang]+'. '+{en:'Excludes taxes, insurance, HOA, PMI and fees; not a lender quote.',es:'Excluye impuestos, seguro, HOA, PMI y cargos; no es una oferta de préstamo.',it:'Esclude imposte, assicurazione, HOA, PMI e spese; non è un’offerta di mutuo.',pt:'Exclui impostos, seguro, HOA, PMI e taxas; não é uma oferta de empréstimo.'}[lang];
 }
 return null;
}
export function knownReply(message,state,lang='en') {
 const t=copy(lang);
 const recall=/\b(ricordi|ricorda|recuerdas|recuerda|remember|lembra|summari[sz]e|summary|resumen|resume|resuma|riassumi|riassumere|riepilogo)\b|(?:qual|what|cu[aá]l).{0,40}(?:mio|my|mi |meu).{0,15}(?:budget|presupuesto|orçamento)/i.test(message);
 if(recall){const only=/budget|presupuesto|orçamento/i.test(message)&&!/criteria|criteri|preferenc|search|ricerca|b[uú]squeda|pesquisa|città|city|ciudad|piscina|pool/i.test(message)?'budget':undefined;return criteriaText(state,lang,only);}
 const calculation=calculationReply(message,lang);if(calculation)return calculation;
 if(/garant|guarantee/i.test(message)&&/vend|sell|sale|prezzo|precio|price|giorni|d[ií]as|days/i.test(message))return t.guarantee;
 if(/prenot|book|reserv|concertar|agendar/i.test(message)&&/visit|tour|appunt|cita|appointment/i.test(message))return t.virtual+'\n'+CONTACT.form;
 if(/virtual|distanza|distancia|remote tour|videollamada/i.test(message)&&/visit|tour|organ|coord|showing/i.test(message))return criteriaText(state,lang)+'\n\n'+t.virtual+'\n'+CONTACT.form;
 const topic=message.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
 if((state.activity==='invest'||/invert|invest/.test(topic))&&/compar|evalu|valut|assess/.test(topic))return ({
 es:'Compara el alquiler estimado con los gastos reales: asociación, impuestos, seguro, mantenimiento, administración y periodos sin inquilino. Revisa también restricciones de alquiler, cuotas extraordinarias y el estado del inmueble. Con esos datos, estima el flujo neto y prueba escenarios con menos ingresos o más gastos; el precio de compra por sí solo no indica rentabilidad. Sabatino puede ayudarte a contrastar los datos de cada propiedad.',
 en:'Compare estimated rent with actual association fees, taxes, insurance, maintenance, management and vacancy costs. Also review rental restrictions, special assessments and property condition. Estimate net cash flow and test lower-income or higher-cost scenarios; purchase price alone does not establish profitability. Sabatino can help check each property’s information.',
 it:'Confronta il canone stimato con spese condominiali, imposte, assicurazione, manutenzione, gestione e periodi senza inquilino. Verifica restrizioni agli affitti, contributi straordinari e stato dell’immobile. Stima il flusso netto e prova scenari con minori entrate o maggiori spese; il prezzo da solo non dimostra redditività. Sabatino può aiutarti a verificare i dati.',
 pt:'Compare o aluguel estimado com condomínio, impostos, seguro, manutenção, administração e períodos sem inquilino. Confira restrições de locação, despesas extraordinárias e estado do imóvel. Estime o fluxo líquido e teste cenários de menor receita ou maiores custos; o preço sozinho não determina rentabilidade. Sabatino pode ajudar a conferir os dados.'
 }[lang]||copy(lang).error)+'\n'+CONTACT.form;
 if(/condomin|condo\b/.test(topic)&&/alquil|rent|affitt|locac/.test(topic)&&/comprob|verific|check|confirm|permite|allows?|consent/.test(topic))return ({
 es:'Solicita la declaración del condominio, sus estatutos, reglamentos y enmiendas vigentes. Busca el plazo mínimo de alquiler, cuántos contratos se permiten, posibles periodos de espera y la aprobación de inquilinos. Pide al administrador confirmación por escrito para esa unidad y el alquiler que planeas. Comprueba además las reglas locales aplicables a su dirección; la asociación y la autoridad local son revisiones distintas. No te bases solo en un anuncio o en que otros publiquen en Airbnb. Si los documentos son ambiguos, pide revisión profesional antes de comprar.',
 en:'Request the current condominium declaration, bylaws, rules and amendments. Check minimum lease terms, rental frequency, waiting periods and tenant approval. Ask management for written confirmation for that unit and your intended rental. Separately verify local rules for the exact address. An advertisement or another unit on Airbnb is not proof. Have ambiguous documents reviewed before buying.',
 it:'Richiedi dichiarazione condominiale, statuto, regolamenti e modifiche vigenti. Verifica durata minima, frequenza degli affitti, periodi di attesa e approvazione degli inquilini. Chiedi conferma scritta per quella unità e l’affitto previsto. Controlla separatamente le norme locali per l’indirizzo esatto. Un annuncio o altre unità su Airbnb non bastano. Fai esaminare documenti ambigui prima di acquistare.',
 pt:'Solicite a declaração do condomínio, estatutos, regulamentos e alterações atuais. Confira prazo mínimo, frequência das locações, períodos de espera e aprovação de inquilinos. Peça confirmação escrita para a unidade e a locação pretendida. Verifique separadamente as regras locais do endereço. Anúncio ou outra unidade no Airbnb não comprovam permissão. Peça análise profissional de documentos ambíguos antes de comprar.'
 }[lang]||copy(lang).error)+'\n'+CONTACT.form;
 const selling=state.activity==='sell'||/\b(vender|vendo|venta|sell|selling|seller|vendere|vendita)\b/i.test(message);
 const simple=message.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
 if(selling&&/no (?:me )?alcanza|no (?:se )?cubre|no es suficiente|not enough|won.t cover|doesn.t cover|shortfall|less than.*owe|non basta|non copre|nao cobre|nao (?:e )?suficiente/.test(simple))return ({
 en:'If the sale will not cover the mortgage and selling costs, first calculate the shortfall using a payoff statement and estimated closing costs. You could cover the difference with your own funds or ask your loan servicer whether a short sale is an option. A short sale requires servicer approval; selling for less does not automatically forgive the remaining debt. Obtain written terms for any remaining balance and review possible legal and tax consequences before agreeing. Sabatino can help coordinate that review.',
 es:'Si la venta no cubre la hipoteca y los gastos, primero calcula la diferencia con el saldo de cancelación y un estimado de cierre. Podrías cubrirla con fondos propios o consultar al administrador del préstamo si existe una opción de venta corta (short sale). Esta requiere su aprobación; vender por menos no perdona automáticamente la deuda restante. Pide por escrito cómo se tratará cualquier saldo pendiente y revisa sus posibles efectos legales y fiscales antes de aceptar. Sabatino puede ayudarte a coordinar esa revisión.',
 it:'Se la vendita non copre il mutuo e le spese, calcola prima la differenza usando il conteggio di estinzione e una stima delle spese. Potresti coprirla con fondi propri oppure chiedere al gestore del mutuo se è possibile una short sale. Serve la sua approvazione: vendere a un prezzo inferiore non cancella automaticamente il debito residuo. Richiedi condizioni scritte sul saldo restante e valuta le conseguenze legali e fiscali prima di accettare. Sabatino può aiutarti a coordinare la verifica.',
 pt:'Se a venda não cobre o financiamento e as despesas, calcule primeiro a diferença com o valor de quitação e uma estimativa dos custos. Você pode cobri-la com recursos próprios ou consultar o administrador do empréstimo sobre uma short sale. Ela exige aprovação; vender por menos não perdoa automaticamente a dívida restante. Peça por escrito como será tratado o saldo e avalie as possíveis consequências legais e fiscais antes de aceitar. Sabatino pode ajudar a coordenar essa análise.'
 }[lang]||copy(lang).mortgage)+'\n'+CONTACT.form;
 if((state.activity==='sell'||/\b(vender|vendo|venta|sell|selling|seller|vendere|vendita)\b/i.test(message))&&/hipoteca|mortgage|mutuo|financiamento|neto|net proceeds/i.test(message)){
  const price=message.match(/(?:vendo\s+por|vender\s+por|venta\s*(?:de|por|:)|sell\s+for|selling\s+for|sale\s+price\s*:?|vendo\s+a)\s*(\$\s*[\d,.]+(?:\s*[km])?)/i);
  const debt=message.match(/(?:debo|deuda\s*(?:de|:)?|hipoteca\s*(?:pendiente|de|:)|owe|mortgage\s*(?:balance|of|:)|mutuo\s*(?:residuo|di|:))\s*(\$\s*[\d,.]+(?:\s*[km])?)/i);
  if(price&&debt){const net=money(price[1])-money(debt[1]);if(Number.isFinite(net))return t.before+': $'+net.toLocaleString('en-US',{maximumFractionDigits:2})+'. '+(net<0?t.shortfall:t.final);}
  return t.mortgage+'\n'+CONTACT.form;
 }
 if(/contact|contatt|phone|tel[eé]fono|telefone|e[ -]?mail|correo|llamar|chiamare/i.test(message))return t.contact+'\n'+t.phone+': '+CONTACT.phone+'\n'+t.email+': '+CONTACT.email+'\n'+t.form+': '+CONTACT.form;
 return null;
}
