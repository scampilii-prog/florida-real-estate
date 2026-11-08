# Ask Tino — serie 5: condominios y asociaciones

8 de noviembre de 2026. Preguntas 41–50 enviadas secuencialmente a la API pública antes y después. Se revisaron las respuestas completas y fuentes oficiales.

## Resultado y cambios

Antes: 0/10 alcanzaron los criterios de detalle de la serie. Esto no significa que todas las frases fueran falsas: predominaban respuestas generales y preguntas de contexto repetidas. La pregunta de titularidad de estacionamiento/depósito se desvió al mapa del sitio. Faltaban distinciones sobre efectivo/restricciones de reservas, aprobación real del presupuesto, votaciones, alcance de informes, seguro individual, autoridad que levanta una orden y aprobación del prestamista.

Después: 10/10 criterios comprobados y lectura completa. Nueva guía editorial española en functions/api/ask-tino-association-review.js. La política de datos y vivienda justa mantiene prioridad. No afirma verificación del condominio, libre acceso del comprador a todos los registros ni garantías de seguro, seguridad, aprobación o cancelación. Las reglas de capítulo 718 no deben trasladarse automáticamente a una HOA de capítulo 720.

Código: [5606105](https://github.com/scampilii-prog/florida-real-estate/commit/5606105079ee9a38f3544eb14abc71cde2af93ea). Cloudflare Pages, rules y structural-audit terminaron success antes de repetir preguntas públicas. Todas las suites locales check-ask-tino, privacidad, integridad y check-website14 pasaron. Tres comprobaciones locales adicionales de API: bloqueo de secreto sintético antes de orientación, acceso autorizado a actas y morosidad agregada sin porcentajes universales del prestamista. Sin nueva revisión visual del widget; cambio de respuestas/API, sin rediseño ni traducciones nuevas.

## Fuentes y límites

- [F.S.553.899](https://www.flsenate.gov/Laws/Statutes/2026/553.899): alcance, informes firmados/sellados, fases de inspección y competencia local. Una fase constructiva no es una fase de Milestone.
- [F.S.718.111](https://www.flsenate.gov/Laws/Statutes/2026/718.111): actas, documentos y registros; no presumir acceso ilimitado del comprador.
- [F.S.718.112, texto 2026 recuperado](https://www.flsenate.gov/Laws/Statutes/2026/0718.112): presupuesto, avisos, reservas y financiación. La ruta sin cero inicial tuvo 429 y la móvil timeout; se obtuvo el texto por la ruta citada. Las pausas de aportaciones tienen condiciones: no afirmar que toda pausa es legal ni ilegal. Un préstamo no equivale a reservas de efectivo acumuladas.
- [F.S.718.503](https://www.flsenate.gov/Laws/Statutes/2026/718.503): entrega de documentos en venta; no se calculó plazo individual ni se leyó contrato privado.
- [F.S.718.106](https://www.flsenate.gov/Laws/Statutes/2026/718.106): uso de elementos comunes y derechos anexos; título y asignación no son sinónimos.
- [DBPR FAQ](https://www2.myfloridalicense.com/condominiums-and-cooperatives/faqs/): acceso y aprobación prevista en documentos; no plazo universal inventado.
- [Florida CFO, cobertura de vivienda](https://myfloridacfo.com/division/consumers/understanding-insurance/homeownersinsuranceoverview): HO-6 y loss assessment; póliza y causa cubierta controlan, no garantía de pagar toda derrama/deducible.
- [Fannie Mae Full Review, actualización agosto 2026](https://selling-guide.fanniemae.com/sel/b4-2.2-02/full-review-process): revisión del proyecto por prestamista. No convertir requisitos de un programa en ley o porcentaje universal.

## Diez respuestas públicas corregidas

### 41. ¿Cómo identifico qué edificio y fase cubre un informe de inspección?

Coteja nombre legal del condominio, dirección, número de edificio, parcela o plano, fecha y anexos del informe con la unidad que compras. Distingue fase constructiva del proyecto de fase 1/fase 2 de la Milestone bajo F.S.553.899: no son lo mismo. Pide informes completos firmados y sellados, planos del alcance y confirmación escrita del ingeniero y la autoridad sobre qué estructuras y fases están incluidas o pendientes. No extrapoles el informe de una torre a otra ni confundas Milestone con SIRS. Un resumen favorable no acredita reparación ni seguridad de todos los edificios.
Referencia general (no consulta en vivo ni verificación de esta asociación): https://www.flsenate.gov/Laws/Statutes/2026/553.899
https://floridacostiera.com/contact#tell-us-your-plans

### 42. ¿Qué diferencia hay entre reservas contables y dinero realmente disponible?

Una reserva contable no equivale necesariamente a efectivo disponible para cualquier obra. Pide estados financieros recientes, extractos y conciliaciones bancarias obtenidos por el canal autorizado, detalle por fondo, inversiones y vencimientos, cuentas por cobrar, cuentas por pagar y compromisos de obras. Contrasta el saldo con restricciones de uso, SIRS y calendario de desembolsos; una línea de crédito disponible es deuda, no ahorro acumulado. Revisa préstamos y cualquier pausa o reducción de aportaciones con su aprobación y fundamento vigente: no supongas que toda reserva puede eliminarse por votación ni que toda pausa es ilegal. No compartas extractos ni datos bancarios en este chat; solicita revisión contable profesional.
Referencia general (no consulta en vivo ni verificación de esta asociación): https://www.flsenate.gov/Laws/Statutes/2026/718.112
https://floridacostiera.com/contact#tell-us-your-plans

### 43. ¿Cómo comparo el presupuesto aprobado con el propuesto?

Pide el presupuesto aprobado, acta y fecha de adopción, ejercicio al que corresponde y cualquier modificación; separa el propuesto, que aún puede cambiar. Compara por partida cuotas, seguros, mantenimiento, reservas/SIRS, préstamos, obras y derramas, e identifica a qué edificio o condominio corresponden. Contrasta también ejecución real y desviaciones del año actual. Pide importe y fecha efectiva de la cuota de tu unidad y supuestos de aumentos. Un presupuesto aprobado no garantiza gastos finales ni ausencia de nuevos cobros; el propuesto no prueba una obligación ya aprobada.
Referencia general (no consulta en vivo ni verificación de esta asociación): https://www.flsenate.gov/Laws/Statutes/2026/718.112
https://floridacostiera.com/contact#tell-us-your-plans

### 44. ¿Qué actas pueden revelar reparaciones aún no presupuestadas?

Solicita actas de junta, asambleas y comités pertinentes, avisos/agendas recientes, informes de ingeniería y SIRS, ofertas, contratos y comunicaciones oficiales sobre obras. Busca recomendaciones o estudios en curso, presupuestos solicitados, litigios y financiación discutida; distingue propuesta, aprobación, contratación y ejecución. Pide confirmación escrita de reparaciones pendientes y estimación para la unidad cuando exista. La ausencia de una reparación en las actas entregadas no garantiza que no haya obras futuras; cruza los documentos con administración y profesionales. Canaliza la solicitud por vendedor o representante autorizado, sin presumir acceso irrestricto del comprador a todos los registros.
Referencia general (no consulta en vivo ni verificación de esta asociación): https://www.flsenate.gov/Laws/Statutes/2026/718.111
https://floridacostiera.com/contact#tell-us-your-plans

### 45. ¿Qué debo comprobar si la asociación tiene muchos propietarios morosos?

Pide información agregada de morosidad: número y porcentaje de unidades, importes, antigüedad de cuotas ordinarias y derramas, tendencia, provisiones y medidas de cobro. No solicites nombres ni datos financieros personales de vecinos. Evalúa efecto en efectivo, mantenimiento, préstamos y posibles aumentos de cuotas con un contador. Distingue deudas de tu unidad, que título debe revisar, de la situación global de la asociación. El prestamista debe comprobar elegibilidad del proyecto para su programa; no hay un porcentaje universal que apruebe o rechace todos los préstamos. No puedo declarar insolvencia por un dato aislado.
Referencia general (no consulta en vivo ni verificación de esta asociación): https://selling-guide.fanniemae.com/sel/b4-2.2-02/full-review-process
https://floridacostiera.com/contact#tell-us-your-plans

### 46. ¿Cómo averiguo si hay una votación pendiente antes de cerrar?

Pide por escrito a administración y vendedor avisos, agenda y calendario de reuniones o votaciones pendientes, incluidas derramas, presupuesto, reservas, préstamos y cambios de uso. Revisa actas y resultados cuando se celebren, y actualiza la consulta cerca del cierre; una conversación no acredita que nada esté pendiente. Obtén copias mediante el canal de acceso autorizado del vendedor. Si una decisión puede afectar tu compra, revisa con Sabatino y abogado cómo documentar avisos, distribución de costos o protección contractual antes de vencer plazos; no asumas que la votación permite cancelar automáticamente.
Referencia general (no consulta en vivo ni verificación de esta asociación): https://www.flsenate.gov/Laws/Statutes/2026/718.112
https://floridacostiera.com/contact#tell-us-your-plans

### 47. ¿Qué reviso si el seguro del edificio tiene un deducible alto?

Pide pólizas completas, declaraciones, endosos, vigencias y deducibles del edificio por riesgo, incluida su base de cálculo: un porcentaje puede aplicarse al valor asegurado, no al precio de tu unidad. Solicita cómo se distribuye una pérdida no cubierta o deducible, según ley y documentos. Revisa con un profesional tu HO-6, límites y exclusiones de loss assessment, sublímites por deducible y cobertura separada de inundación si corresponde. Una póliza HO-6 o un certificado no garantiza que pague toda derrama ni todo deducible; pide confirmación de escenarios y cotizaciones antes de comprometerte.
Referencia general (no consulta en vivo ni verificación de esta asociación): https://myfloridacfo.com/division/consumers/understanding-insurance/homeownersinsuranceoverview
https://floridacostiera.com/contact#tell-us-your-plans

### 48. ¿Qué debo pedir si el edificio tuvo una orden de evacuación?

Pide la orden original de evacuación, causa, fecha, alcance por edificio/unidad y modificaciones; solicita informes técnicos, permisos, inspecciones finales y estado actual del expediente. Obtén de la autoridad que corresponda constancia escrita de levantamiento y autorización de ocupación aplicable, con condiciones y áreas aún restringidas. La afirmación del administrador, una reparación o que otros vivan allí no acredita que la orden esté levantada. Confirma además pendientes, financiación de obras, seguro y requisitos del prestamista; encarga revisión técnica independiente. No entres en áreas restringidas ni supongas que el levantamiento elimina todos los riesgos.
Referencia general (no consulta en vivo ni verificación de esta asociación): https://www.flsenate.gov/Laws/Statutes/2026/553.899
https://floridacostiera.com/contact#tell-us-your-plans

### 49. ¿Cómo verifico quién es dueño de un estacionamiento o depósito?

Identifica número y ubicación exactos del estacionamiento o depósito y compara declaración registrada, planos, enmiendas, escritura y documentos de asignación. Puede ser unidad separada, elemento común de uso limitado o derecho asignado o arrendado; uso exclusivo no equivale siempre a propiedad separada. Pide a título o abogado confirmar titularidad, gravámenes y si el derecho pasa con esta venta o requiere otro acto, consentimiento o registro. Contrasta con confirmación escrita de la asociación. Una llave, pintura, uso histórico o anuncio no prueba título; verifica costos y restricciones antes de incluirlo como propiedad del vendedor.
Referencia general (no consulta en vivo ni verificación de esta asociación): https://www.flsenate.gov/Laws/Statutes/2026/718.106
https://floridacostiera.com/contact#tell-us-your-plans

### 50. ¿Qué debo confirmar sobre aprobación del comprador por la asociación?

Confirma primero si la declaración y reglas vigentes exigen aprobación del comprador y qué órgano la emite. Pide procedimiento escrito, solicitud, cargos autorizados, plazos, entrevista si aplica y constancia de expediente completo; coordina el calendario contractual sin inventar un plazo universal. Entrega documentación sensible solo por el canal seguro autorizado de la asociación, no aquí. La solicitud presentada no garantiza aprobación; la aprobación de la asociación no sustituye la del prestamista ni autoriza automáticamente alquiler u ocupación. Si hay demora o negativa, pide fundamento escrito y revisión jurídica de derechos y opciones, respetando vivienda justa.
Referencia general (no consulta en vivo ni verificación de esta asociación): https://www2.myfloridalicense.com/condominiums-and-cooperatives/faqs/
https://floridacostiera.com/contact#tell-us-your-plans

## Evidencia y continuidad

JSON adjunto: diez respuestas completas antes/después, resultados y criterios devueltos. Repetir con `node scripts/check-ask-tino-bank-group5.mjs --live`. Son comprobaciones finitas en español; no garantizan toda respuesta futura.

Siguiente: grupo 6, preguntas 51–60, Seguro, inundación y clima. Continúa pendiente el acceso autenticado autorizado a bibliotecas privadas Florida Realtors/MIAMI/Stellar; consultar docs/ask-tino-forms-access-2026-11-08.md. El Worker externo y recepción real de correo conservan sus pendientes. OceanFL y My Closing Timeline no se modificaron.
