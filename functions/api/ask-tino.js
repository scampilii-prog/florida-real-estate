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
 const reference = 'Verified Florida Costiera website information: Sabatino Campilii is a Realtor with LoKation Real Estate serving Southwest Florida Gulf Coast communities. His only website contact phone is (941) 270-4877. His email is sabatino@floridacostiera.com. Website: https://floridacostiera.com/. Contact form: https://floridacostiera.com/contact#tell-us-your-plans. Italo handles advertising and photography and is not a licensed real estate agent. You are a virtual assistant, not Sabatino. Do not invent contact details, listings, prices, availability, addresses, or live market statistics. If information is unavailable, refer the visitor to Sabatino. Reply in the visitor\'s language.\n\nVisitor message: ';
 const controller = new AbortController();
 const timer = setTimeout(() => controller.abort(), 15000);
 try {
  const upstream = await fetch(UPSTREAM, {
   method: 'POST', headers: { 'Content-Type': 'application/json' },
   body: JSON.stringify({ message: reference + message }), signal: controller.signal
  });
  const data = await upstream.json();
  if (!upstream.ok || typeof data?.reply !== 'string' || !data.reply.trim()) return json({ error: 'The assistant could not respond. Contact Sabatino for personal help.' }, 502);
  return json({ reply: data.reply });
 } catch {
  return json({ error: 'The assistant is temporarily unavailable. Contact Sabatino for personal help.' }, controller.signal.aborted ? 504 : 502);
 } finally { clearTimeout(timer); }
}
