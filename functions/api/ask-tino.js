// Same-origin bridge to the existing Ask Tino service.
const UPSTREAM = 'https://ask-tino-ai.scampilii.workers.dev/';
const MAX_MESSAGE = 2000;
const json = (body, status = 200, extra = {}) => new Response(JSON.stringify(body), {
 status, headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', ...extra }
});
export async function onRequest({ request }) {
 if (request.method !== 'POST') return json({ error: 'Use POST to send a message.' }, 405, { Allow: 'POST' });
 const origin = request.headers.get('Origin');
 if (origin && origin !== new URL(request.url).origin) return json({ error: 'Use the chat on this website.' }, 403);
 if (!request.headers.get('Content-Type')?.toLowerCase().startsWith('application/json')) return json({ error: 'Send JSON.' }, 415);
 if (Number(request.headers.get('Content-Length')) > 16000) return json({ error: 'Message is too long.' }, 413);
 let body;
 try {
  const text = await request.text();
  if (text.length > 16000) return json({ error: 'Message is too long.' }, 413);
  body = JSON.parse(text);
 } catch { return json({ error: 'Invalid message.' }, 400); }
 const message = typeof body?.message === 'string' ? body.message.trim() : '';
 if (!message || message.length > MAX_MESSAGE) return json({ error: 'Enter a message of 1–2,000 characters.' }, 400);
 // Introduce Florida Costiera as a platform, not just a contact referral.
 if (/florida\\s+costiera/i.test(message) && /qu[eé]\\s+es|qu[eé]\\s+servicios|servicios\\s+ofrece|what\\s+is|what\\s+services|cos['’]?\\s*[eè]|servizi|ofrece|offers/i.test(message)) {
  const reply = /what\\s+is|what\\s+services|offers/i.test(message)
   ? 'Florida Costiera is a real estate information and services website focused on Southwest Florida’s Gulf Coast, led by Sabatino Campilii, Realtor® with LoKation® Real Estate. It helps buyers and sellers explore homes, waterfront properties, new construction, local communities, buying and selling guides, real estate questions and calculators. It covers areas such as Boca Grande, Englewood, Rotonda West, Venice, Punta Gorda and Sarasota. Website: https://floridacostiera.com/.'
   : /servizi|cos['’]?\\s*[eè]/i.test(message)
   ? 'Florida Costiera è un sito di informazioni e servizi immobiliari dedicato alla costa sud-occidentale del Golfo della Florida, guidato da Sabatino Campilii, Realtor® con LoKation® Real Estate. Offre risorse per acquistare e vendere casa, esplorare proprietà sull’acqua, nuove costruzioni, comunità locali, guide, domande frequenti e calcolatori immobiliari. Sito: https://floridacostiera.com/.'
   : 'Florida Costiera es una plataforma de información y servicios inmobiliarios dedicada a la costa suroeste del Golfo de Florida, dirigida por Sabatino Campilii, Realtor® de LoKation® Real Estate. Ayuda a compradores y vendedores a explorar viviendas, propiedades frente al agua, nuevas construcciones y comunidades locales. También ofrece guías de compra y venta, preguntas frecuentes y calculadoras inmobiliarias. Cubre zonas como Boca Grande, Englewood, Rotonda West, Venice, Punta Gorda y Sarasota. Sitio web: https://floridacostiera.com/.';
  return json({ reply });
 }
 // Give a grounded short professional biography instead of a generic sales pitch.
 if (/\b(sabatino|tino)\s+campilii\b/i.test(message) && /qui[eé]n|who|chi\\s+[eè]|experiencia|experience|esperienza|trayectoria|background/i.test(message)) {
  const reply = /who|experience|background/i.test(message)
   ? 'Sabatino Campilii is a Florida Realtor® with LoKation® Real Estate (Florida license SL3363040). He has more than 25 years of experience in construction and real estate, with an engineering and development background. He focuses on communities along Southwest Florida’s Gulf Coast, including Boca Grande, Englewood, Rotonda West, Venice and Punta Gorda.'
   : /chi\s+[eè]|esperienza/i.test(message)
   ? 'Sabatino Campilii è un Realtor® in Florida con LoKation® Real Estate (licenza SL3363040). Ha oltre 25 anni di esperienza nell’edilizia e nel settore immobiliare, con un passato nell’ingegneria e nello sviluppo immobiliare. Opera soprattutto nella costa sud-occidentale del Golfo della Florida.'
   : 'Sabatino Campilii es Realtor® en Florida con LoKation® Real Estate (licencia SL3363040). Cuenta con más de 25 años de experiencia en construcción y bienes raíces, y trayectoria en ingeniería y desarrollo inmobiliario. Se especializa en comunidades de la costa suroeste del Golfo de Florida, como Boca Grande, Englewood, Rotonda West, Venice y Punta Gorda.';
  return json({ reply });
 }
 // Avoid inventing biographies or turning unknown-person questions into advertisements.
 if (/marietta\s+campilii/i.test(message)) {
  const reply = /who|english/i.test(message)
   ? 'I do not have verified information about Marietta Campilii. Could you share a detail to help identify her?'
   : /chi\s+[eè]|italian/i.test(message)
   ? 'Non dispongo di informazioni verificate su Marietta Campilii. Puoi darmi qualche dettaglio per identificarla?'
   : 'No dispongo de información verificada sobre Marietta Campilii. ¿Podrías darme algún detalle para identificarla?';
  return json({ reply });
 }
 // Verified creative partner: answer directly, without a generic real-estate referral.
 if (/acr[oó]matico/i.test(message)) {
  const reply = /chi|cos.?[eè]|italian/i.test(message)
   ? 'Acromatico è il marchio creativo legato a Italo Campilii, che si occupa di design, pubblicità e comunicazione visiva. È accreditato sul sito Florida Costiera. Italo non è un agente immobiliare. Sito: https://acromatico.com/.'
   : /who|what|english/i.test(message)
   ? 'Acromatico is the creative brand associated with Italo Campilii, working in design, advertising and visual communications. It is credited on the Florida Costiera website. Italo is not a licensed real estate agent. Website: https://acromatico.com/.'
   : 'Acromatico es la marca creativa vinculada a Italo Campilii, dedicada al diseño, la publicidad y la comunicación visual. Aparece acreditada en el sitio de Florida Costiera. Italo no es agente inmobiliario. Sitio web: https://acromatico.com/.';
  return json({ reply });
 }
 // Answer common closing-cost questions with useful general guidance first.
 // No property-specific estimate without a purchase price, financing and location.
 if (/gastos? de cierre|costos? de cierre|closing costs?|spese di chiusura|costi di chiusura/i.test(message)) {
  const isSpanish = /gastos?|costos?|cierre/i.test(message);
  const isItalian = /spese|costi|chiusura/i.test(message);
  const answer = isSpanish
   ? 'Al comprar una casa en Florida, los gastos de cierre pueden incluir:\\n\\n1. **Préstamo hipotecario:** tasación, cargos del prestamista y otros costos de financiación, si corresponde.\\n2. **Título y cierre:** búsqueda de título, seguro de título, servicios de cierre y registro de documentos. Quién paga cada concepto depende del contrato y las prácticas locales.\\n3. **Impuestos y ajustes:** posibles impuestos documentarios, gastos prepagados de seguro e impuestos sobre la propiedad, y depósitos iniciales de escrow.\\n\\nEl monto exacto depende del precio, el financiamiento, el condado y el contrato. Pide al prestamista un Loan Estimate y, antes del cierre, revisa el Closing Disclosure. Para una estimación de una propiedad concreta, puedes contactar a Sabatino Campilii al (941) 270-4877.'
   : isItalian
   ? 'In Florida, i costi di chiusura per chi acquista possono comprendere:\\n\\n1. **Mutuo:** perizia e commissioni del finanziatore, se applicabili.\\n2. **Titolo e chiusura:** ricerca del titolo, assicurazione del titolo, registrazione degli atti e servizi di chiusura. La ripartizione dipende dal contratto.\\n3. **Imposte e anticipi:** eventuali imposte documentarie, assicurazione e imposte immobiliari anticipate e deposito escrow.\\n\\nL’importo dipende dall’immobile, dal finanziamento e dal contratto. Per una stima specifica, contatta Sabatino Campilii al (941) 270-4877.'
   : 'When buying a home in Florida, closing costs may include:\\n\\n1. **Mortgage costs:** appraisal and lender fees, if financed.\\n2. **Title and closing:** title search, title insurance, recording and settlement services. Who pays varies by contract and local practice.\\n3. **Taxes and prepaid items:** applicable documentary taxes, prepaid property insurance and taxes, and initial escrow deposits.\\n\\nExact costs depend on price, financing, county and contract terms. Review your Loan Estimate and Closing Disclosure. For a property-specific estimate, contact Sabatino Campilii at (941) 270-4877.';
  return json({ reply: answer.replace(/\\\\n/g, '\\n') });
 }
 // Contact details come from verified site data, never from model recall.
 if (/contact|contatt|phone|tel[eé]fono|telefone|telephone|e[ -]?mail|correo|call\b|chiam|ligar|reach\b|contacter|contato|llamar/i.test(message)) {
  const details = /[¿¡]|c[oó]mo|correo|teléfono|llamar/i.test(message)
   ? 'Contacta a Sabatino Campilii, Realtor® de LoKation® Real Estate. Teléfono: (941) 270-4877. Correo: sabatino@floridacostiera.com. Formulario: https://floridacostiera.com/contact#tell-us-your-plans. Usa los botones de abajo para escribirle o llamarlo.'
   : /contatt|chiam|telefono/i.test(message)
   ? 'Contatta Sabatino Campilii, Realtor® di LoKation® Real Estate. Telefono: (941) 270-4877. Email: sabatino@floridacostiera.com. Modulo: https://floridacostiera.com/contact#tell-us-your-plans. Usa i pulsanti qui sotto per scrivergli o chiamarlo.'
   : /telefone|ligar|contato/i.test(message)
   ? 'Entre em contato com Sabatino Campilii, Realtor® da LoKation® Real Estate. Telefone: (941) 270-4877. E-mail: sabatino@floridacostiera.com. Formulário: https://floridacostiera.com/contact#tell-us-your-plans. Use os botões abaixo para escrever ou ligar.'
   : 'Contact Sabatino Campilii, Realtor® with LoKation® Real Estate. Phone: (941) 270-4877. Email: sabatino@floridacostiera.com. Contact form: https://floridacostiera.com/contact#tell-us-your-plans. Use the buttons below to send an inquiry or call him.';
  return json({ reply: details });
 }
 const reference = 'Verified Florida Costiera website information: Sabatino Campilii is a Realtor with LoKation Real Estate serving Southwest Florida Gulf Coast communities. His only website contact phone is (941) 270-4877. His email is sabatino@floridacostiera.com. Website: https://floridacostiera.com/. Contact form: https://floridacostiera.com/contact#tell-us-your-plans. Acromatico (https://acromatico.com/) is the creative brand associated with Italo Campilii, handling design, advertising and visual communications; it is credited in the Florida Costiera website footer. Italo is not a licensed real estate agent. You are a virtual assistant, not Sabatino. Do not invent contact details, listings, prices, availability, addresses, or live market statistics. If information is unavailable, refer the visitor to Sabatino. Reply in the visitor\'s language.\n\nVisitor message: ';
 const controller = new AbortController();
 const timer = setTimeout(() => controller.abort(), 15000);
 try {
  const upstream = await fetch(UPSTREAM, {
   method: 'POST', headers: { 'Content-Type': 'application/json' },
   body: JSON.stringify({ message: reference + message }), signal: controller.signal
  });
  const data = await upstream.json();
  if (!upstream.ok) return json({ error: 'The assistant could not respond. Contact Sabatino for personal help.' }, 502);
  // Normalize the upstream payload at the bridge, not just in the browser.
  let reply = data?.reply ?? data;
  for (let depth = 0; depth < 4; depth++) {
   if (typeof reply === 'string' && reply.trim().startsWith('{')) {
    try { reply = JSON.parse(reply); } catch { break; }
   }
   if (reply && typeof reply === 'object') {
    reply = reply.reply ?? reply.choices?.[0]?.message?.content ?? '';
   } else break;
  }
  if (typeof reply !== 'string' || !reply.trim()) return json({ error: 'The assistant could not respond. Contact Sabatino for personal help.' }, 502);
  return json({ reply: reply.trim().replace(/\\\\n/g, '\\n').replace(/\\*\\*/g, '') });
 } catch {
  return json({ error: 'The assistant is temporarily unavailable. Contact Sabatino for personal help.' }, controller.signal.aborted ? 504 : 502);
 } finally { clearTimeout(timer); }
}
