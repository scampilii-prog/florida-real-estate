# Ask Tino — serie 7: título, impuestos y gastos

8 de noviembre de 2026. Diez preguntas 61–70, enviadas secuencialmente al endpoint público de Ask Tino, revisión completa antes y después y contraste con fuentes oficiales.

## Hallazgos y correcciones

Antes: 0/10 alcanzaron los criterios de detalle. No equivale a falsedad de toda frase: hubo omisiones y desvíos. Sí hubo un error material: describía el compromiso de título como garantía de título claro y libre de defectos. Las preguntas de impuestos atrasados y prorrateo recibieron un directorio de fuentes no recuperadas, sin orientación sustantiva. El resto no distinguía adecuadamente identidad del judgment, gravámenes aún no registrados, propiedad frente a deuda, autoridad para vender herencia y costos regulados frente a negociados.

Después: 10/10 criterios comprobados y respuestas completas leídas. Nueva guía española functions/api/ask-tino-title-review.js, después de controles de política y antes de respuestas generales. Referencias editoriales, no examen de título, contrato o residencia fiscal; sin solicitar documentación personal en chat ni interpretar una cláusula privada.

Código: [6b55b6e](https://github.com/scampilii-prog/florida-real-estate/commit/6b55b6e39a636097c25d5173703ccb5ab58b3d5d). Cloudflare Pages, rules y structural-audit success antes de repetir las consultas públicas. Todas las suites locales check-ask-tino, privacidad, integridad y check-website14 pasaron. Tres comprobaciones adicionales locales: prioridad de bloqueo de secreto sintético; facultad de venta en probate sin universalizar fin del proceso; cambio de escritura frente a deuda y consideración fiscal. Sin nueva inspección visual del widget ni nuevas traducciones: comprobado endpoint público usado por el chat.

## Fuentes revisadas

- [Florida CFO, título](https://myfloridacfo.com/division/consumers/understanding-insurance/title-insurance-overview): pólizas, requisitos, excepciones y tarifas reguladas; no garantías de todas las cargas o defectos.
- [Florida Bar, compra](https://www.floridabar.org/public/consumer/pamphlet006/): compromiso condicionado y póliza, cobertura del prestamista frente a propietario.
- [F.S.55.10, 2026](https://www.flsenate.gov/Laws/Statutes/2026/0055.10): requisitos de registro de judgment; revisar identidad, aplicación a parcela y protecciones con abogado.
- [DBPR, gravámenes por construcción](https://www2.myfloridalicense.com/pro/cilb/documents/florida_lien_law.pdf): pagos al contratista no prueban pago a proveedores/subcontratistas. No se trasladaron umbrales antiguos de su folleto como regla actual universal.
- [Pinellas Tax Collector, certificados](https://www.pinellastaxcollector.gov/property-tax/faq/): certificado tributario no transmite dominio. La deuda y trámite concretos se consultan con recaudador/Clerk del condado de la propiedad.
- [CFPB, Closing Disclosure](https://www.consumerfinance.gov/owning-a-home/closing-disclosure/) y [regla de desglose](https://www.consumerfinance.gov/rules-policy/regulations/1026/38/): liquidación y prorrateos, distintos de obligaciones pactadas en contrato.
- [Florida DOR, cambio de homestead](https://floridarevenue.com/faq/Pages/FAQDetails.aspx?FAQID=1641): exención versus portabilidad y solicitudes; [F.S.193.155](https://www.flsenate.gov/Laws/Statutes/2026/193.155) para evaluación por titularidad. Sin cálculo individual ni determinación de residencia.
- [Florida DOR, documentary stamps](https://floridarevenue.com/taxes/taxesfees/Pages/doc_stamp.aspx): deuda puede ser consideración; no presumir tasa, exención o coste único.
- [CFPB, título versus deuda](https://www.consumerfinance.gov/ask-cfpb/can-a-debt-collector-contact-me-about-a-debt-after-a-divorce-en-1413/): quitar nombre de título no elimina responsabilidad del préstamo.
- [Florida Bar, probate](https://www.floridabar.org/public/consumer/pamphlet026/) y [F.S.733.613](https://www.flsenate.gov/Laws/Statutes/2026/Chapter733/All): autoridad de representante y excepciones; no toda propiedad heredada necesita la misma vía ni todas las ventas esperan al final del probate.

## Diez respuestas públicas después de corregir

### 61. ¿Qué diferencia hay entre compromiso de título y póliza emitida?

El compromiso de título indica aseguradora, asegurados propuestos, inmueble, importe, requisitos previos y excepciones para emitir la póliza. No equivale a la póliza emitida ni certifica título libre de toda carga. Pide el documento completo con anexos y copias de las excepciones; revisa con título o abogado qué debe subsanarse y los plazos de objeción del contrato. Después del cierre, solicita la póliza y coteja asegurado, descripción legal, fecha, cobertura, endosos y excepciones con lo acordado. No supongas cobertura solo por pagar la prima.
Referencia general (no consulta en vivo ni examen de título o contrato): https://myfloridacfo.com/division/consumers/understanding-insurance/title-insurance-overview
https://floridacostiera.com/contact#tell-us-your-plans

### 62. ¿Qué protege la póliza del prestamista y qué protege la del propietario?

La póliza de título del prestamista protege su interés en el préstamo; no sustituye la protección del propietario. La póliza del propietario protege su interés frente a pérdidas por riesgos de título cubiertos, dentro del importe, exclusiones, excepciones y condiciones aplicables. Pide ambas propuestas y endosos, identifica asegurados y revisa servidumbres, restricciones y gravámenes excluidos con título o abogado. No es seguro contra todos los defectos físicos, inundación o incumplimiento futuro; una póliza del préstamo no garantiza recuperar tu inversión.
Referencia general (no consulta en vivo ni examen de título o contrato): https://myfloridacfo.com/division/consumers/understanding-insurance/title-insurance-overview
https://floridacostiera.com/contact#tell-us-your-plans

### 63. ¿Qué documentos reviso si hay un judgment contra el vendedor?

Pide a título y abogado copia del judgment y su registro, expediente judicial, identidad del deudor, fechas, monto actualizado y documentos de satisfacción, liberación o resolución que correspondan. Un nombre parecido no prueba que sea el vendedor; una sentencia tampoco grava automáticamente todos sus inmuebles. Hay que revisar si afecta esta parcela, vigencia, prioridad y posibles protecciones de homestead sin presumirlas. Solicita requisitos escritos del asegurador para cerrar y evidencia de su cumplimiento/registro; no aceptes como solución solo la promesa del vendedor ni determines por chat que el título está limpio.
Referencia general (no consulta en vivo ni examen de título o contrato): https://www.flsenate.gov/Laws/Statutes/2026/0055.10
https://floridacostiera.com/contact#tell-us-your-plans

### 64. ¿Cómo verifico un gravamen por obras antes del cierre?

Pide a título o abogado búsqueda actualizada de gravámenes, Notice of Commencement, avisos, claim of lien y expediente, junto con contrato de obra, pagos y declaración final del contratista cuando corresponda. Revisa liberaciones de contratista, subcontratistas y proveedores, su alcance, condiciones y registro requerido. No basta una factura pagada al contratista: podría no haber pagado a terceros. Obras recientes pueden generar derechos aún no registrados; confirma cómo los resolverá el asegurador antes de cerrar. La inspección final del permiso no elimina por sí sola un gravamen ni sustituye revisión jurídica.
Referencia general (no consulta en vivo ni examen de título o contrato): https://www2.myfloridalicense.com/pro/cilb/documents/florida_lien_law.pdf
https://floridacostiera.com/contact#tell-us-your-plans

### 65. ¿Qué debo comprobar sobre impuestos atrasados o tax certificates?

Consulta por la parcela exacta con el recaudador de impuestos del condado los años pendientes, tax certificates, intereses/cargos y monto de redención vigente; verifica también con el Clerk si hay procedimiento o subasta de tax deed. Pide a título cómo se pagará y acreditará la liberación antes del cierre, con cifras actualizadas a la fecha de pago. Un tax certificate es un derecho de cobro/gravamen por impuestos, no propiedad del inmueble; pagarlo no transfiere automáticamente la propiedad. No confundas impuestos de la cuenta corriente con certificados o actuaciones pendientes ni asumas que el prorrateo los extingue.
Referencia general (no consulta en vivo ni examen de título o contrato): https://www.pinellastaxcollector.gov/property-tax/faq/
https://floridacostiera.com/contact#tell-us-your-plans

### 66. ¿Cómo reviso prorrateos de impuestos al cierre?

Revisa en el contrato y liquidación qué período corresponde a cada parte, fecha de corte, base de días y si el prorrateo usa la factura real o un importe estimado. Contrasta con el recaudador pagos, descuentos, cargos y evaluaciones no ad valorem; separa impuestos atrasados de los del año corriente. Si es estimado, aclara por escrito si habrá reprorrateo, quién lo solicita y cómo se ajusta al llegar la factura. No presupongas una regla universal ni que la exención del vendedor o su factura reflejan tus impuestos futuros; pide estimación al Property Appraiser y revisa cifras con título.
Referencia general (no consulta en vivo ni examen de título o contrato): https://www.consumerfinance.gov/owning-a-home/closing-disclosure/
https://floridacostiera.com/contact#tell-us-your-plans

### 67. ¿Cómo consulto el efecto de cambiar mi residencia principal?

Consulta al Property Appraiser del condado fechas y requisitos de homestead, obligación de informar cambios y efecto sobre Save Our Homes e impuestos de ambas viviendas. La exención homestead no se traslada automáticamente; la portabilidad de diferencia de valoración es distinta y requiere elegibilidad y solicitud. Contrasta ocupación real, titularidad y calendario, sin asumir dos residencias principales exentas. Si cambias de estado o país, revisa por separado domicilio y residencia fiscal con asesor tributario; también informa a seguro y prestamista cuando corresponda. El chat no determina tu residencia ni calcula ahorro sin datos verificados.
Referencia general (no consulta en vivo ni examen de título o contrato): https://floridarevenue.com/faq/Pages/FAQDetails.aspx?FAQID=1641
https://floridacostiera.com/contact#tell-us-your-plans

### 68. ¿Qué debo revisar antes de quitar o añadir un nombre a la escritura?

Antes de modificar la escritura, pide revisión de abogado, título, prestamista y asesor tributario: titularidad actual, forma de copropiedad, derechos del cónyuge/herederos, hipoteca, seguro de título, homestead y consecuencias de donación, impuestos y registro. Quitar un nombre de la escritura no libera automáticamente de la deuda hipotecaria; añadirlo tampoco convierte por sí solo al nuevo titular en prestatario. No supongas que un quitclaim resuelve cargas o evita impuestos: una transferencia sin efectivo puede tener consideración por deuda y excepciones que deben analizarse. Confirma efectos y requisitos antes de firmar o registrar.
Referencia general (no consulta en vivo ni examen de título o contrato): https://floridarevenue.com/taxes/taxesfees/Pages/doc_stamp.aspx
https://floridacostiera.com/contact#tell-us-your-plans

### 69. ¿Qué reviso si el vendedor heredó la propiedad pero no terminó probate?

Pide revisión de abogado de probate y título sobre escritura vigente, certificado de defunción y expediente: testamento admitido si existe, nombramiento/letters del representante, órdenes y autoridad para vender. Ser heredero o tener un testamento no prueba por sí solo facultad para transmitir título asegurable. La vía depende de titularidad, supervivencia, trust y posible homestead; no toda venta exige probate terminado ni toda herencia exige probate. Confirma quién debe firmar, qué autorizaciones y registros faltan, requisitos del asegurador y calendario realista antes de comprometer cierre o liberar fondos.
Referencia general (no consulta en vivo ni examen de título o contrato): https://www.floridabar.org/public/consumer/pamphlet026/
https://floridacostiera.com/contact#tell-us-your-plans

### 70. ¿Qué debo preguntar sobre costos de compra sin asumir una tarifa universal?

Pide un desglose escrito y específico de préstamo, título/cierre, impuestos de documentos y registro, inspecciones, seguro, prepagos, escrow, asociación y compensaciones pactadas. Identifica quién cobra, quién paga según contrato, qué es estimado y qué cargos son negociados o regulados; una prima de título regulada no hace universal el costo total. Con financiación, compara Loan Estimate y Closing Disclosure; al contado, pide liquidación detallada. Separa down payment de costos y prepagos, revisa créditos y evita duplicidades. No uses un porcentaje único ni asumas que toda comisión o gasto es obligatorio o negociable.
Referencia general (no consulta en vivo ni examen de título o contrato): https://www.consumerfinance.gov/owning-a-home/closing-disclosure/
https://floridacostiera.com/contact#tell-us-your-plans

## Evidencia y continuidad

JSON adjunto: preguntas, respuestas completas antes/después, criterios devueltos y resultados. Repetir con `node scripts/check-ask-tino-bank-group7.mjs --live`. Cobertura finita en español, no garantía de toda respuesta o expediente concreto.

Siguiente: grupo 8, preguntas 71–80, Alquiler e inversión. Continúan pendientes conexión autorizada a bibliotecas privadas Florida Realtors/MIAMI/Stellar, revisión del Worker externo/prácticas de datos y recepción real de correo. OceanFL y My Closing Timeline no se modificaron.
