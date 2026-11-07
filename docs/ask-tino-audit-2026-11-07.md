# Ask Tino — auditoría de conversaciones del 7 de noviembre de 2026

## Método

Primera ronda: 35 turnos sintéticos enviados al endpoint público real `/api/ask-tino`, con hasta tres conversaciones simultáneas y turnos secuenciales dentro de cada conversación. No se enviaron datos de clientes ni se enviaron correos o reservas.

Regresión ampliada: 50 turnos, EN/ES/IT/PT. Script reproducible: `node scripts/check-ask-tino-conversations.mjs`; la opción `--live` usa el servicio publicado. Las pruebas locales simulan únicamente la respuesta genérica del proveedor; se distinguen de las pruebas reales.

## Fallos observados y correcciones

| Caso | Antes | Corrección |
| --- | --- | --- |
| Vender una casa en Venice | Preguntaba presupuesto de compra | Objetivo de venta y contacto profesional separados |
| Cambiar a Port Charlotte / North Port | Mantenía Venice / Sarasota | Localidades reconocidas ampliadas |
| Cambiar a 600 mila dollari | Decía aceptar el cambio pero conservaba $550.000 | Cantidades con mil/mila/thousand y millón reconocidas |
| Quitar límite de presupuesto | Conservaba $450,000 | Retirada persistente sin recuperarlo del historial |
| Calcular anticipo de otra propiedad | Sustituía el presupuesto guardado por el precio del ejemplo | Cálculos separados de preferencias |
| Calcular cuota de préstamo | Guardaba el capital como presupuesto de compra | Importe del préstamo no cambia presupuesto |
| Vivienda con privacidad | Contestaba sobre datos personales | Privacidad física diferenciada de privacidad del chat |
| Memoria para mañana | Afirmaba “No guardaré su conversación” | Explica memoria de página sin prometer conservación del proveedor |
| Respuestas cortas de ciudad/presupuesto | Dependían del modelo y volvían a preguntar detalles | Continuación determinista y una pregunta faltante |
| Comparar condominios sin buscar inventario | Contestaba solo que no tiene MLS | Respeta negación y responde consulta general |
| Acceso para silla de ruedas | No conservaba esa preferencia | Criterio objetivo de accesibilidad conservado |
| Casa blanca | Podía confundir color de pintura con criterio racial | Distingue color de vivienda de selección de grupos humanos |
| Consulta de cálculo en italiano | Podía activar índice de calculadoras | Cálculo determinista tiene prioridad |
| Portugués con “Quero vender” | Podía clasificarse como español | Marcadores portugueses tienen prioridad |

## Validación

- 50/50 turnos locales aprobados.
- Auditoría estructural completa del sitio aprobada.
- Pruebas existentes de criterios, idiomas, cálculos, privacidad, fuentes y política aprobadas.
- Repetición pública tras despliegue: **50/50 turnos aprobados** contra el endpoint real.
- Commit de implementación: `b8a035bb5c2800784b6d84636b977439572ddb4f`; Cloudflare Pages, pruebas de reglas y auditoría estructural: éxito.
- Control adicional en navegador real: 4 mensajes consecutivos — búsqueda inicial en Venice con $500,000, cambio a Port Charlotte, cálculo de 20% sobre $400,000 y resumen. El resumen conserva Port Charlotte, $500,000, tres habitaciones y sin piscina.
- Los casos adicionales de color de vivienda, cálculo italiano y prioridad de idioma portugués se detectaron/reprodujeron en revisión local y se incluyeron en la repetición pública; no se atribuyen todos a los 35 turnos iniciales.
- Resultado completo sintético: [ask-tino-audit-2026-11-07-results.json](ask-tino-audit-2026-11-07-results.json).
- La suite de 50 turnos locales se ejecuta en GitHub Actions al modificar el chat. La prueba pública se lanza expresamente con `--live`; no crea correos, citas ni reservas.

## Límites

Una batería finita no acredita todas las preguntas posibles ni elimina todos los errores de un modelo. No se verificaron cambios internos del Worker externo ni entrega del correo. Las preguntas legales se evalúan por honestidad de capacidades y derivación, no como certificación de asesoría legal.
