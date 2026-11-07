# Ask Tino — tercera ronda de diez preguntas

7 de noviembre de 2026. Diez preguntas sintéticas enviadas por el asistente en orden y dentro de la misma conversación. No se solicitó intervención manual al propietario.

## Fallos observados y correcciones

| Caso | Baseline público | Mejora |
| --- | --- | --- |
| Garaje y ausencia de asociación | No se guardaban | Campos validados y resumen |
| Piscina opcional | Seguía marcada como requerida | Se distingue opcional de excluida |
| Restaurar presupuesto y ampliar zonas | Conservaba $475,000 y elegía Port Charlotte | $450,000 y ambas ciudades como alternativas |
| Resumen con aclaración | Omitía requisitos y no aclaraba faltantes | Conserva preferencias y pregunta solo habitaciones desconocidas |
| Anuncio antiguo | Reconocía incertidumbre pero suponía una ciudad | No certifica estado/precio ni atribuye ubicación no dada |
| Vendedor paga cierre | Enlaces legales sin responder fondos necesarios | Anticipo, depósito, prepagos, créditos y Cash to Close |
| Reservas y cuota extraordinaria | Explicaba capacidad de búsqueda | Documentos, aprobación, importe, fechas y reparto contractual |
| Alquiler y uso personal | Guía demasiado genérica | Restricciones, disponibilidad real, gastos y registro fiscal de días |
| Instrucciones de transferencia | Solo mostraba contacto | Verificación independiente, no usar número del correo nuevo, banco inmediato si ya se transfirió |
| Resumen para enviar | Solo repetía criterios | Borrador en español para copiar, con indicación de que no se envió |

## Validación

Script: `node scripts/check-ask-tino-owner-round3.mjs`; `--live` usa el endpoint público. Los tests locales bloquean llamadas externas.

Local: diez nuevas, diez de ronda 2, diez anteriores y 60 generales aprobados; también auditoría estructural, privacidad, fuentes y políticas. No equivale a certificar todas las formulaciones posibles.

Commit: 306caa5c16d60dcae72e19a3e50eb7fc498b2aee. Publicación, repetición real y comprobación de navegador se añaden al verificarse.

## Fuentes consultadas

CFPB Loan Estimate: https://www.consumerfinance.gov/owning-a-home/loan-estimate/ . CFPB Closing Disclosure: https://www.consumerfinance.gov/owning-a-home/closing-disclosure/ . Protección de transferencias: https://files.consumerfinance.gov/f/documents/cfpb_mortgages-scams_one-pager.pdf . IRS uso personal/alquiler: https://www.irs.gov/publications/p527 . No se confirma una cuenta, un crédito concreto, recuperabilidad de fondos o una deducción fiscal individual.

## Resultado publicado y visual

Cloudflare Pages, rules y structural-audit del commit de implementación: success. Repetición real de las mismas diez preguntas, en orden: **10/10 comprobaciones aprobadas**, con revisión de las diez respuestas completas.

En navegador se comprobaron las primeras cuatro consecutivas: garaje para dos carros, sin asociación, piscina opcional, $450,000 y Englewood / Port Charlotte como alternativas. No elige ciudad ni inventa dormitorios; pregunta cuántas habitaciones se necesitan.

La respuesta 10 prepara un borrador para Sabatino y dice explícitamente que no fue enviado. Las guías no confirman listados, créditos, cuentas, deducciones o llamadas reales.

[Resultados sintéticos completos antes/después](ask-tino-owner-round3-2026-11-07-results.json).
