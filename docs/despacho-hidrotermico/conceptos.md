---
title: Conceptos
---

# Conceptos

Seis términos alcanzan para entender todo lo demás.

## Base de datos

El conjunto de tablas que describe el sistema a simular: qué plantas existen, qué
embalses, qué demanda hay que atender, qué combustible está disponible. Es la
fotografía de partida. Su estructura completa está en el [modelo de datos](./datos/).

## Etapa

Cada paso de tiempo del horizonte de análisis. Una simulación no resuelve un instante:
resuelve una secuencia de etapas encadenadas, donde lo que se decide en una condiciona
el agua disponible en la siguiente.

## Bloque de demanda

Dentro de cada etapa, la demanda se agrupa en bloques según su nivel. Permite
distinguir las horas de mayor consumo de las de menor consumo sin resolver hora por hora.

## Escenario

Un conjunto de supuestos sobre lo que puede pasar: cuánta agua llega a los embalses,
cuánta demanda habrá, qué plantas estarán disponibles. El mismo sistema bajo dos
escenarios distintos da dos despachos distintos.

## Árbol de escenarios

Los escenarios no son independientes: se organizan en un árbol donde cada rama es una
posible evolución del sistema a lo largo de las etapas. Es la estructura que permite
analizar qué pasa si la hidrología resulta mejor o peor de lo esperado.

## Simulación

Una ejecución concreta: una base de datos, un árbol de escenarios y una configuración
de banderas, resueltos por el optimizador. Su salida son los resultados que se consultan
en la plataforma.
