# Ask Tino — las diez preguntas de Tino

Fecha: 7 de noviembre de 2026. Preguntas sintéticas, en el orden indicado y dentro de una sola conversación. El asistente ejecuta las pruebas; Tino no tiene que repetirlas manualmente.

## Hallazgos públicos antes de corregir

| Pregunta | Resultado observado | Cambio |
| --- | --- | --- |
| 1 · Vender con hipoteca | Orientación inicial útil tras la primera corrección | Se conserva |
| 2 · Fondos insuficientes | Repetía la respuesta 1 | Diferencia pendiente, fondos propios, venta corta con aprobación y deuda restante no perdonada automáticamente |
| 3 · Buscar vivienda | Guardaba ciudad, presupuesto, habitaciones y piscina | Se conserva |
| 4 · Cambiar localidad | Conservaba los demás criterios | Se conserva |
| 5 · Anticipo | $80,000; presupuesto original intacto | Se conserva |
| 6 · Resumen | Conservaba Port Charlotte y $500,000 | Se conserva |
| 7 · Invertir $350,000 | Mantenía $500,000 y no explicaba qué comparar | Actualización a $350,000 y comparación de gastos, vacancia y flujo neto |
| 8 · Alquiler corto en condo | Enlaces de permisos sin responder cómo verificar | Documentos vigentes, enmiendas, confirmación escrita y revisión local independiente |
| 9 · Listados disponibles | Admitía que no tiene MLS; arrastraba presupuesto erróneo de 7 | Mantiene honestidad de inventario y presupuesto corregido |
| 10 · Identidad y bancos | Afirmaba que no podía guardar documentos sin verificar al proveedor | No enviar documentos, canal adecuado y límites reales de conservación/confidencialidad |

## Repetición

Script: `node scripts/check-ask-tino-owner-questions.mjs`.

Pruebas locales: 10/10; suite ampliada: 60/60; auditoría estructural completa: aprobada. Estas comprobaciones no son una calificación universal de la calidad de cualquier respuesta.

## Resultado publicado

Las mismas diez preguntas se repitieron en una sola conversación después del despliegue: **10/10 comprobaciones aprobadas**, y las diez respuestas completas fueron revisadas.

Commit de implementación: `b329ee38f0b957725c2405d7dbac23336d90b257`. Cloudflare Pages, auditoría estructural y suite de reglas: éxito.

Comprobaciones adicionales: la 2 difiere de la 1 y explica aprobación/deuda restante; la 7 guarda $350,000 y compara gastos/vacancia/flujo; la 8 da pasos documentales; la 9 conserva $350,000 y no inventa inventario; la 10 no promete ausencia de conservación por terceros.

[Resultados completos antes y después](ask-tino-owner-10-2026-11-07-results.json).

Esto acredita estos casos concretos, no todas las formulaciones posibles. Las pruebas y correcciones quedan a cargo del asistente; el propietario no tiene que actuar como probador manual.
