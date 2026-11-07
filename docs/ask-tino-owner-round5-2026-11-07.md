# Ask Tino — quinta ronda de diez preguntas

Fecha: 7 de noviembre de 2026. El usuario pidió ejecutar las diez preguntas propuestas. Pruebas sintéticas, sin datos de clientes reales ni envío de mensajes a Sabatino.

## Publicación y resultado

Commit de implementación: `0c3b379807057ba5ce6b466e4c3d04725ed03081`. Cloudflare Pages, rules y structural-audit finalizaron en success.

Se hicieron las diez consultas exactas, en secuencia, al API público antes y después del cambio. Después: 10/10 comprobaciones y lectura completa de cada respuesta. En el navegador se repitieron las primeras cuatro dentro de la misma conversación: se conservaron Rotonda West, objetivo vender, inquilino, ocho meses restantes y entrega prevista con inquilino. La cuarta contestó tanto la preparación para Sabatino como la privacidad del inquilino.

| Pregunta | Limitación comprobada antes | Cambio verificado |
| --- | --- | --- |
| 1. Vender casa alquilada en Rotonda West | Solo pedía duración del contrato; no conservaba ocupación | Pasos sobre contrato, visitas, obligaciones, depósitos y posesión; conserva inquilino |
| 2. Alquiler termina en ocho meses | No guardaba plazo y preguntaba otro dato genérico | Guarda ocho meses; explica venta antes del vencimiento sin asumir terminación |
| 3. Preferencia por vender con inquilino | Resumen omitía inquilino y plazo | Indica entrega con inquilino y ausencia de acuerdo de entrega vacía |
| 4. Preparación y datos personales | Solo aviso genérico de privacidad | Resumen inmobiliario/alquiler y ejemplos concretos de datos que no deben compartirse |
| 5. Oferta en efectivo menor frente a financiada mayor | Lista genérica corta | Neto, fondos, financiación, depósito, contingencias, ocupación y calendario |
| 6. Depósito grande y cancelación | Devolvía páginas About/Boca Grande sin relación | Distingue cancelación válida e incumplimiento; escrow no se adjudica automáticamente |
| 7. Tasación baja | Bloqueo genérico sobre valoración | Revisión del informe, reconsideración, precio/aporte y contingencias sin garantías |
| 8. Comprar antes de vender | Perdía objetivo de venta | Conserva objetivo combinado; riesgo de sostener dos viviendas y alternativas |
| 9. FIRPTA | Directorio sin explicar retención ni impuesto final | Condición fiscal distinta de nacionalidad; regla general, base, excepciones y revisión profesional |
| 10. Permanecer después del cierre | Solo recomendaba acuerdo sin condiciones | Fecha/hora, costo, escrow, seguros, préstamo, mantenimiento y retraso |

## Reglas y arquitectura

- Nuevos campos validados en cliente y API: occupancy, salePossession, leaseRemainingMonths; objetivo buy-sell para comprar antes de vender. No guardar identidad ni información personal del inquilino.
- Una preferencia de entrega no acredita un acuerdo ejecutado; el resumen no promete posesión vacía. La declaración explícita de que ya no hay inquilino cambia ocupación actual y elimina el plazo anterior.
- El módulo ask-tino-seller-guidance.js responde preguntas generales antes de las derivaciones genéricas de privacidad/valoración. Los filtros de datos sensibles, documentos de identidad y características protegidas mantienen prioridad.
- Los temas no contienen los importes ni nombres de ejemplo de estas preguntas. Las guías están disponibles en ES/EN/IT/PT. La respuesta sobre el plazo añade los meses desde los criterios, sin hardcodear ocho.
- Preguntas sobre FIRPTA explican retención sin determinar residencia fiscal, exención o impuesto individual. El enlace IRS es referencia; no se etiqueta como consulta realizada en ese turno. La petición genérica de fuentes o de cambiar la ley sigue la ruta existente.
- Una tasación baja no se interpreta como petición de valoración verificada. Se explican opciones sin garantizar cancelación ni obligar a cambiar el precio.
- Cliente/core/cargadores/HTML/generador usan 20261107-round5 para que los nuevos campos sobrevivan entre envíos.

## Validación

- node scripts/check-ask-tino-owner-round5.mjs: 10/10 local; --live: 10/10 publicado.
- Cuatro rondas previas: diez cada una; 60 turnos generales, núcleo, política, investigación, consolidación, privacidad y auditoría estructural aprobados.
- Variantes EN/IT/PT, límites de meses, cambio explícito a vivienda vacía y prioridad de protección de datos/criterios protegidos.
- Primeras cuatro preguntas comprobadas mediante el chat real del navegador tras desplegar.

[Respuestas completas y criterios antes/después](ask-tino-owner-round5-2026-11-07-results.json). Esta cobertura es finita: no certifica toda pregunta posible ni un contrato, estatus fiscal o derecho particular.

## Fuentes consultadas

- [Florida Bar: derechos y deberes de inquilinos y propietarios](https://www.floridabar.org/public/consumer/tip014/): posesión y visitas; no se copiaron plazos legales del folleto.
- [Florida Bar: compra y revisión del contrato](https://www.floridabar.org/public/consumer/pamphlet006/): depósitos, contingencias, posesión y distribución de riesgos.
- [CFPB: tasación inferior al precio](https://www.consumerfinance.gov/ask-cfpb/my-appraisal-is-less-than-the-sale-price-what-does-that-mean-for-me-en-2007/).
- [OCC: desacuerdo con tasación](https://www.helpwithmybank.gov/help-topics/mortgages-home-equity/appraisals/appraisal-disagree-actions.html).
- [IRS: FIRPTA withholding](https://www.irs.gov/individuals/international-taxpayers/firpta-withholding).
- [IRS: instrucciones Form 8288, enero 2026](https://www.irs.gov/instructions/i8288), [excepciones](https://www.irs.gov/individuals/international-taxpayers/exceptions-from-firpta-withholding) y [Publication 515](https://www.irs.gov/publications/p515). Se indica regla general sin asignar tasa particular ni afirmar que la retención sea el impuesto final.
- [Florida Realtors: acuerdo de ocupación posterior al cierre](https://www.floridarealtors.org/news-media/news-articles/2023/06/most-misunderstood-form-library).

No se modificaron OceanFL ni My Closing Timeline. El proveedor externo del modelo continúa fuera de este repositorio; no se afirma control de sus instrucciones internas ni de su retención de datos.
