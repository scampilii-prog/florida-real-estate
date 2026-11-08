# Ask Tino — fuentes de formularios y acceso real

Revisión: 8 de noviembre de 2026. Inventario de fuentes y límites, no biblioteca completa de contratos ni garantía de versiones vigentes.

## Regla de trabajo solicitada por Tino

Antes de explicar una cláusula o calcular una fecha, identificar emisor, nombre/código, fecha de revisión, documento concreto y addenda/modificaciones. No tratar un formulario MLS como contrato de compraventa ni trasladar reglas entre FR/Bar, CRSP, vacant land, commercial, listing o lease. Para un caso concreto falta la copia ejecutada y sus datos pertinentes; no pedir contratos completos con información personal al chat público. Un fragmento debe estar anonimizado.

| Fuente | Acceso observado | Qué permite afirmar | Qué no está conectado |
| --- | --- | --- | --- |
| [Florida Realtors — Form Simplicity](https://www.floridarealtors.org/tools-research/form-simplicity) | Página pública del servicio; biblioteca asociada a membresía | Ruta oficial para formularios y contratos | No hay sesión/API autenticada de la biblioteca en Ask Tino |
| [Form Descriptions](https://www.floridarealtors.org/tools-research/form-descriptions) / [Form Updates](https://www.floridarealtors.org/tools-research/form-updates) | Ambas redirigieron a login en la revisión | Se conoce dónde comprobar descripción y actualización autorizada | No se leyó la biblioteca completa ni todas sus versiones |
| [MIAMI — MLS Forms & Applications](https://miamirealtors.zendesk.com/hc/en-us/articles/9946105013787-MLS-FORMS-APPLICATIONS) | Índice público con enlaces | Identificar fuentes de autorizaciones y formularios MLS | No prueba acceso a toda biblioteca de contratos de MIAMI |
| [MIAMI — Form Simplicity](https://miamirealtors.zendesk.com/hc/en-us/articles/41789667134747-Form-Simplicity-Questions-and-Answers) | Explicación pública del acceso de miembros | Canal de acceso a formularios del miembro | Una membresía personal no conecta automáticamente un chat web |
| [Stellar — Listing Forms](https://www.stellarmls.com/documents/listing-forms) | Índice público | Ubicar formularios de captura/listado y autorizaciones | No equivale a contratos FR/Bar íntegros |
| [Stellar — TransactionDesk](https://www.stellarmls.com/products/transactiondesk) | Descripción pública; acceso mediante suscripción | Ruta de miembro para transacciones/formularios | No hay autenticación ni sincronización de TransactionDesk con Ask Tino |

## Ejemplos del inventario público, sin copiar cuerpos completos

- Florida Realtors: familias Residential FR/Bar estándar, AS IS, CRSP, vacant land y commercial; confirmar código/revisión y addenda vigentes en biblioteca autorizada. Fuentes públicas: [recursos](https://www.floridarealtors.org/law-ethics/nar-settlement-sitzer-burnett-lawsuit), [contratos](https://www.floridarealtors.org/law-ethics/library/florida-real-estate-contract-laws). Las páginas pueden conservar referencias antiguas; no declarar de ahí el código actual de todos los formularios.
- MIAMI: Office Exclusive/Exempt Listing, Written Permission to Advertise, Syndication/Address Display Opt-out, Status Change, Coming Soon, Auction, Affirmation of Presentation of Offer, Unlicensed Assistant, Reciprocal Listing y Appraiser Application. Son entradas observadas del índice, no todas analizadas cláusula por cláusula.
- Stellar: Commercial BUSO, Commercial Lease, Commercial Sale, Income, Rental, Residential, Status Change, Vacant Land y MLS Options for Property Owners Authorization. Son entradas del índice, no prueba de revisión de todo contenido o aplicación actual.

### Contenido público examinado y límites concretos

- [MIAMI — Broker Permission to Advertise](https://www.miamirealtors.com/wp-content/uploads/bsk-pdf-manager/2020/04/Permission-to-Advertise-04082020-1.pdf): PDF público de una página, encabezado revisado 03/21/2021. Se observan autorización del broker para publicidad, listado y fechas/canales; no es un contrato de compra. Su presencia en un índice público no acredita que sea la versión vigente en la cuenta del miembro. No se copió el cuerpo al repositorio.
- Stellar Residential: el índice muestra etiqueta septiembre de 2026, pero su enlace conduce a `Residential+August+2026.pdf` en CDN. El intento de lectura devolvió HTTP 403 en la herramienta de consulta. No se verificó el contenido. No atribuir la etiqueta de índice como fecha cierta del PDF.
- Se encontró documentación pública de API de Form Simplicity (https://formsapidev.floridarealtors.org/docs/fsforms), pero no se tienen credenciales, autorización de API de producción ni derechos de publicación de la biblioteca completa. No se creó una conexión ni se llamó a acciones de transacción. La búsqueda de conectores no encontró uno específico instalado para esta biblioteca.

## Hallazgo crítico: CRSP y conteo de días

La página general de contratos aún describe CRSP con días hábiles. Sin embargo, el [artículo oficial de julio de 2026](https://www.floridarealtors.org/news-media/news-articles/2026/07/crsp-contract-flying-under-radar) informa que el párrafo de tiempo se actualizó a días calendario, con cambio de hora y reglas de conteo hacia atrás. No aplicar una regla fija por la sigla CRSP: leer la revisión firmada, reglas de aceptación, entrega y addenda. El artículo es guía editorial, no sustituto de la copia aplicable.

## Política implementada

functions/api/ask-tino-contracts.js contiene referencias de los tres proveedores y una respuesta expresa de límites de acceso. Si se solicita un texto exacto que no está disponible, pide nombre/código/revisión y fragmento anonimizado; no inventa ni afirma haber leído la biblioteca privada. Los controles previos de privacidad y características protegidas conservan prioridad.

El alcance añadido es español. Las explicaciones generales no son interpretación jurídica individual ni redacción de cláusulas especiales; coordinar con Sabatino, título y abogado. El código de ética exige honestidad y atención a competencia profesional; no obliga a fingir acceso a documentos.

## Para ampliar acceso de forma real

1. Identificar con el proveedor qué API, licencia y alcance permiten consulta por un asistente del sitio; acceso de miembro a la interfaz no implica permiso de republicación.
2. Con conexión autorizada o documentos sin datos privados que legalmente puedan utilizarse, registrar emisor, código, revisión, fuente y alcance de lectura por archivo. No guardar credenciales o documentos ejecutados de clientes en GitHub.
3. Mantener versiones y revisión de cambios, retirando contenido sustituido; probar respuestas con la versión aplicable. Hasta entonces, este inventario debe conservarse como acceso parcial y referencias, no colección completa.
