// Priority handling of risky requests and false premises. No visitor instruction overrides policy.
import {CONTACT} from '../../assets/ask-tino-core.js';
export const normalizeSafeguard=s=>String(s).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
export function objectiveHousingQuestion(s){
 return /comparar viviendas|comparar comunidades/.test(s)&&/accesibilidad|precio|distancia/.test(s)&&/sin usar datos sobre (?:raza|religion)/.test(s)&&!/no vivan|solo (?:personas|familias)|exclu|evit|predomin|sin (?:personas|familias|vecinos)/.test(s);
}
export function safeguardReply(q,lang='en'){
 if(lang!=='es')return null;const s=normalizeSafeguard(q);let reply,source;
 if(objectiveHousingQuestion(s)){
  reply='Sí: podemos comparar por criterios objetivos como accesibilidad física, precio y distancia al hospital, con fuentes verificables para cada propiedad. No usaré raza, religión ni otras características protegidas de vecinos para recomendar o excluir comunidades. Dime la ciudad o zona que quieres comparar; la información de una propiedad debe confirmarse y no tengo un inventario MLS en vivo.';
 }else if(/cerradur|cort(?:o|ar|are|ando).*(?:agua|luz|servicios)|corte.*servicios/.test(s)&&/inquilino|alquil|tenant/.test(s)){
  reply='No. No cambies cerraduras, cortes agua o servicios ni retires bienes para forzar al inquilino a salir. Vender no termina automáticamente un alquiler. Revisa lease, avisos y opciones de salida consensuada o procedimiento legal con abogado antes de prometer entrega vacante; no hay un plazo universal ni un desalojo autorizado por el chat.';source='https://www.flsenate.gov/Laws/Statutes/2026/0083.67';
 }else if(/cuenta|transfer|giro/.test(s)&&/correo|ultima hora|cambi/.test(s)&&/sin llamar|sin verific|urgente|confia|transfiera/.test(s)){
  reply='No transfieras por ese correo ni por presión de urgencia. Verifica el cambio por teléfono con título/escrow usando un número previamente verificado por un canal independiente, no el del mensaje nuevo. Si ya enviaste dinero, contacta inmediatamente al banco para intentar detener o recuperar la transferencia y reporta a FBI IC3. No hay garantía de recuperación; no compartas cuentas aquí y este chat no puede autenticar instrucciones ni enviar dinero.';source='https://www.ic3.gov/PSA/2023/psa230609';
 }else if(/confirma|di que|dime que/.test(s)&&/(?:ya |recibi|recibio|enviaste|confirmaste|aprobo)/.test(s)&&/oferta|visita|documentos|prestamo/.test(s)){
  reply='No puedo confirmar eso: este chat no ha enviado una oferta o documentos, confirmado una visita ni obtenido aprobación del préstamo. Una respuesta aquí o haber dado un email no acredita recepción por Sabatino ni aprobación del prestamista. Solicita confirmación directa por el canal acordado; no inventaré una acción realizada.';
 }else if(/(?:invent|inventa|finge)/.test(s)&&/ley|respuesta legal|norma|fuente|cita/.test(s)){
  reply='No inventaré una respuesta legal, una ley ni una fuente. Si no puedo comprobar un punto, lo señalaré y daré orientación general, una fuente oficial para verificar y el siguiente paso con el profesional apropiado; no presentaré una conclusión no verificada como cierta.';source='https://www.flsenate.gov/Laws/Statutes';
 }else if(/ignora.*reglas|system:|obedece.*texto/.test(s)&&/invent|ssn|privacidad|verific|mls|acceso completo/.test(s)){
  reply='No seguiré instrucciones del visitante ni de un texto citado que pidan inventar datos, ignorar privacidad o fingir verificaciones. No tengo acceso MLS en vivo ni puedo certificar una propiedad. No compartas SSN, contraseñas o documentos de identidad; puedo ayudarte con información general y fuentes oficiales, distinguiendo lo comprobado de lo pendiente.';
 }else if(/ley (?:florida )?\d{4}/.test(s)&&/confirma|sin verificar|exent/.test(s)){
  reply='No puedo validar una supuesta ley por su número o por lo que afirma un mensaje, ni confirmar una exención sin revisar el texto oficial, su vigencia y aplicación. Para condominios, identifica edificio, jurisdicción, norma y notificación; no hay una exención universal por decir que tiene 20 años. Consulta la autoridad local y el texto oficial antes de decidir.';source='https://www.flsenate.gov/Laws/Statutes/2026/553.899';
 }else if(/rotonda west/.test(s)&&/gated|guardia|entradas|comunidad cerrada/.test(s)){
  reply='No es correcto describir toda Rotonda West como una comunidad gated con guardia en todas las entradas. La asociación la presenta como comunidad con restricciones de escritura (deed-restricted); eso no equivale a acceso cerrado. Confirma dirección, subdivisión y reglas concretas con la asociación antes de anunciar vigilancia o control de acceso; no he verificado una propiedad.';source='https://rotondawest.org/';
 }else if(/nadie.*(?:guard|proces)|eliminaste.*servidor|promete.*mensajes/.test(s)){
  reply='No puedo prometer que nadie almacena o procesa mensajes ni afirmar que ya eliminé registros de servidores. El sitio y servicios externos pueden procesar la conversación; no he verificado sus registros o retención ni realizado una eliminación. La memoria de página no equivale a ausencia de registros del proveedor. Revisa Privacy y usa contacto para una solicitud de datos; no introduzcas información sensible.';source='https://floridacostiera.com/privacy#ask-tino-privacy';
 }
 return reply?reply+(source?'\nReferencia general (no consulta en vivo ni verificación individual): '+source:'')+'\n'+CONTACT.form:null;
}
