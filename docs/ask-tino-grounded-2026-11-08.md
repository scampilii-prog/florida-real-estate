# Ask Tino — consulta dirigida, respuesta útil y banco de preguntas

Fecha: 8 de noviembre de 2026 (America/New_York).

## Qué quedó implementado

- Banco inicial ampliable de 100 preguntas, organizadas en diez grupos: [documento completo](ask-tino-question-bank-100.md). No es una lista exhaustiva de toda pregunta posible. Grupos 2–10: pendientes de auditoría individual, sin declararlos aprobados.
- Diez temas nuevos de consulta dirigida en español: APR, PMI, cuenta escrow hipotecaria, Loan Estimate, Closing Disclosure, plomo, radón, intercambio 1031, depósitos de alquiler y portabilidad.
- Fuentes seleccionadas CFPB, IRS, EPA, Florida Health, Florida Revenue y Florida Bar, además del directorio oficial existente. No es búsqueda abierta por todo Internet ni consulta MLS.
- Mientras hay solicitud real, el cliente muestra preparación/consulta-si-hace-falta en cuatro idiomas. No hay espera artificial ni afirmación prematura de consulta realizada.
- Se distingue página recuperada de referencia no recuperada. Fecha de recuperación no significa vigencia legal ni aplicabilidad a un caso.
- La orientación práctica editorial siempre permanece. La evidencia puede complementarla, nunca sustituirla por una frase suelta. Si no se puede confirmar un punto, indica qué documento/profesional consultar y ofrece el contacto de Sabatino.
- No se transmite la pregunta del visitante a las fuentes: se solicitan URLs fijas seleccionadas. Las llamadas al AI externo usan el servicio ya existente, con pregunta y fragmento público limitados. No hay cola permanente de preguntas ni promesa de callback.

## Evidencia

- Primera implementación: `14eeeb92c65a3401ee92d9e2186c0d380539b11b`.
- La primera prueba pública pasó condiciones de fuente/contacto, pero al leer las respuestas se detectaron resúmenes demasiado cortos. Se corrigió el criterio: mantener siempre la orientación práctica completa. No presentar un conteo como evaluación universal de calidad.
- Corrección final: `2cd97a1244433f74d32cb709f3542192549b5943`. Cloudflare Pages, rules y structural-audit: success.
- Diez preguntas públicas finales: 10/10, comprobando fuente, estado real, contacto y presencia de la orientación práctica; lectura completa. [JSON público](ask-tino-grounded-2026-11-08-results.json).
- Pruebas locales: diez con fuentes desconectadas, síntesis válida, respuesta inválida del modelo, límites de prompt, redirect, challenge, minimización de datos y prioridad de protección de documentos. Rondas anteriores y auditoría estructural completa aprobadas.
- Navegador real en Home: abrir chat, preguntar diferencia tasa/APR, observar el nuevo estado de espera y respuesta con CFPB y estado de recuperación. El ajuste final afecta servidor y conserva esa interfaz; su resultado se comprobó en la repetición pública posterior.
- Versiones research1 coherentes en cargadores y referencias de páginas para evitar caché antigua; sin cambio de diseño ni esquema de criterios.

## Límites que deben conservarse

Las diez rutas nuevas son en español. El estado de espera y el siguiente paso ante error genérico tienen cuatro idiomas. El sistema no conoce todas las leyes, no verifica propiedades por recuperar páginas y no garantiza disponibilidad de fuentes externas. Las comprobaciones de salida del modelo reducen errores, no demuestran exactitud legal completa. Configuración interna y retención del Worker externo siguen fuera de esta auditoría. OceanFL y My Closing Timeline no se modificaron.

## Primer grupo: respuestas completas publicadas

### 1. ¿Qué diferencia hay entre la tasa de interés y el APR de una hipoteca?

Orientación general de referencia:
La tasa de interés y el APR no miden lo mismo: el APR incorpora determinados costos del préstamo. Compara ofertas equivalentes y pide al prestamista explicar cargos y condiciones; no sirve para garantizar cuál préstamo te conviene.

CFPB — Interest rate and APR
https://www.consumerfinance.gov/ask-cfpb/what-is-the-difference-between-a-mortgage-interest-rate-and-an-apr-en-135/
Página recuperada ahora — 2026-11-08. Recuperarla no confirma que aplique a tu caso.

Para el caso concreto, revisa documentos y requisitos con el profesional correspondiente. Si me indicas qué punto necesitas aclarar, puedo orientarte sobre el siguiente paso.
https://floridacostiera.com/contact#tell-us-your-plans

### 2. ¿Qué es el PMI y a quién protege?

Orientación general de referencia:
El PMI es un seguro hipotecario privado que protege al prestamista, no tu vivienda. Pregunta costo, modalidad y condiciones de cancelación para tu préstamo; no lo confundas con seguro de vivienda o inundación.

CFPB — Private mortgage insurance
https://www.consumerfinance.gov/ask-cfpb/what-is-private-mortgage-insurance-en-122/
Página recuperada ahora — 2026-11-08. Recuperarla no confirma que aplique a tu caso.

Para el caso concreto, revisa documentos y requisitos con el profesional correspondiente. Si me indicas qué punto necesitas aclarar, puedo orientarte sobre el siguiente paso.
https://floridacostiera.com/contact#tell-us-your-plans

### 3. ¿Qué diferencia hay entre una cuenta escrow hipotecaria y el depósito de compraventa?

Orientación general de referencia:
La cuenta escrow hipotecaria se utiliza para pagar determinados impuestos y seguros. Es distinta del depósito de compraventa. Pide al administrador del préstamo el análisis, cargos y explicación de cualquier diferencia; no asumas que un aumento significa un cambio en tu tasa.

Nota del fragmento recuperado:
Una cuenta escrow hipotecaria se establece para pagar gastos relacionados con la propiedad.

CFPB — Escrow account
https://www.consumerfinance.gov/ask-cfpb/what-is-an-escrow-or-impound-account-en-140/
Página recuperada ahora — 2026-11-08. Recuperarla no confirma que aplique a tu caso.

Para el caso concreto, revisa documentos y requisitos con el profesional correspondiente. Si me indicas qué punto necesitas aclarar, puedo orientarte sobre el siguiente paso.
https://floridacostiera.com/contact#tell-us-your-plans

### 4. ¿Cómo comparo dos Loan Estimates con gastos y créditos diferentes?

Orientación general de referencia:
Revisa el Loan Estimate para comparar tasa, costos, créditos y efectivo estimado al cierre. Compara ofertas bajo los mismos supuestos y pide al prestamista explicar las diferencias. Una estimación no es una garantía de aprobación ni de costos finales.

CFPB — Loan Estimate
https://www.consumerfinance.gov/owning-a-home/loan-estimate/
Página recuperada ahora — 2026-11-08. Recuperarla no confirma que aplique a tu caso.

Para el caso concreto, revisa documentos y requisitos con el profesional correspondiente. Si me indicas qué punto necesitas aclarar, puedo orientarte sobre el siguiente paso.
https://floridacostiera.com/contact#tell-us-your-plans

### 5. ¿Qué debo comparar entre el Closing Disclosure y el Loan Estimate?

Orientación general de referencia:
Contrasta el Closing Disclosure con tu Loan Estimate y acuerdos: nombres, préstamo, tasa, gastos y efectivo al cierre. Señala discrepancias al prestamista y compañía de cierre antes de firmar. El plazo aplicable y si un cambio exige nueva espera deben confirmarse para tu operación.

Nota del fragmento recuperado:
Pagos mensuales totales estimados y estimados de impuestos y seguros

CFPB — Closing Disclosure
https://www.consumerfinance.gov/owning-a-home/closing-disclosure/
Página recuperada ahora — 2026-11-08. Recuperarla no confirma que aplique a tu caso.

Para el caso concreto, revisa documentos y requisitos con el profesional correspondiente. Si me indicas qué punto necesitas aclarar, puedo orientarte sobre el siguiente paso.
https://floridacostiera.com/contact#tell-us-your-plans

### 6. ¿Qué debo revisar sobre pintura con plomo antes de comprar una casa antigua?

Orientación general de referencia:
Consulta las divulgaciones federales aplicables de pintura con plomo, antecedentes e informes disponibles y opciones de evaluación profesional. Una divulgación no demuestra ausencia de plomo. Antes de renovar, revisa los requisitos y profesionales adecuados; no puedo determinar exposición o seguridad de una casa.

EPA — Lead disclosures
https://www.epa.gov/lead/real-estate-disclosures-about-potential-lead-hazards
No pude recuperar la página ahora; el enlace es de referencia y no está verificado en esta consulta.

Para el caso concreto, revisa documentos y requisitos con el profesional correspondiente. Si me indicas qué punto necesitas aclarar, puedo orientarte sobre el siguiente paso.
https://floridacostiera.com/contact#tell-us-your-plans

### 7. ¿Cómo compruebo si una casa tiene radón?

Orientación general de referencia:
Para evaluar radón se necesita una prueba adecuada; la apariencia de la casa no permite descartarlo. Pide resultados anteriores y considera medición y mitigación por profesionales cualificados dentro de tus plazos contractuales. No puedo determinar el nivel de una propiedad.

Nota del fragmento recuperado:
Puedes obtener información adicional sobre radón y pruebas de radón en el departamento de salud de tu condado.

Florida Health — Radon and real estate
https://www.floridahealth.gov/community-environmental-public-health/environmental-public-health/air-quality/radon/real-estate-transactions/
Página recuperada ahora — 2026-11-08. Recuperarla no confirma que aplique a tu caso.

Para el caso concreto, revisa documentos y requisitos con el profesional correspondiente. Si me indicas qué punto necesitas aclarar, puedo orientarte sobre el siguiente paso.
https://floridacostiera.com/contact#tell-us-your-plans

### 8. ¿Qué debería consultar antes de intentar un intercambio 1031?

Orientación general de referencia:
Un intercambio 1031 puede diferir reconocimiento de ganancias en operaciones inmobiliarias de inversión que cumplan requisitos. No es una exención automática ni se aplica por llamar inversión a una casa. Consulta asesor tributario e intermediario cualificado antes de vender o recibir fondos.

IRS — Like-kind exchanges
https://www.irs.gov/businesses/small-businesses-self-employed/like-kind-exchanges-real-estate-tax-tips
Página recuperada ahora — 2026-11-08. Recuperarla no confirma que aplique a tu caso.

Para el caso concreto, revisa documentos y requisitos con el profesional correspondiente. Si me indicas qué punto necesitas aclarar, puedo orientarte sobre el siguiente paso.
https://floridacostiera.com/contact#tell-us-your-plans

### 9. ¿Qué documentos necesito para consultar la devolución de un depósito de alquiler?

Orientación general de referencia:
Revisa contrato, pagos, avisos y hechos concretos con un profesional. Los depósitos, reclamaciones y terminación del alquiler tienen reglas y plazos; no supongas que puedes retener renta, cambiar cerraduras o desalojar por tu cuenta. No pegues datos privados del inquilino.

Florida Bar — Tenants and landlords
https://www.floridabar.org/public/consumer/tip014/
Página recuperada ahora — 2026-11-08. Recuperarla no confirma que aplique a tu caso.

Para el caso concreto, revisa documentos y requisitos con el profesional correspondiente. Si me indicas qué punto necesitas aclarar, puedo orientarte sobre el siguiente paso.
https://floridacostiera.com/contact#tell-us-your-plans

### 10. ¿Cómo averiguo si califico para portabilidad del beneficio Save Our Homes?

Orientación general de referencia:
El tasador del condado determina elegibilidad para exenciones y portabilidad. Pide requisitos, fechas y formularios para tu situación; la exención del vendedor no se traslada automáticamente al comprador. La portabilidad del beneficio de valoración es una cuestión distinta.

Nota del fragmento recuperado:
Revisa la Homestead Exemption y Save Our Homes Assessment Limitation

Florida Revenue — Exemptions
https://floridarevenue.com/property/Pages/Taxpayers_Exemptions.aspx
Página recuperada ahora — 2026-11-08. Recuperarla no confirma que aplique a tu caso.

Para el caso concreto, revisa documentos y requisitos con el profesional correspondiente. Si me indicas qué punto necesitas aclarar, puedo orientarte sobre el siguiente paso.
https://floridacostiera.com/contact#tell-us-your-plans
