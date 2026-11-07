# Ask Tino — segunda ronda de diez preguntas

7 de noviembre de 2026. El asistente ejecuta las preguntas exactas del propietario; datos sintéticos y una sola conversación. Las primeras cuatro comprueban continuidad de preferencias.

## Hallazgos y correcciones

| Caso | Antes | Cambio |
| --- | --- | --- |
| Condominio y mascotas | Se omitían del estado y resumen | Nuevos campos validados y persistentes |
| Subir presupuesto | Decía $400,000 pero guardaba $350,000 | Frase “subir hasta” actualiza el dato real |
| Dos habitaciones → una | Conservaba el número negado | El reemplazo explícito prevalece |
| Resumen | Arrastraba presupuesto y habitaciones antiguos | Resume solo campos actuales, sin inventar piscina |
| Gastos del condominio | Contestación genérica y pregunta irrelevante | Presupuesto, reservas, cuotas extraordinarias y cobertura |
| Inspecciones | Documentos vagos y volvía a preguntar tipo conocido | Informes completos, milestone/SIRS si aplican y reparaciones |
| Inundación | Derivación MLS sin responder garantía | Riesgo residual y posible requisito del prestamista; sin certificar propiedad |
| Compra desde Italia | Solo explicaba visita virtual | Trámites remotos, firmas/notarización/poder sujetos a aceptación y seguridad de transferencias |
| Anuncio Airbnb contradictorio | Respuesta genérica y pregunta repetida | Documentos vigentes, confirmación escrita y reglas locales antes del compromiso |
| Preferencias enviadas/llamada | Solo mostraba contacto | Dice expresamente que no envió ni confirmó la llamada |

## Pruebas

Script: `node scripts/check-ask-tino-owner-round2.mjs`; opción `--live` para producción. Los tests locales bloquean red externa. La suite no sustituye revisión de las respuestas completas ni prueba todas las variantes posibles.

Local: 10/10 de esta ronda; 10/10 de la anterior; 60/60 generales; auditoría estructural, privacidad, fuentes y políticas aprobadas. Publicación y resultados reales se registran al completar la comprobación.

## Referencias de contenido

NFIP/FEMA: https://www.floodsmart.gov/flood-zones-and-maps/what-is-my-flood-zone y https://agents.floodsmart.gov/topics/flood-insurance-101 . DBPR: https://condos.myfloridalicense.com/faqs/ y https://condos.myfloridalicense.com/inspections/ . No se afirma que el chat consultó fuentes durante respuestas generales, ni que una propiedad específica cumple sus reglas.

## Comprobación publicada

Implementación: 60a716a44969e0a531e42acea81174c700ef8bd0; ajustes para no fijar cuota, país o fecha: 28572b4cd83c9fa8f8db303b47a6c90071856bbb.

Primera repetición publicada: **10/10 comprobaciones aprobadas** y revisión de las diez respuestas completas. En navegador real se probaron 1–4 consecutivas: el resumen conserva condominio, mascotas, Venice, $400,000 y una habitación, sin añadir piscina.

Se añadieron variantes para evitar que el ejemplo de cuota $900, Italia o llamada mañana se aplique a otra cuota, país o fecha. No se enviaron mensajes a Sabatino ni se confirmaron llamadas o reservas.

[Resultados sintéticos completos antes y después](ask-tino-owner-round2-2026-11-07-results.json).

Repetición final después de generalizar cuota/país/fecha: **10/10 en producción**. Se revisaron nuevamente las respuestas afectadas: no fija $900 como valor universal, no asume Italia al comprar desde otro país y no inventa fecha de llamada.

Cloudflare Pages, rules y structural-audit del commit final: success. Las pruebas automáticas incluyen esta ronda y la anterior.
