// Bounded retrieval: public curated sources only. No arbitrary URLs or search-provider claims.
const official={
 charlotte:['Charlotte County — Community Development','https://www.charlottecountyfl.gov/departments/community-development/'],
 sarasota:['Sarasota County','https://www.scgov.net/'],lee:['Lee County — Community Development','https://www.leefl.gov/dcd'],
 venice:['City of Venice','https://www.venicegov.com/'],northport:['City of North Port','https://www.northportfl.gov/'],
 punta:['City of Punta Gorda','https://www.cityofpuntagordafl.com/'],citysarasota:['City of Sarasota','https://www.sarasotafl.gov/'],
 statutes:['Florida Statutes — Florida Senate','https://www.flsenate.gov/Laws/Statutes'],rules:['Florida Administrative Code','https://flrules.org/'],
 frec:['Florida DBPR / Real Estate Commission','https://www2.myfloridalicense.com/real-estate-commission/statutes-and-rules/'],
 firpta:['IRS — FIRPTA','https://www.irs.gov/individuals/international-taxpayers/firpta-withholding'],
 flood:['FEMA Flood Map Service Center','https://msc.fema.gov/portal/home'],ethics:['NAR — Code of Ethics','https://www.nar.realtor/about-nar/governing-documents/the-code-of-ethics'],
 fair:['HUD — Fair Housing','https://www.hud.gov/program_offices/fair_housing_equal_opp'],tax:['Florida Department of Revenue — Property Tax','https://floridarevenue.com/property/Pages/default.aspx']
};
const texts={
 es:{intro:'Fuentes oficiales para consultar',scope:'Puedo consultar páginas de un directorio oficial seleccionado; no hago una búsqueda completa de Internet. No conozco todas las leyes ni puedo certificar su vigencia o aplicación a una propiedad.',jur:'La autoridad depende de la dirección exacta y de los límites municipales y del condado. No todas las comunidades tienen ayuntamiento propio. Confirma la jurisdicción de la parcela antes de solicitar permisos.',live:'Página consultada ahora',fail:'No pude consultar esta página ahora; enlace de referencia, contenido no verificado en esta consulta',excerpt:'Extracto de la página (no es una interpretación legal)',legal:'Leer una página no confirma todas las normas aplicables, modificaciones o restricciones de HOA. Para tu caso, confirma con la autoridad y un abogado o profesional tributario.',internal:'Contenido de Florida Costiera',none:'No encontré una página del sitio que coincida con suficiente precisión. Puedes consultar el mapa del sitio.',contact:'Para orientación inmobiliaria personalizada: https://floridacostiera.com/contact#tell-us-your-plans'},
 en:{intro:'Official sources to consult',scope:'I can consult selected official directory pages; this is not a full Internet search. I do not know all laws and cannot certify their currency or application to a property.',jur:'Authority depends on the exact address and city/county boundaries. Not every community has its own City Hall. Verify the parcel jurisdiction before requesting permits.',live:'Page consulted now',fail:'I could not retrieve this page now; reference link only, content not verified in this request',excerpt:'Page excerpt (not legal interpretation)',legal:'Reading a page does not establish every applicable rule, amendment or HOA restriction. Confirm your case with the authority and a legal or tax professional.',internal:'Florida Costiera content',none:'I could not find a sufficiently precise site match. Please consult the site map.',contact:'For personalized real estate guidance: https://floridacostiera.com/contact#tell-us-your-plans'},
 it:{intro:'Fonti ufficiali da consultare',scope:'Posso consultare pagine di un elenco ufficiale selezionato; non è una ricerca completa su Internet. Non conosco tutte le leggi e non posso certificarne validità o applicazione a un immobile.',jur:'L’autorità dipende dall’indirizzo esatto e dai confini comunali e della contea. Non tutte le comunità hanno un municipio. Verifica la giurisdizione della particella prima di richiedere permessi.',live:'Pagina consultata ora',fail:'Non ho potuto consultare questa pagina ora; solo riferimento, contenuto non verificato in questa richiesta',excerpt:'Estratto della pagina (non interpretazione legale)',legal:'La lettura di una pagina non verifica tutte le norme, modifiche o restrizioni HOA. Conferma il caso con l’autorità e un professionista legale o fiscale.',internal:'Contenuti Florida Costiera',none:'Non ho trovato una pagina sufficientemente pertinente. Consulta la mappa del sito.',contact:'Per assistenza immobiliare personalizzata: https://floridacostiera.com/contact#tell-us-your-plans'},
 pt:{intro:'Fontes oficiais para consultar',scope:'Posso consultar páginas de um diretório oficial selecionado; não é uma pesquisa completa na Internet. Não conheço todas as leis nem posso certificar sua vigência ou aplicação a um imóvel.',jur:'A autoridade depende do endereço exato e dos limites municipais e do condado. Nem toda comunidade tem prefeitura própria. Confirme a jurisdição do imóvel antes de solicitar licenças.',live:'Página consultada agora',fail:'Não consegui consultar esta página agora; apenas referência, conteúdo não verificado nesta consulta',excerpt:'Trecho da página (não é interpretação jurídica)',legal:'Ler uma página não verifica todas as regras, alterações ou restrições HOA. Confirme seu caso com a autoridade e um profissional jurídico ou tributário.',internal:'Conteúdo Florida Costiera',none:'Não encontrei uma página suficientemente pertinente. Consulte o mapa do site.',contact:'Para orientação imobiliária personalizada: https://floridacostiera.com/contact#tell-us-your-plans'}
};
export function selectSources(q){
 const keys=[];const add=(...a)=>keys.push(...a);
 if(/firpta/i.test(q))add('firpta');
 if(/flood|inund|alluv|fema/i.test(q))add('flood');
 if(/fair housing|discrimin/i.test(q))add('fair');
 if(/ethic|ética|etica|etico|etico/i.test(q))add('ethics');
 if(/property tax|impuest|impost|tribut/i.test(q))add('tax');
 if(/city hall|ayuntamiento|municip|comune|prefeitura|permit|permis|zon|county|condado|contea|govern/i.test(q)){
 if(/rotonda|cape haze|port charlotte|placida/i.test(q))add('charlotte');
 if(/englewood/i.test(q))add('charlotte','sarasota');
 if(/boca grande|gasparilla/i.test(q))add('lee','charlotte');
 if(/wellen park/i.test(q))add('northport','venice','sarasota');
 else if(/venice/i.test(q))add('venice','sarasota');
 if(/north port/i.test(q))add('northport','sarasota');
 if(/punta gorda/i.test(q))add('punta','charlotte');
 if(/nokomis|casey key/i.test(q))add('sarasota');
 else if(/sarasota/i.test(q))add('citysarasota','sarasota');
 if(!keys.length)add('charlotte','sarasota');
 }
 if(/law|laws|ley|leyes|legge|leggi|normativ|regulat|statut|frec|dbpr|regol|legisla/i.test(q)&&!keys.length)add('statutes','rules','frec');
 return [...new Set(keys)].slice(0,3).map(k=>official[k]);
}
const strip=s=>s.replace(/<!--[\s\S]*?-->/g,' ').replace(/<(script|style|nav|header|footer)\b[^>]*>[\s\S]*?<\/\1>/gi,' ').replace(/<[^>]*>/g,' ').replace(/&nbsp;|&#160;/g,' ').replace(/&amp;/g,'&').replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/\s+/g,' ').trim();
export async function consultSource(source,q,fetcher=fetch){
 const [name,url]=source;const control=new AbortController();const timer=setTimeout(()=>control.abort(),4500);
 try{
 const r=await fetcher(url,{signal:control.signal,redirect:'manual',headers:{Accept:'text/html'}});
 // No redirects to unreviewed destinations and no bot/challenge text presented as evidence.
 if(!r.ok||!r.headers.get('content-type')?.includes('text/html'))return {name,url,ok:false};
 const reader=r.body.getReader();let size=0,chunks=[];while(true){const {done,value}=await reader.read();if(done)break;size+=value.length;if(size>500000){await reader.cancel();break;}chunks.push(value);}
 const html=chunks.map(b=>new TextDecoder().decode(b)).join('');
 const text=strip(html);if(text.length<150||/verify you are human|access denied|checking your browser|just a moment/i.test(text.slice(0,1800)))return {name,url,ok:false};
 const terms=q.toLowerCase().match(/[a-záéíóú]{4,}/g)||[];
 const main=html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1]||html;
 const sentences=strip(main).split(/(?<=[.!?])\s+/).filter(s=>s.length>40&&s.length<650);
 const ranked=sentences.map(s=>({s,n:terms.filter(t=>s.toLowerCase().includes(t)).length})).filter(x=>x.n>0).sort((a,b)=>b.n-a.n);
 const excerpt=(ranked[0]?.s||'').split(/\s+/).slice(0,24).join(' ');
 return {name,url,ok:true,excerpt,date:new Date().toISOString().slice(0,10)};
 }catch{return {name,url,ok:false};}finally{clearTimeout(timer);}
}
export async function researchReply(message,lang,index,fetcher=fetch){
 const t=texts[lang]||texts.en;const sources=selectSources(message);
 if(sources.length){const results=await Promise.all(sources.map(s=>consultSource(s,message,fetcher)));return t.intro+'\n'+t.scope+'\n\n'+(/city hall|ayuntamiento|municip|comune|prefeitura|permit|permis|zon|county|condado|contea/i.test(message)?t.jur+'\n\n':'')+results.map(r=>r.name+'\n'+r.url+'\n'+(r.ok?t.live+' — '+r.date:t.fail)+(r.excerpt?'\n'+t.excerpt+': «'+r.excerpt+'…»':'')).join('\n\n')+'\n\n'+t.legal;}
 if(!/sitio|site|sito|website|gu[ií]a|guide|calculator|calculadora|calcol|question|pregunta|domand|comunidade|community|communities|comunidad|promocion|publicit/i.test(message))return null;
 const terms=message.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').match(/[a-z]{3,}/g)||[];
 const synonyms={calculadora:'calculator',calculadoras:'calculator',calcolatrice:'calculator',guia:'guide',guias:'guide',preguntas:'questions',domande:'questions',venta:'sell',vender:'sell',comprar:'buy',compra:'buy',hipoteca:'mortgage',mutuo:'mortgage',inversion:'investment',investimento:'investment',comunidades:'communities',contacto:'contact'};
 const tokens=terms.map(w=>synonyms[w]||w).filter(w=>!['sitio','site','sito','website','florida','costiera','donde','puedo','informacion','sobre','para','the','del','las','los','que','una','con','del','this','your','can','you','del','dei','del'].includes(w));
 const hits=index.map(p=>({p,n:tokens.reduce((n,w)=>n+(p.search.includes(w)?1:0),0)})).filter(x=>x.n).sort((a,b)=>b.n-a.n).slice(0,3);
 return t.internal+'\n\n'+(hits.length?hits.map(({p})=>p.title+'\n'+p.description+'\nhttps://floridacostiera.com/'+p.path).join('\n\n'):t.none+'\nhttps://floridacostiera.com/site-map')+'\n\n'+t.contact;
}
