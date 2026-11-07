# Florida Costiera — Memoria y continuidad del sitio

Última actualización: 2026-11-07 (America/New_York).
Documento de continuidad entre conversaciones. Registrar decisiones y evidencia; no confundir código, pruebas y publicación.
Solicitud del propietario: conservar aquí toda la información importante del sitio y actualizarla al completar cambios.

## 1. Proyecto y alcance

- Propietario: Sabatino Campilii (Tino), Realtor® de LoKation® Real Estate.
- Sitio: https://floridacostiera.com/
- Repositorio: https://github.com/scampilii-prog/florida-real-estate
- Rama observada: main. Hosting acordado: Cloudflare Pages.
- Este proyecto es Florida Costiera. No mezclarlo con My Closing Timeline.
- OceanFL.com se consulta como referencia; no modificarlo en este trabajo.
- Comunicación: español breve, claro y elegante. Mostrar enlaces públicos al informar resultados; no pegar HTML/CSS al usuario.
- Continuar ajustes rutinarios ya autorizados sin pedir confirmación repetida.

## 2. Decisión principal: reforma de Ask Tino

**El usuario pidió reformar Ask Tino con nuevas órdenes y eliminar las anteriores que se sustituyan. No acumular nuevas instrucciones encima de reglas antiguas contradictorias.** Reafirmado expresamente por Tino el 7 de noviembre de 2026.

Objetivo: un conjunto coherente y mantenible de reglas, con responsabilidades claras. Revisar navegador, API y Worker externo; quitar rutas antiguas, listeners duplicados, prompts obsoletos y respuestas que contradigan la nueva política. La retirada completa de reglas en el Worker externo NO está verificada en esta sesión.

Referentes confirmados en docs/ask-tino-behavior.md:
- Zillow AI mode: información sustentada en datos reales, participación profesional y controles de vivienda.
- Ask Redfin: respuestas sobre propiedades y derivación a un agente licenciado.
- Realtor.com engineering: criterios estructurados y procesamiento modular predecible.

Son adaptaciones de comportamientos descritos públicamente; no son sus órdenes internas privadas ni integraciones con esos servicios. Las URL de referencia se conservan en el documento técnico.

### Comportamiento aprobado

- Un solo asistente flotante; evitar duplicarlo.
- Usar criterios expresados por el visitante y actualizar solamente los campos que cambie.
- Preguntar un dato faltante por vez; resumir únicamente datos realmente recogidos.
- Responder en el idioma solicitado. Idiomas del sitio acordados: EN/ES/IT/PT.
- No inventar propiedades disponibles, precios, direcciones, tasas vigentes, fuentes consultadas o datos biográficos.
- No afirmar que se envió un mensaje, se reservó una visita o se verificó una propiedad cuando no ocurrió.
- No hay integración MLS ni reservas: derivar a Sabatino.
- Presupuesto no equivale a financiación aprobada. No añadir consejos financieros no solicitados.
- Evitar discriminación o recomendaciones basadas en características protegidas; usar criterios objetivos de la propiedad.
- No garantizar precios, plazos, aprobaciones, rentabilidad ni protección legal absoluta.
- Diferenciar explicaciones generales, páginas oficiales recuperadas y conclusiones profesionales.
- Las recomendaciones comerciales deben ser pertinentes, sin inventar disponibilidad ni urgencia.

### Consulta de fuentes: distinción indispensable

El modelo genérico no tiene herramientas propias de búsqueda. La aplicación tiene recuperación acotada de un directorio oficial y un índice interno del sitio; esto NO equivale a buscar todo Internet.
Según documentación del repositorio:
- Hasta tres solicitudes oficiales con tiempo limitado; sin URL arbitrarias del usuario ni seguimiento de redirecciones.
- No enviar las preguntas del visitante a esas fuentes oficiales.
- Mostrar estado real de consulta; obtener una página no demuestra que su normativa aplique al caso.
- Pedir jurisdicción concreta cuando sea necesaria, especialmente Englewood, Gasparilla Island y Wellen Park.
- Los fragmentos de navegación de páginas dejaron de mostrarse como si fueran una respuesta.
- El índice interno recomienda hasta tres páginas y contacto; no afirmar búsqueda completa de las 1.010 Q&A ni inventario MLS.
- Memoria del chat limitada a la página abierta: recargar o navegar reinicia la conversación; cerrar/reabrir el widget en la misma página conserva criterios.

## 3. Mapa técnico de Ask Tino

Fuente leída en GitHub el 2026-11-07: [ask-tino-behavior.md](ask-tino-behavior.md).

| Archivo | Responsabilidad documentada |
| --- | --- |
| assets/ask-tino-core.js | Criterios, idioma, cálculos y límites de capacidad |
| assets/ask-tino-policy.js | Preguntas, derivación profesional y controles de respuestas |
| assets/ask-tino-client.js | Un listener de envío, estado en página y representación segura |
| functions/api/ask-tino.js | Validación JSON y conexión acotada con Worker externo |
| assets/language-dropdown.js | Carga del cliente; no debe contener reglas o estado del chat |
| scripts/check-ask-tino-clean.mjs | Pruebas de lógica, API, envío, idiomas, límites y fallos |
| scripts/build-ask-tino-index.py | Generación del índice desde sitemap |

Worker mencionado en continuidad anterior: https://ask-tino-ai.scampilii.workers.dev/ (dependencia externa; configuración actual pendiente de inspección).

La documentación afirma que se retiraron funciones antiguas de envío AI embebidas en HTML. Confirmar que no quedan otras reglas antiguas activas, especialmente fuera del repositorio.
El documento técnico contiene una regla inicial sobre ausencia de búsqueda y una sección posterior de consulta oficial acotada: leer ambas juntas y consolidarlas cuando se actualice la política, para evitar interpretaciones contradictorias.

### Evidencia observada en GitHub

- c593c2cec6f128c83996369f347c257393d081bd — criterios estructurados, capacidades verificadas, derivación profesional y controles de respuestas.
- 0206f51c665fe1f54b4b914f09691cad3172f5c1 — jurisdicción de permisos de Englewood y retirada de fragmentos ruidosos.
- 5153ff14644d3fe529eb6e24b544415fadaceb0d — consulta oficial acotada e índice interno.
- 5839541d62a273b43eebc101a344712b398c4a89 — reconstrucción del motor y un solo envío.

Estos commits se observaron en GitHub; no prueban por sí solos despliegue o funcionamiento público.
El chat anterior informó 16 pruebas nuevas aprobadas y publicación en curso. No se volvieron a ejecutar ni se comprobó publicación en esta sesión.

## 4. Contacto y formulario

- Sabatino Campilii, Realtor® — LoKation® Real Estate.
- Contacto acordado para Ask Tino: 941-270-4877.
- Correo: sabatino@floridacostiera.com.
- Formulario principal: https://floridacostiera.com/contact#tell-us-your-plans
- Ask Tino debe ofrecer una derivación clara a ese contacto.

Último estado recuperado del chat anterior: el formulario preparaba un mensaje en la aplicación de correo; no enviaba automáticamente. Se informó que contact.html tenía el ancla correcta y el correo configurado. No se verificaron aquí esos archivos ni la recepción real.

Pendiente: identificar alojamiento/configuración del buzón, comprobar envío y recepción, y hacer que el texto del botón describa la acción real. Abrir Mail no equivale a enviar ni recibir.

## 5. Privacidad: prioridad pendiente

Página: https://floridacostiera.com/privacy

Tino pidió explicar y atender la privacidad de las personas que conversen con Ask Tino o completen el formulario. La política y los avisos deben corresponder al comportamiento comprobado del sistema.

- Inventariar los datos que realmente se recogen y transmiten.
- Identificar destinatarios y proveedores, incluido Worker/servicio AI, correo y cualquier analítica activa.
- Documentar finalidad, conservación, acceso y vía para solicitar eliminación según lo realmente implementado.
- Incluir avisos claros en el chat y donde se introducen datos personales, enlazados a Privacy.
- Comprobar cookies y servicios externos antes de describirlos.
- Verificar en código el almacenamiento y los datos del payload; la memoria local de página no demuestra ausencia de registros del servidor.
- No presentar una política escrita como garantía de exención de responsabilidad.

Estado: solicitado; revisión e implementación completa NO acreditadas en esta sesión.

## 6. Diseño y navegación que conservar

- Manrope; azul marino y dorado; subtítulos azul grisáceo; fotos luminosas.
- Logo: Florida regular + Costiera en negrita dorada, idéntico entre páginas.
- Header, ancho y altura coherentes; logo a la izquierda, menú a la derecha.
- Evitar parpadeos, CSS contradictorio, fotos innecesarias/repetidas y duplicados de Back to Top.
- Revisar H1 visible, contraste, fotos de cabecera y adaptación móvil.
- OneHome abre en la misma pestaña.
- New Construction usa ShowingNew, usuario sabatinocampilii3; sustituye la referencia anterior a Realtor.com.
- Italo en Contact no debe presentarse como Realtor; conservar su vínculo profesional correspondiente.

Contenido histórico mencionado: Home, Buy, Sell, Contact, About, Questions (1.010 Q&A), Calculators, Closing Costs, Investment Center, Site Map, Guides (12), New Construction y Timeline. Los recuentos históricos de páginas no deben tratarse como inventario actual sin leer sitemap.

## 7. Otros pendientes heredados

- Verificar visualmente navegación, logo uniforme, cabeceras y Back to Top en publicación.
- Firma: conservar la original; FloridaCostiera.com y OceanFL.com separados; CONTACT ME al formulario; cuatro botones de altura coherente. Revisar estado antes de editar.
- Google Business: continuidad anterior informó publicación “Discover Florida Costiera” con Learn more al formulario; sustitución de imagen seguía pendiente de confirmación.
- Datos históricos de indexación y tráfico son instantáneas, no cifras vigentes: consultar fuentes actuales antes de informar.

## 8. Orden de continuación

1. Leer este documento y docs/ask-tino-behavior.md; revisar cambios más recientes.
2. Inventariar las órdenes efectivas de Ask Tino en cliente, API y Worker.
3. Consolidar las nuevas reglas y eliminar las anteriores sustituidas; comprobar ausencia de rutas duplicadas.
4. Probar conversaciones EN/ES/IT/PT, cambios de criterios, preguntas faltantes, fuentes oficiales, errores, límites y derivación a contacto.
5. Revisar datos personales y completar Privacy y avisos según la implementación real.
6. Verificar formulario/buzón y distinguir preparación de correo de envío real.
7. Comprobar despliegue público y registrar evidencia.

## 9. Cómo mantener esta memoria

Actualizar este documento al terminar cada cambio importante:
- Fecha y decisión del usuario.
- Archivos y commit.
- Pruebas realizadas y resultado.
- Estado del despliegue y URL comprobada.
- Pendientes concretos y siguiente paso.

No registrar contraseñas, tokens, documentos de identidad ni datos privados de visitantes.
No marcar una tarea como completada por una afirmación de un chat anterior: adjuntar evidencia técnica o funcional.
Instrucción útil para próximos chats: “Continúa Florida Costiera leyendo primero docs/FLORIDA-COSTIERA-MEMORIA.md en scampilii-prog/florida-real-estate y comprueba el estado actual antes de cambiarlo”.

## 10. Reforma ejecutada — 2026-11-07

- Se retiraron del core las reglas duplicadas de búsqueda, características protegidas y consulta web. Política de búsqueda/steering en functions/api/ask-tino-policy.js; alcance de fuentes en ask-tino-research.js.
- Nuevo functions/api/ask-tino-instructions.js: único constructor de instrucciones para llamadas genéricas al modelo, separado del navegador; datos del visitante en JSON, historial del asistente excluido.
- Se sustituyó la negación absoluta de consulta web por una explicación coherente del directorio oficial limitado.
- Respuesta de privacidad EN/ES/IT/PT con enlace a Privacy y Contact, sin prometer confidencialidad o conservación no verificadas.
- Documentación técnica reescrita como conjunto vigente, corrigiendo la ubicación de ask-tino-policy.js: está en functions/api/, no en assets/.
- Pruebas locales: 44 comprobaciones clean, 16 policy, suite research y nueva suite consolidated aprobadas. Flujo GitHub Actions específico añadido.
- Pendiente: instrucciones y registros del Worker externo, revisión completa de Privacy/formulario y recepción del correo. No afirmar limpieza del Worker sin acceso a su configuración.

### Evidencia de publicación de la reforma

- Commit de implementación: 6284aa1617902819572144b5698a48ff30d337d2.
- GitHub Actions Ask Tino rules: éxito, run 42378735700.
- Check Cloudflare Pages del mismo commit: completed / success, deployment 8b1b2709-9a31-4c0b-8f9b-2371d0d1dfec.
- Comprobación HTTP real en https://floridacostiera.com/api/ask-tino: la pregunta «¿Qué pasa con mis datos personales?» devolvió la nueva respuesta en español con enlaces a /privacy y /contact#tell-us-your-plans.
- Esta comprobación confirma esa ruta publicada, no una auditoría completa del Worker ni del contenido de Privacy.

## 11. Privacy y avisos de entrada — 2026-11-07

- Revisados Privacy, formulario compartido, cliente/API del chat y aviso general.
- Privacy detalla mensaje, criterios, idioma e historial reciente enviados al endpoint y eventual servicio AI, memoria de página y límites de conservación/entrenamiento no verificados.
- Aviso de chat visible antes del primer envío, EN/ES/IT/PT, enlace /privacy#ask-tino-privacy, sin duplicados.
- Formulario: enlace Privacy, aviso de datos sensibles, estado de correo preparado y no enviado, alternativa de contacto por correo; se retiró “consulta enviada” del cuerpo preparado.
- Aviso general actualizado para mencionar Ask Tino y servicio externo; reconocimiento renovado, no consentimiento publicitario.
- Pruebas locales aprobadas: compra/inversión/venta, mailto, idempotencia, aviso previo, cuatro idiomas y suites Ask Tino. Workflow ampliado.
- Pendientes: recepción real del correo, configuración interna del Worker/proveedor y sus registros/entrenamiento. No se encontró repositorio separado “ask” del propietario en la búsqueda realizada.
- Referencia editorial FTC: https://www.ftc.gov/business-guidance/privacy-security. Sin certificación jurídica.

### Publicación y verificación de Privacy/formulario

- Privacy y avisos: 385e804f2d420cac3e725d924e6ab87adf1a9a56.
- La revisión visual detectó toggleTino inexistente en Privacy; se restauró el controlador compartido de apertura/cierre: cb1937c939451d6d2028231ead692e6509d848d3.
- Se observó Cache-Control public, max-age=14400, must-revalidate en JS. Para evitar versiones antiguas se actualizaron referencias de scripts en 49 páginas: b9e42da1a2a35781aad7abf4cbaf1032dea8c9b5.
- El cargador de compatibilidad y language-dropdown ahora usan exactamente /assets/ask-tino-client.js?v=20261107-privacy3, evitando instancias de módulos con distintas URL.
- Los 40 formularios se sincronizaron con la plantilla y el generador se actualizó al nuevo caché: 4a4c42569ad7aa4003b2256b741f53c94e0a5bb2.
- Una prueba histórica exigía una clave de caché obsoleta. Se corrigió para verificar la presencia de una URL versionada manteniendo todas las comprobaciones de ShowingNew: 2848d35a2ffd9d72a79a7927d82b0dcbf7032807.
- Check estructural completo y Cloudflare Pages del último commit: success. Suite de reglas/privacidad del commit de sincronización: success.
- Verificación real en navegador: /privacy#ask-tino-privacy muestra el texto nuevo; el chat abre y responde «¿Qué pasa con mis datos personales?» en español con enlaces Privacy/Contact; aviso del chat cambia a español; /contact#tell-us-your-plans muestra enlace Privacy y explicación de correo preparado.
- No se envió correo real ni se acreditó recepción. Conservación, proveedor final e instrucciones internas del Worker siguen pendientes de acceso/verificación.

## 12. Minimización de datos y comprobación de correo — 2026-11-07

- Añadida detección limitada de SSN con formato, secretos etiquetados y números de tarjeta con patrón/Luhn válido. El navegador advierte antes de fetch, conserva el texto en el campo para corregirlo y no lo añade al historial. La API vuelve a comprobar antes de reenviar al servicio AI. No es detección exhaustiva de datos personales.
- Corregida excepción de API con history no array. Pruebas unitarias, cliente simulado, API y auditoría estructural completa pasan localmente.
- Claves privacy4 coherentes en cliente, core, cargadores y referencias de 49 páginas para evitar caché de cuatro horas.
- Historial PROJECT_HANDOFF.md del 12 de octubre: info@floridacostiera.com y sabatino@floridacostiera.com se configuraron para reenviar a scampilii@gmail.com; no es un buzón independiente ni acredita envío como dominio.
- Consulta DNS actual: MX route1/route2/route3.mx.cloudflare.net; SPF include:_spf.mx.cloudflare.net. Esto acredita infraestructura de Cloudflare Email Routing, no regla individual ni entrega.
- Gmail requiere reautenticación: no fue posible leer comprobaciones de recepción. No se envió correo de prueba.
- Solo se encontraron los repositorios florida-real-estate y my-closing-timeline en la búsqueda del propietario; el código del Worker sigue fuera del repositorio accesible. No se cambiaron instrucciones internas ni configuración del proveedor sin acceso.

### Evidencia de bloqueo preventivo

- Implementación: 03b52e7b1a551eee4c991c1123ecee7367050a36.
- Comprobación real en navegador sobre /contact#tell-us-your-plans: versión privacy4; mensaje sintético con etiqueta Password produjo advertencia en español, permaneció en el campo y no apareció como mensaje enviado en el historial.
- Las pruebas del cliente simulado comprobaron cero llamadas fetch para patrones sensibles; las pruebas de API comprobaron bloqueo antes del servicio externo.
- Check estructural, suite de reglas y despliegue Cloudflare Pages del commit finalizados correctamente.

## 13. Auditoría directa de Ask Tino — 2026-11-07

Autorización del usuario: hacer yo las preguntas al chat, detectar fallos y solucionarlos sin que Tino pierda tiempo.

- Primera ronda pública: 35 turnos sintéticos; se detectaron presupuestos sobrescritos por cálculos, cambios de ciudad ignorados, venta confundida con compra, límites no retirados, cantidades en palabras no guardadas, privacidad física confundida con datos y promesas de no conservación no verificadas.
- Corregidos parser y rutas; ampliadas localidades, objetivos de venta/inversión y accesibilidad; respuestas cortas deterministas; historial no recupera criterios borrados; cálculos no cambian preferencias.
- Nuevas comprobaciones de color de vivienda, prioridad de portugués y cálculos italianos.
- Script scripts/check-ask-tino-conversations.mjs: 50/50 turnos locales y **50/50 contra el servicio público**, después del despliegue.
- En navegador: búsqueda Venice $500,000, tres habitaciones, sin piscina → Port Charlotte → cálculo 20% de $400,000 → resumen conserva Port Charlotte, $500,000, tres habitaciones y sin piscina.
- Commit: b8a035bb5c2800784b6d84636b977439572ddb4f. Cloudflare Pages, rules y structural-audit: success.
- Referencia detallada: docs/ask-tino-audit-2026-11-07.md y resultados JSON sintéticos asociados.
- Suite local incluida en GitHub Actions para futuros cambios. Pruebas reales se ejecutan con --live; no afirmar que cada cambio llama al proveedor externo automáticamente.
- No es cobertura exhaustiva de toda pregunta posible. Pendientes de Gmail y configuración interna del Worker se mantienen; no se enviaron correos ni reservaron visitas.

## 14. Corrección tras prueba de Tino: vendedor con hipoteca

- Pregunta del propietario: “Quiero vender mi casa en Rotonda West, pero todavía tengo hipoteca. ¿Por dónde empiezo?”. Contestaba solo con criterios y contacto.
- Reconocido límite de la auditoría: 50/50 indicaba condiciones programadas aprobadas, no calidad completa. El test de venta aceptaba derivación sin exigir pasos útiles; ese caso compuesto no estaba incluido.
- El enrutamiento de venta ya no sustituye preguntas sustantivas por una derivación genérica. Explicación de hipoteca: solicitar payoff, estimar precio/gastos/neto, deuda al cierre y resolver diferencias; contacto después de la respuesta.
- Añadidas cuatro versiones del caso y seguimiento sin repetir “vender”: 55 turnos locales pasan. Revisión estructural y privacidad pasan.
- No repetir “todo califica” como valoración global. Ampliar pruebas por intención y utilidad, no solo palabras clave o integridad del estado.

## 15. Las diez preguntas exactas: pruebas a cargo del asistente

- Tino pidió explícitamente hacer yo las diez, revisar respuestas y agregar/corregir lo necesario, sin que él siga copiándolas.
- Baseline público secuencial: fallos en 2 (repetición), 7 (presupuesto incorrecto y sin comparación), 8 (enlaces de permisos en lugar de revisión de alquiler), 10 (promesa de no guardar documentos no verificada).
- Corregidos esos casos con contenido útil antes de contacto, preservando la diferencia entre capacidades reales y respuestas genéricas. Inversión actualiza $350,000; condo revisa documentos/enmiendas/confirmación escrita/reglas locales; documentos sensibles se derivan a canal adecuado sin prometer eliminación.
- Nuevo script scripts/check-ask-tino-owner-questions.mjs: exactamente las 10 en la misma conversación; pruebas locales sin llamadas externas. Más 60 turnos generales y auditoría estructural local aprobados.
- La comprobación pública posterior al despliegue se registra al terminar; no equiparar las pruebas locales con producción.

### Resultado público de las diez preguntas

- Commit b329ee38f0b957725c2405d7dbac23336d90b257: Cloudflare Pages, structural-audit y rules finalizados con éxito.
- Repetición de las 10 exactas en una misma conversación pública: 10/10 comprobaciones; revisión de las diez respuestas completas. No se pidió a Tino que las repitiera.
- 2: explica faltante, aprobación y deuda restante. 7: presupuesto $350,000 y gastos/vacancia/flujo. 8: documentos/enmiendas/confirmación escrita/reglas locales. 9: presupuesto $350,000 sin inventario inventado. 10: rechaza envío de documentos y expresa límites reales del proveedor.
- Informe: docs/ask-tino-owner-10-2026-11-07.md; JSON antes/después asociado. No interpretar el resultado como garantía de toda respuesta posible.

## 16. Segunda ronda de diez preguntas, a cargo del asistente

- Autorizado: hacer yo las diez nuevas, mantener 1–4 en la misma conversación, corregir y volver a probar.
- Baseline real: no retenía condominio/mascotas; $400,000 se aceptaba en texto pero se mantenían $350,000; no sustituía dos habitaciones por una; resumen incorrecto; gastos/inspecciones demasiado genéricos; inundación derivaba a MLS; compra remota se reducía a visita; conflicto Airbnb volvía a pedir tipo conocido; confirmación de envío no recibía respuesta explícita.
- Nuevos campos propertyType y pets, presupuesto y reemplazo de habitaciones corregidos. Nuevas respuestas temáticas en functions/api/ask-tino-guidance.js (cuatro idiomas), sin prometer verificaciones o acciones reales.
- Búsqueda de contenido usa límites de palabra. “necesito” ya no activa “sito”. Preguntas sustantivas no se sustituyen por resumen/MLS.
- Nueva suite scripts/check-ask-tino-owner-round2.mjs: 10 casos locales. Más 60 generales, las 10 anteriores, privacidad y auditoría estructural pasan.
- Cliente/core/cargadores/referencias HTML versionados round2 para preservar nuevos campos entre envíos. La comprobación pública y visual se registra tras el despliegue.

### Resultado publicado de la segunda ronda

- Implementación 60a716a44969e0a531e42acea81174c700ef8bd0; generalización de cuota/país/fecha 28572b4cd83c9fa8f8db303b47a6c90071856bbb.
- Las diez nuevas exactas se repitieron en producción: 10/10 comprobaciones y revisión de las respuestas completas. Repetición final tras el último ajuste: 10/10.
- En navegador real, 1–4 conservan condominio, mascotas, Venice, $400,000 y una habitación, sin añadir piscina.
- Cloudflare Pages, rules y structural-audit: success. Local: 60 generales, diez anteriores, diez nuevas, privacidad y estructura aprobados.
- Informe docs/ask-tino-owner-round2-2026-11-07.md y JSON antes/después asociado. No equivale a certificar todas las variantes ni propiedades específicas.

## 17. Tercera ronda de diez preguntas — pruebas y mejoras a cargo del asistente

- El usuario autorizó hacer las diez, investigar respuestas y realizar las mejoras necesarias.
- Baseline publicado: perdía garaje/sin asociación, no volvía opcional la piscina, no restauraba $450,000 ni conservaba Englewood + Port Charlotte; faltaba respuesta útil sobre crédito de vendedor, reservas, uso mixto y verificación de transferencia; el resumen no era un borrador para enviar.
- Campos nuevos garageSpaces/hoa/cities/use/personalUseMonths. Mantiene alternativas sin elegir por el usuario. Resumen puede pedir una aclaración y preparar texto para copiar, sin envío.
- Guías temáticas nuevas y eliminación de falsos disparadores FREC dentro de “ofrece” y consulta web al decir “investigar”. No prometer autenticación de cuentas, recuperación de dinero, ausencia de fondos propios ni deducciones fiscales.
- Local: diez de ronda 3, diez de ronda 2, diez anteriores, 60 generales, privacidad y auditoría estructural aprobados. Publicación/verificación real se documenta al terminar.
- Cliente/core/cargadores/referencias HTML round3 para nuevos campos. No tocar OceanFL ni My Closing Timeline.

### Resultado publicado de ronda 3

- Commit 306caa5c16d60dcae72e19a3e50eb7fc498b2aee: Cloudflare Pages, rules, structural-audit success.
- Mismas diez nuevas en conversación pública: 10/10 comprobaciones y lectura de respuestas completas.
- Navegador, 1–4: Englewood / Port Charlotte, $450,000, garaje 2, sin asociación, piscina opcional; pregunta habitaciones sin inventarlas ni elegir ciudad.
- 6 distingue créditos de cash to close; 7 detalla reservas/cuota; 8 uso mixto; 9 verificación independiente de transferencia; 10 borrador no enviado.
- Informe docs/ask-tino-owner-round3-2026-11-07.md y JSON asociado con antes/después. Cobertura finita, sin afirmar perfección del chat o verificación de una propiedad/cuenta concreta.
