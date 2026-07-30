---
title: Estados de verificación
---

# Estados de verificación

Cada tabla, cada bandera y cada campo de este sitio lleva una píldora de estado.
Es el mecanismo central de confianza del sitio: te dice si lo que estás leyendo ya
se contrastó contra el código del modelo que corre hoy, o si todavía es una
transcripción del manual original sin verificar.

## Vigente

Verificado contra la versión que corre hoy en la plataforma. Lo que describe la
página coincide con el comportamiento real.

## Cambió respecto al manual

Esta página describe el comportamiento actual, que difiere de lo que dice el manual
original. Cuando el manual y el código no coinciden, el sitio documenta el código,
no el manual.

## No disponible en la plataforma

Documentado en el manual original, pero sin soporte en la versión actual del
modelo. Existe en la fuente que se transcribió, no en el sistema que se usa hoy.

## Sin verificar

Transcrito del manual original; todavía falta contrastarlo con la versión actual
del modelo. Es el estado de partida de toda página nueva.

## Por qué casi todo está "sin verificar" hoy

Este sitio se construyó transcribiendo el manual de base de datos y el catálogo de
banderas, tabla por tabla y bandera por bandera. Contrastar cada una contra el
código del modelo que corre en producción es un trabajo aparte, todavía no hecho:
es la fase que sigue a esta transcripción, no parte de ella.

Marcar casi todo como "sin verificar" en vez de "vigente" es lo que hace honesto el
sello: dice exactamente hasta dónde llega la garantía de hoy, ni una tabla más.
