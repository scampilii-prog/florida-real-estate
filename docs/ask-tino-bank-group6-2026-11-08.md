# Ask Tino — serie 6: seguro, inundación y clima

8 de noviembre de 2026. Se enviaron las preguntas 51–60, secuencialmente, a la API pública de Ask Tino antes y después de corregir; se revisaron completas las respuestas y fuentes.

## Hallazgos y resultado

Antes: 0/10 alcanzaron los criterios de detalle de la serie; no significa que todas sus frases fueran falsas. La comparación de viento/vivienda/inundación se desvió a una respuesta sobre estar fuera de zona de alto riesgo. La explicación de deducible porcentual no precisaba el límite/base asegurada frente al valor de mercado. Las demás respuestas fueron generales y omitieron distinciones importantes sobre alquiler, cotización frente a cobertura, restricciones de vacancia, historial autorizado y fecha efectiva.

Después: 10/10 criterios comprobados y lectura completa. Se incorporó guía española en functions/api/ask-tino-insurance-review.js, sin modificar diseño ni traducir nuevas guías. No cotiza, vende, vincula cobertura ni determina un siniestro; referencias editoriales, no consulta en vivo en cada respuesta.

Código: [903083a](https://github.com/scampilii-prog/florida-real-estate/commit/903083a46a4bf30537418fc274ef282c9777e949). Cloudflare Pages, rules y structural-audit: success antes de repetir consultas públicas. Todas las suites locales check-ask-tino, privacidad, integridad y check-website14 pasaron. Comprobaciones extra locales de API: prioridad de bloqueo de secreto sintético, compra al contado no elimina automáticamente espera NFIP y acceso autorizado a reclamaciones sin asumir reparación por pago. Sin nueva revisión visual del widget; prueba de respuestas del endpoint público que utiliza el chat.

## Fuentes revisadas y alcance

- [Florida CFO, seguros de vivienda](https://myfloridacfo.com/division/consumers/understanding-insurance/homeownersinsuranceoverview): riesgos, underwriting, reparación y avisos. No se inventó un plazo universal de cancelación o reparación.
- [CFO, deducible por huracán](https://myfloridacfo.com/division/consumers/consumerprotections/floridashurricanedeductible): límite asegurado/base de la póliza, aplicación por estructura y reglas del año calendario con misma compañía/grupo. No afirmar que cada huracán repite necesariamente todo el deducible ni que nunca queda otro.
- [CFO, comparar seguros](https://myfloridacfo.com/division/ica/shoppingforinsurance/tips): costo de reemplazo frente a valor depreciado y términos comparables.
- [NAIC, alquiler en plataformas](https://content.naic.org/article/consumer-insight-renting-out-your-home-you-need-insurance-coverage-home-sharing-rentals): uso real y cobertura; el permiso de alquiler no prueba seguro.
- [NFIP, contratar](https://www.floodsmart.gov/get-insured/buy-a-policy): espera general de 30 días y excepciones, confirmadas por agente para el caso. No prometer inicio automático por toda compraventa.
- [NFIP, certificado de elevación](https://www.floodsmart.gov/get-insured/elevation-certificates): características del edificio y consulta de registros; no garantiza todo el drenaje ni ausencia de inundación.
- [Regulador de Washington, CLUE](https://www.insurance.wa.gov/insurance-resources/auto-insurance/credit-and-insurance/clue-comprehensive-loss-underwriting-exchange): propietario solicita historial para comprador; fuente del mecanismo, no aplicación de leyes de Washington a Florida.
- [Chubb, inmueble vacío](https://www.chubb.com/us-en/individuals-families/resources/vacant-but-protected-tips-for-safeguarding-vacant-homes.html): ejemplo primario de distinción vacante/desocupado; no condiciones universales ni recomendación comercial de aseguradora.

## Diez respuestas públicas corregidas

### 51. ¿Qué diferencia hay entre seguro de viento, vivienda e inundación?

El seguro de vivienda reúne coberturas de inmueble, bienes y responsabilidad según la póliza; el viento puede estar incluido, excluido o asegurado por separado. El seguro de inundación cubre pérdidas por inundación definidas en su contrato, normalmente excluidas de la póliza habitual de vivienda. Distingue lluvia que entra por daño de viento de agua que sube o marejada: la causa y las exclusiones importan. Compara pólizas y deducibles por riesgo con un agente; una cobertura no reemplaza automáticamente a las otras ni estar fuera de zona de alto riesgo elimina la posibilidad de inundación.
Referencia general (no consulta en vivo ni confirmación de cobertura): https://myfloridacfo.com/division/consumers/understanding-insurance/homeownersinsuranceoverview
https://floridacostiera.com/contact#tell-us-your-plans

### 52. ¿Cómo reviso si la póliza cubre uso vacacional o alquiler?

Describe al agente por escrito uso vacacional, meses de ocupación, períodos vacíos, alquiler largo o corto y cualquier plataforma de hospedaje. Pide confirmación escrita de que la aseguradora acepta ese uso y qué póliza/endosos exige; revisa responsabilidad, daños de huéspedes, bienes y pérdida de renta, límites y exclusiones. La protección de una plataforma no equivale necesariamente a seguro integral del propietario. Permiso de HOA o municipio no prueba cobertura; avisa cambios de uso antes de alquilar y no supongas que una póliza de residencia principal sirve para todo.
Referencia general (no consulta en vivo ni confirmación de cobertura): https://content.naic.org/article/consumer-insight-renting-out-your-home-you-need-insurance-coverage-home-sharing-rentals
https://floridacostiera.com/contact#tell-us-your-plans

### 53. ¿Qué debo comprobar antes de aceptar una cotización de seguro?

Compara cotizaciones con iguales datos y coberturas: aseguradora y agente verificables, dirección, uso real, límites por inmueble/bienes/responsabilidad, valor de reemplazo o depreciado, deducibles por riesgo, exclusiones de viento/inundación y endosos. Revisa prima total, cargos, vigencia de oferta, inspecciones, reparaciones y condiciones de emisión, además de aceptación del prestamista. Una cotización no equivale a cobertura contratada; pide evidencia escrita de emisión o binder autorizado, pago y fecha/hora efectiva. No evalúes solo la prima ni supongas que todos los daños por agua están cubiertos.
Referencia general (no consulta en vivo ni confirmación de cobertura): https://myfloridacfo.com/division/ica/shoppingforinsurance/tips
https://floridacostiera.com/contact#tell-us-your-plans

### 54. ¿Qué significa un deducible porcentual por huracán?

Un deducible porcentual por huracán se calcula sobre el valor asegurado o límite indicado en la póliza, no sobre el precio de compra ni necesariamente sobre el importe del daño. Pide que el agente lo convierta a dólares y confirme base vigente, endosos de inflación y aplicación por estructura. En pólizas residenciales personales de Florida, revisa la regla de acumulación por año calendario con la misma aseguradora o grupo y cómo opera en huracanes posteriores; no presupongas que siempre se paga todo otra vez o que nunca hay otro deducible. Verifica también deducible de otros riesgos e inundación.
Referencia general (no consulta en vivo ni confirmación de cobertura): https://myfloridacfo.com/division/consumers/consumerprotections/floridashurricanedeductible
https://floridacostiera.com/contact#tell-us-your-plans

### 55. ¿Cómo comparo valor de reemplazo y valor real depreciado?

Valor de reemplazo estima reparar o sustituir con materiales de clase y calidad similares sin deducir depreciación, sujeto a límites y condiciones; valor real depreciado (ACV) descuenta antigüedad y desgaste. No equivalen al precio de venta ni al valor del terreno. Compara por separado vivienda, techo y bienes personales, endosos, límites, deducibles y requisitos para recuperar depreciación. Pide al agente explicar si el pago inicial y final difieren y qué pruebas y plazos aplican; reemplazo no garantiza pago ilimitado ni actualización de códigos sin cobertura correspondiente.
Referencia general (no consulta en vivo ni confirmación de cobertura): https://myfloridacfo.com/division/ica/shoppingforinsurance/tips
https://floridacostiera.com/contact#tell-us-your-plans

### 56. ¿Qué comprobaciones necesito sobre elevación y drenaje del lote?

Pide levantamiento topográfico y certificado de elevación si existe; verifica dirección, fecha, cotas y referencia vertical con un agrimensor competente. Contrasta mapa FEMA vigente, elevación base aplicable, historial de inundación, permisos y determinaciones con el administrador local de floodplain. Encarga revisión del drenaje real: pendientes, escorrentía vecina, zanjas, alcantarillas, servidumbres y obras permitidas; un certificado de la casa no evalúa todo el lote. No modificar drenaje sin confirmar autorizaciones. Un lote elevado o zona de menor riesgo no garantiza ausencia de agua ni prima o exención de seguro; pide cotización específica.
Referencia general (no consulta en vivo ni confirmación de cobertura): https://www.floodsmart.gov/get-insured/elevation-certificates
https://floridacostiera.com/contact#tell-us-your-plans

### 57. ¿Qué debería consultar si una casa tuvo varias reclamaciones de agua?

Pide al vendedor historial y documentos autorizados de reclamaciones, causa, fechas, daños, reparaciones, secado y permisos aplicables. Un reporte CLUE debe obtenerse por el propietario/canal autorizado; el comprador no tiene acceso libre al historial personal. Distingue tubería, filtración, inundación y daños aún abiertos; encarga inspección y evaluación de humedad independientes. Revisa con aseguradora elegibilidad, exclusiones y prima antes de comprometerte. Una reclamación pagada no demuestra reparación ni que la causa esté resuelta; ausencia de reclamaciones tampoco prueba ausencia de daños. No envíes pólizas ni datos personales al chat.
Referencia general (no consulta en vivo ni confirmación de cobertura): https://www.insurance.wa.gov/insurance-resources/auto-insurance/credit-and-insurance/clue-comprehensive-loss-underwriting-exchange
https://floridacostiera.com/contact#tell-us-your-plans

### 58. ¿Qué reviso antes de comprar una vivienda que lleva tiempo vacía?

Confirma cuánto tiempo estuvo vacía y en qué condiciones: servicios, climatización, fugas, humedad, plagas, mantenimiento, seguridad y reparaciones pendientes. Encarga inspección independiente de instalaciones y estructura; coordina activación segura de servicios con profesionales para no ocultar limitaciones de la inspección. Pregunta al agente cómo define la póliza vacante frente a desocupada temporalmente, qué exclusiones o endosos aplican y si acepta el uso futuro. No hay un plazo universal de vacancia válido para todas las pólizas; estar anunciada en venta o tener muebles no prueba cobertura. Revisa también posesión y acceso autorizados.
Referencia general (no consulta en vivo ni confirmación de cobertura): https://www.chubb.com/us-en/individuals-families/resources/vacant-but-protected-tips-for-safeguarding-vacant-homes.html
https://floridacostiera.com/contact#tell-us-your-plans

### 59. ¿Cómo verifico que una póliza empiece a tiempo para el cierre?

Obtén de aseguradora o agente autorizado evidencia escrita de emisión/binder aceptable, dirección y asegurados correctos, pago, coberturas y fecha y hora efectiva; confirma requisitos con prestamista y título. Una cotización, solicitud o recibo por sí solo no acredita toda cobertura. El NFIP generalmente tiene espera de 30 días con excepciones, como determinadas operaciones de préstamo; una compra al contado no elimina por sí sola la espera. El seguro privado puede tener otras reglas. Confirma por escrito cualquier excepción y restricciones de contratación por tormenta antes del cierre; no canceles una cobertura previa ni asumas transferencia automática de la póliza del vendedor.
Referencia general (no consulta en vivo ni confirmación de cobertura): https://www.floodsmart.gov/get-insured/buy-a-policy
https://floridacostiera.com/contact#tell-us-your-plans

### 60. ¿Qué debo pedir si el seguro exige reparaciones después de comprar?

Pide por escrito el informe de inspección, reparaciones exigidas, plazo y fecha límite, pruebas aceptadas y consecuencias de incumplir; distingue recomendación de condición de cobertura, cancelación o no renovación. Obtén presupuestos de contratistas habilitados, permisos aplicables y reinspection cuando corresponda; entrega pruebas por canal seguro y solicita aceptación escrita de la aseguradora. Si no llegas, pide extensión antes de vencer: solicitarla no garantiza aprobación ni suspende el plazo. Revisa los avisos y opciones con el agente y, si hay disputa, Florida DFS o asesor jurídico; no supongas cobertura continua ni que la inspección privada sustituye la revisión del seguro.
Referencia general (no consulta en vivo ni confirmación de cobertura): https://myfloridacfo.com/division/consumers/understanding-insurance/homeownersinsuranceoverview
https://floridacostiera.com/contact#tell-us-your-plans

## Evidencia y siguiente paso

El JSON adjunto conserva las preguntas y respuestas completas antes/después, criterios devueltos y resultados. Repetir con `node scripts/check-ask-tino-bank-group6.mjs --live`. Criterios finitos en español, no certificación de toda respuesta ni de una póliza concreta.

Siguiente serie: grupo 7, preguntas 61–70, Título, impuestos y gastos. Siguen pendientes bibliotecas privadas autenticadas de formularios Florida Realtors/MIAMI/Stellar, inspección del Worker externo/prácticas de datos y recepción real del correo. OceanFL y My Closing Timeline no se modificaron.
