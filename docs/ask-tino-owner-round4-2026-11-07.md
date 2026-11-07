# Ask Tino — cuarta ronda de diez preguntas

Fecha: 7 de noviembre de 2026. Solo datos sintéticos, sin envío de consultas a Sabatino ni documentos personales.

## Resultado publicado

Implementación: `cac2d31b46da876273453c06c8a5be3b23e42e0e`. Cloudflare Pages, rules y structural-audit: success.

Las diez consultas exactas se realizaron en secuencia al API público antes y después del cambio. Después: 10/10 comprobaciones y lectura completa de las diez respuestas. Las primeras cuatro se repitieron mediante el chat del navegador en https://floridacostiera.com/contact y conservaron correctamente el estado entre envíos. Esto cubre estos casos, no certifica todas las posibles preguntas.

| Consulta | Fallo o limitación anterior | Resultado revisado |
| --- | --- | --- |
| 1. Venice o Nokomis, $600,000, 3 habitaciones, 2 baños, oficina | Perdía baños y oficina | Conserva ambos campos |
| 2. Descartar Venice, solo Nokomis | Conservaba las dos ciudades | Solo Nokomis, mantiene presupuesto |
| 3. Dos baños indispensables; oficina en habitación adicional | No guardaba prioridad ni alternativa | Baños obligatorios, oficina flexible en distribución; mantiene 3 habitaciones |
| 4. Indispensables, flexibles y datos faltantes | Contradecía los baños indispensables y volvía a preguntarlos | Resume datos confirmados, no declara opcional la oficina, aclara si ocupa una de las habitaciones |
| 5. Remodelación y permisos cerrados | Solo directorio general | Jurisdicción, alcance, inspección final y estado de cierre |
| 6. Techo antiguo y seguro | Orientación general, sin condiciones de aceptación escritas | Estado/vida útil, cotización y condiciones escritas, inspecciones según asegurador |
| 7. Paneles solares | Pedía documentos sin explicar qué revisar | Propiedad/préstamo/lease/PPA, saldo, transferencia, gravámenes y garantías |
| 8. Terreno para construir | Seguía tipo casa y retomaba paneles solares | Tipo terreno, viabilidad, acceso, servicios y limitaciones; responde al tema actual |
| 9. Descuento por renunciar a inspección | Arrastraba pregunta previa sobre terreno | Defectos ocultos, presupuestos y efectos contractuales sin inventar derechos |
| 10. Propiedad antes alquilada ahora vacía | Volvía a Venice/Nokomis y omitía posesión/depósitos | Documentos de terminación/entrega, derechos pendientes, depósitos, recorrido final |

## Reglas guardadas

- La exclusión explícita de una ciudad elimina esa opción. Si queda una, `city` sustituye `cities`.
- Nuevos campos: `bathrooms` (medios baños admitidos), `bathroomsRequired` y `office` (`space` o `extra-room`). Se validan tanto en cliente como en servidor.
- La frase sobre oficina como habitación adicional no reemplaza el número de habitaciones ni añade una automáticamente. La distribución queda pendiente de aclaración.
- Solo se declara indispensable el requisito marcado así; no inventar flexibilidad para los demás.
- Priorizar terreno sobre casa cuando la intención es comprar terreno para construir una casa.
- Guías temáticas previas a la respuesta genérica en ES/EN/IT/PT. No prometen verificación de una parcela, seguro, permisos o posesión; indican comprobaciones con responsables.
- Cliente, core, cargadores, HTML y generador de formularios comparten versión `20261107-round4` para evitar que un cliente anterior descarte nuevos campos.

## Validación

`node scripts/check-ask-tino-owner-round4.mjs` y `--live`: 10/10 cada uno. También exclusión sin ciudad alternativa, oficina sin cambiar habitaciones, tipo terreno, límites de medios baños y variantes EN/IT/PT.

Pasaron las tres rondas previas de diez, 60 turnos generales, 44 verificaciones del núcleo, política, investigación, consolidación, privacidad y auditoría estructural completa. CI incorpora esta cuarta ronda.

Las respuestas completas antes/después y criterios están en [el JSON asociado](ask-tino-owner-round4-2026-11-07-results.json).

## Fuentes oficiales consultadas para las guías

- [Sarasota County: búsqueda de registros de permisos](https://www.scgov.net/government/planning-and-development-services/frequently-asked-questions-faqs).
- [Charlotte County: Planning & Zoning](https://www.charlottecountyfl.gov/departments/community-development/planning-zoning/index.stml).
- [Florida DFS: inspecciones y seguro de vivienda](https://myfloridacfo.com/division/consumers/understanding-insurance/homeownersinsuranceoverview).
- [DOE: comprar casa con paneles solares](https://www.energy.gov/cmei/systems/consumers-guide-buying-house-solar-panels).
- [FTC: contratos solares, leasing y PPA](https://consumer.ftc.gov/articles/solar-power-your-home).
- [CFPB: inspección independiente](https://www.consumerfinance.gov/owning-a-home/close/schedule-a-home-inspection/).

No se incorporan edades legales universales, plazos contractuales, costos inventados ni promesas de aprobación. El código del proveedor externo del modelo sigue fuera de este repositorio; no se afirma haber eliminado sus instrucciones internas ni confirmado su retención de datos.
