---
title: Glosario
---

# Glosario

## Aportes hídricos

Caudal de agua que llega a los ríos del sistema en cada etapa, por escenario. Es el
insumo hidrológico que alimenta el balance de caudal de la red hidráulica. Se
documenta en la tabla [`aporteshidricos`](../datos/aporteshidricos).

## Área operativa

Cada una de las divisiones en las que se separa el sistema para modelar límites de
intercambio de energía —importación y exportación— con el resto del sistema. Se
define en [`areabasica`](../datos/areabasica) y su variante por etapa,
`areaperiodo`.

## Bloque de demanda

Agrupación de la demanda dentro de cada etapa según su nivel, que permite
distinguir las horas de mayor consumo de las de menor consumo sin resolver hora por
hora. Ver [Conceptos](../conceptos) y la tabla
[`demandabloque`](../datos/demandabloque).

## Curva de aversión al riesgo

Parámetro, entre 0 y 100, que fija qué tan conservador es el sistema frente al
riesgo hidrológico en cada etapa del horizonte. Se define por etapa en el campo
`car` de [`periodobasica`](../datos/periodobasica).

## Embalse

Depósito que almacena agua entre etapas para turbinarla cuando conviene. Su
volumen mínimo, máximo, inicial y final se definen en
[`embalsebasica`](../datos/embalsebasica) y su variante por etapa,
`embalseperiodo`.

## Etapa

Cada paso de tiempo del horizonte de análisis; lo que se decide en una etapa
condiciona el agua disponible en la siguiente. Ver [Conceptos](../conceptos) y la
tabla [`periodobasica`](../datos/periodobasica).

## Factor de conversión

Relación que transforma el caudal turbinado de un recurso hidráulico en energía
generada; puede ser un valor promedio o variar con el volumen del embalse. Se
documenta en [`recursohidrobasica`](../datos/recursohidrobasica) y
[`recursohidrovariable`](../datos/recursohidrovariable).

## Factor de consumo

Relación que determina cuánto combustible consume un recurso térmico por unidad de
energía generada; puede ser un valor promedio o variar con la generación. Se
documenta en [`recursotermicobasica`](../datos/recursotermicobasica) y
[`recursotermicovariable`](../datos/recursotermicovariable).

## Horizonte

El período completo que cubre una simulación, dividido en etapas; se define con
una fecha de inicio, una granularidad y un plazo. Ver
[Ciclo de una simulación](../ciclo).

## Racionamiento

Energía que el sistema no logra atender con los recursos disponibles. Su costo por
etapa se define en el campo `costoracionamiento` de
[`periodobasica`](../datos/periodobasica) y penaliza la función objetivo.

## Recurso de generación

Cada planta que puede generar energía en el sistema —hidráulica, térmica o no
convencional—, con sus límites, su costo variable y las banderas que definen su
comportamiento. Ver las familias de recursos en el [modelo de datos](../datos/).

## Sistema hidráulico

Conjunto de elementos hidráulicos —embalses, arcos, bombeos, ríos— conectados
entre sí, con un límite conjunto de turbinamiento. Su conexión se describe en la
topología hidráulica. Se define en
[`sistemahidrobasica`](../datos/sistemahidrobasica) y su variante por etapa,
`sistemahidroperiodo`.

## Topología hidráulica

El grafo de conexiones de un sistema hidráulico: qué elemento hace parte de él, qué
acción de caudal realiza —turbinamiento, vertimiento o acueducto— y qué
generadores se relacionan con cada elemento. Se documenta en
[`topologiahidraulica`](../datos/topologiahidraulica).

## Turbinamiento

El caudal de agua que pasa por las turbinas de un recurso hidráulico para generar
energía, con un mínimo y un máximo por elemento o por sistema. Se documenta en
[`elementohidraulicobasica`](../datos/elementohidraulicobasica) y
[`sistemahidrobasica`](../datos/sistemahidrobasica).

## Vertimiento

El caudal de agua que se libera de un embalse sin pasar por las turbinas, por
ejemplo cuando el embalse está lleno. Tiene un máximo por etapa y una penalización
en la función objetivo. Se documenta en
[`embalsebasica`](../datos/embalsebasica).

## Volumen útil

La diferencia entre el volumen máximo y el volumen mínimo de un embalse; es la
referencia sobre la que se expresan el volumen inicial y el volumen final, ambos
en valores entre 0 y 1. Se documenta en [`embalsebasica`](../datos/embalsebasica).

## Zona de seguridad

Agrupación de recursos de generación sobre la que se vigila un límite conjunto,
mínimo o máximo, típico de restricciones eléctricas o de seguridad de red. Se
documenta en [`zonabasica`](../datos/zonabasica) y sus variantes `zonaperiodo` y
`zonarecurso`.
