# Ask Tino — grupo 2, preguntas 11–20: preparación del comprador

Fecha: 8 de noviembre de 2026 (America/New_York).

## Resultado comprobado

Se hicieron las diez preguntas exactas al API público en una conversación secuencial, antes y después de los cambios, conservando criterios e historial reciente. Antes: 0/10 comprobaciones de utilidad programadas; las respuestas tenían omisiones y preguntas de seguimiento innecesarias, lo que no significa que toda frase fuera falsa. La última preguntaba nacionalidad al pedir una lista general para compra en efectivo. Después: **10/10** y lectura completa de cada respuesta.

Implementación: `662ad926290c357079f3bf9ee33c78fdb54adae2`. Cloudflare Pages, rules y structural-audit: success. Diez locales, variantes, prioridad de protección de documentos sensibles y regresiones previas aprobadas. No hubo prueba visual del widget en esta ronda; el comportamiento se comprobó mediante el servicio público. Cobertura finita, no certificación universal del asistente ni aprobación de un préstamo.

[Preguntas, respuestas antes/después y criterios](ask-tino-bank-group2-2026-11-08-results.json).

## Cambios y límites

Nueva guía española functions/api/ask-tino-buyer-preparation.js, antes de guías genéricas y después de los controles de seguridad existentes. No se amplió el esquema de criterios ni se cambiaron diseño, cliente o datos privados. No se afirma traducción nueva de esta ronda a los otros idiomas.

- Gastos: separar down payment, pagos previos, cash to close, costos mensuales y reserva; no usar un porcentaje universal.
- Prequalification/preapproval: términos variables según prestamista; explicar condiciones sin asegurar desembolso ni tratar DU como garantía.
- Empleo y automóvil: consultar al prestamista antes de cambios, no ocultar información ni garantizar resultado.
- Condominio: revisión del proyecto separada de la del comprador. Guías de Fannie Mae no son ley universal de todo préstamo.
- Regalo y fondos del extranjero: documentar genuina procedencia y transferencia; no disfrazar deuda como regalo ni eludir controles. No pedir documentos bancarios en el chat.
- Copropiedad y trust: revisar escritura, acuerdos, facultades y capacidad de firma con título y abogado, sin asumir igualdad o autoridad por el nombre.
- Efectivo: lista general útil y canal seguro, sin pedir nacionalidad por defecto, autenticar fondos ni prometer cierre.

## Fuentes primarias consultadas

- CFPB, costos: https://www.consumerfinance.gov/ask-cfpb/what-costs-come-with-taking-out-a-mortgage-en-153/
- CFPB, cartas de préstamo: https://www.consumerfinance.gov/ask-cfpb/whats-the-difference-between-a-prequalification-letter-and-a-preapproval-letter-en-127/
- CFPB, nuevo crédito: https://www.consumerfinance.gov/ask-cfpb/what-exactly-happens-when-a-mortgage-lender-checks-my-credit-en-2005/
- Fannie Mae, verificación de empleo: https://guide-selling.fanniemae.com/sel/b3-3.1-04/verbal-verification-employment
- Fannie Mae, proyecto: https://selling-guide.fanniemae.com/sel/b4-2.1-01/general-information-project-standards
- Fannie Mae, regalos: https://guide-selling.fanniemae.com/sel/b3-4.3-04/personal-gifts
- Fannie Mae, activos extranjeros: https://selling-guide.fanniemae.com/sel/b3-4.2-05/foreign-assets
- Florida Statutes 2026, certificación de trust: https://www.flsenate.gov/Laws/Statutes/2026/736.1017
- Florida Bar, compra, escritura y cierre: https://www.floridabar.org/public/consumer/pamphlet006/

Los enlaces del chat son referencias editoriales, no afirmación de consulta en vivo ni dictamen individual. Reglas del programa, contrato y circunstancias deben revisarse con profesionales responsables. No se enviaron correos ni documentos reales. OceanFL y My Closing Timeline intactos.

## Continuidad

Grupo 2 completado. Siguiente: **grupo 3, preguntas 21–30 — Oferta y contrato**. Leer memoria canónica vigente y el banco antes de continuar; no pedir a Tino que vuelva a copiar preguntas.

## Diez respuestas públicas posteriores

### 11. ¿Qué gastos debo presupuestar además del down payment?

Además del down payment, presupuesta gastos de cierre: prestamista si hay préstamo, tasación, inspecciones, título, registro, honorarios pactados y otros cargos aplicables. Revisa impuestos, seguro, prepagos, depósitos escrow, cuotas de asociación o distrito, mudanza y una reserva para mantenimiento. Separa pagos previos de importes al cierre para no duplicarlos; descuenta depósitos ya acreditados. Pide estimaciones desglosadas al prestamista y compañía de cierre, sin usar un porcentaje universal ni confundir cash to close con costo mensual.
Referencia general (no consulta en vivo ni aprobación individual): https://www.consumerfinance.gov/ask-cfpb/what-costs-come-with-taking-out-a-mortgage-en-153/
https://floridacostiera.com/contact#tell-us-your-plans

### 12. ¿Qué diferencia hay entre prequalification, preapproval y aprobación final?

Los términos prequalification y preapproval no tienen un proceso idéntico en todos los prestamistas: pregunta qué datos verificaron, vigencia y condiciones pendientes. La preaprobación no garantiza el préstamo. La aprobación final requiere resolver las condiciones del prestamista sobre ingresos, activos, crédito, propiedad y proyecto cuando aplique. Tampoco una aprobación o un resultado DU equivale por sí solo a fondos desembolsados. Pide confirmación escrita del estado y lo que falta antes de comprometer plazos.
Referencia general (no consulta en vivo ni aprobación individual): https://www.consumerfinance.gov/ask-cfpb/whats-the-difference-between-a-prequalification-letter-and-a-preapproval-letter-en-127/
https://floridacostiera.com/contact#tell-us-your-plans

### 13. ¿Qué pasa si cambio de empleo antes del cierre?

Avisa al prestamista antes de cambiar de empleo o tan pronto conozcas un cambio; no ocultes información. El prestamista debe revisar estabilidad, ingresos, forma de remuneración, fecha de inicio y documentos actualizados; pasar a comisión o trabajo independiente puede cambiar el análisis. No supongas rechazo automático ni aprobación asegurada. Pide por escrito si afecta condiciones y fecha de cierre; coordina con Sabatino y asesoramiento jurídico cualquier plazo o extensión contractual. No envíes nóminas o contratos laborales aquí.
Referencia general (no consulta en vivo ni aprobación individual): https://guide-selling.fanniemae.com/sel/b3-3.1-04/verbal-verification-employment
https://floridacostiera.com/contact#tell-us-your-plans

### 14. ¿Cómo debo consultar el efecto de comprar un automóvil durante la hipoteca?

Consulta al prestamista antes de financiar el automóvil, abrir crédito o asumir una deuda nueva. La cuota, consulta crediticia y reducción de fondos pueden afectar relación deuda/ingresos, crédito, reservas y capacidad de cerrar, incluso con preaprobación. Pide evaluar el efecto usando las cifras reales por su canal seguro; no asumas que una compra en efectivo evita todo impacto. Comunica cambios con honestidad y revisa condiciones y plazos antes de obligarte; no puedo aprobar tu préstamo.
Referencia general (no consulta en vivo ni aprobación individual): https://www.consumerfinance.gov/ask-cfpb/what-exactly-happens-when-a-mortgage-lender-checks-my-credit-en-2005/
https://floridacostiera.com/contact#tell-us-your-plans

### 15. ¿Qué significa que el préstamo esté condicionado a la aprobación del condominio?

La revisión del proyecto de condominio es distinta de la evaluación del comprador: tu preaprobación no basta para aprobar el edificio. Pide al prestamista confirmar revisión, condiciones pendientes y documentos que exige sobre reservas, presupuesto, seguro, reparaciones, derramas, litigios y otros criterios del programa. Coordina entrega con la asociación y comprueba plazos contractuales. Reglas de Fannie Mae u otro programa no son una ley universal para todos los préstamos; no garantizo elegibilidad ni que una revisión favorable de otro banco se aplique al tuyo.
Referencia general (no consulta en vivo ni aprobación individual): https://selling-guide.fanniemae.com/sel/b4-2.1-01/general-information-project-standards
https://floridacostiera.com/contact#tell-us-your-plans

### 16. ¿Qué debo saber antes de usar dinero regalado para comprar?

Confirma con el prestamista si el programa admite el regalo, de quién y para qué gastos. Debe ser genuino: no es un préstamo escondido ni debe esperarse devolución. Pide requisitos de gift letter y documentación del origen, disponibilidad y transferencia; la carta sola puede no bastar. No muevas dinero suponiendo aprobación ni apliques reglas de un programa a todos. Revisa cuestiones fiscales con un profesional. No envíes datos bancarios o documentos del donante al chat; usa el canal seguro indicado por el prestamista.
Referencia general (no consulta en vivo ni aprobación individual): https://guide-selling.fanniemae.com/sel/b3-4.3-04/personal-gifts
https://floridacostiera.com/contact#tell-us-your-plans

### 17. ¿Qué verifico si parte de mis fondos viene del extranjero?

Consulta antes de transferir con banco, prestamista y compañía de cierre cómo documentar origen y titularidad de fondos, moneda, conversión, traducción de documentos, disponibilidad y plazos. Revisa comisiones y requisitos del programa; reglas de Fannie Mae no son universales para compras en efectivo u otros préstamos. No dividas transferencias para eludir controles ni ocultes la procedencia. Confirma instrucciones por un canal independiente ya verificado. No envíes estados de cuenta ni identificaciones al chat; acuerda un canal seguro.
Referencia general (no consulta en vivo ni aprobación individual): https://selling-guide.fanniemae.com/sel/b3-4.2-05/foreign-assets
https://floridacostiera.com/contact#tell-us-your-plans

### 18. ¿Qué debo revisar antes de comprar con otra persona?

Antes de comprar juntos, acuerden aportaciones, porcentajes, pagos, mantenimiento y uso, y qué ocurrirá ante separación, fallecimiento, incumplimiento o salida de un propietario. Un abogado debe revisar el tipo de titularidad y la escritura: que aparezcan dos nombres no define por sí solo derechos de supervivencia o reparto. Distingue propiedad de responsabilidad por el préstamo; quitar un nombre de la escritura no libera automáticamente la deuda. Coordina título, financiación, impuestos y acuerdos por escrito sin asumir iguales derechos en todos los casos.
Referencia general (no consulta en vivo ni aprobación individual): https://www.floridabar.org/public/consumer/pamphlet006/
https://floridacostiera.com/contact#tell-us-your-plans

### 19. ¿Cómo compruebo quién debe firmar cuando compra un trust?

Pide a la compañía de título y al abogado revisar identidad y vigencia del trust, trustee actual, sucesión si existe, facultades para adquirir, financiar y firmar, y cualquier consentimiento necesario. Una certificación del trust puede servir para ciertos fines, pero no sustituye automáticamente todo documento que legalmente corresponda. Confirma con título y prestamista quién firma cada instrumento y en qué capacidad; no asumas que cualquier beneficiario puede hacerlo. No envíes el instrumento completo, identificaciones ni datos privados al chat.
Referencia general (no consulta en vivo ni aprobación individual): https://www.flsenate.gov/Laws/Statutes/2026/736.1017
https://floridacostiera.com/contact#tell-us-your-plans

### 20. ¿Qué documentos debería preparar para una compra en efectivo sin enviarlos al chat?

Para una compra en efectivo, prepara por el canal seguro que acuerdes con Sabatino y la compañía de cierre: datos de identidad y titularidad del comprador, evidencia reciente de fondos líquidos disponibles, información sobre su origen cuando se solicite y autoridad para firmar si compra una entidad o trust. Pide la lista exacta y qué datos pueden ocultarse sin impedir verificación. No envíes documentos ni cuentas al chat. Una captura o prueba de fondos no garantiza autenticidad ni cierre; confirma transferencias por un contacto independiente verificado y respeta controles aplicables.
Referencia general (no consulta en vivo ni aprobación individual): https://www.floridabar.org/public/consumer/pamphlet006/
https://floridacostiera.com/contact#tell-us-your-plans
