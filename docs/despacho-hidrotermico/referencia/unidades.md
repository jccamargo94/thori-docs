---
title: Unidades
---

# Unidades

Estas son las unidades que usan los campos del modelo de datos. Cada entrada indica
qué mide y en qué tablas aparece.

## MWh

Energía por etapa. Es la unidad de la demanda del sistema y de las áreas, de los
límites de importación y exportación, de los valores de zona de seguridad, de la
generación máxima de los recursos hidráulicos y térmicos variables, y de los
contratos y la reserva AGC. Aparece en [`periodobasica`](../datos/periodobasica),
[`areabasica`](../datos/areabasica), `areaperiodo`,
[`zonabasica`](../datos/zonabasica), `zonaperiodo`, `empresabasica`,
`empresaperiodo`, [`recursohidrovariable`](../datos/recursohidrovariable) y
[`recursotermicovariable`](../datos/recursotermicovariable).

## m3/s

Caudal. Mide los aportes hídricos, el turbinamiento mínimo y máximo, y la
filtración de embalses y sistemas hidráulicos. Aparece en
[`aporteshidricos`](../datos/aporteshidricos),
[`embalsebasica`](../datos/embalsebasica), `embalseperiodo`,
[`elementohidraulicobasica`](../datos/elementohidraulicobasica),
`elementohidraulicoperiodo`, [`sistemahidrobasica`](../datos/sistemahidrobasica) y
`sistemahidroperiodo`.

## MBTUh

Tasa de retiro de combustible por hora. Mide la capacidad y el mínimo de los
centros de combustible y de sus contratos. Aparece en `combustiblebasica`,
`combustibleperiodo`, `contratocombustiblebasica` y `contratocombustibleperiodo`.

## $/MWh

Costo variable de generación. Mide el costo variable de los recursos hidráulicos y
térmicos, el precio de los contratos bilaterales y el costo de racionamiento y el
CERE de cada etapa. Aparece en
[`recursohidrobasica`](../datos/recursohidrobasica), `recursohidroperiodo`,
[`recursotermicobasica`](../datos/recursotermicobasica), `recursotermicoperiodo`,
`empresabasica` y [`periodobasica`](../datos/periodobasica).

El `$` es la notación del manual, no un signo de moneda: son unidades internas de
costo del catálogo del caso, no pesos ni dólares — ver la
[advertencia sobre costos](#costos-una-advertencia) al final de esta página.

## Hm3

Volumen de embalse. Mide el volumen mínimo, máximo y el vertimiento máximo del
embalse, y el volumen de cada punto de la curva de conversión. Aparece en
[`embalsebasica`](../datos/embalsebasica), `embalseperiodo` y
[`recursohidrovariable`](../datos/recursohidrovariable).

## $/MBTU

Costo de combustible. Mide el costo del combustible, el costo de transporte y el
costo de los contratos de combustible. Aparece en `combustiblebasica`,
`combustibleperiodo`, `contratocombustiblebasica` y `contratocombustibleperiodo`.

Igual que en `$/MWh`, el `$` es notación heredada del manual: son unidades internas
de costo, no pesos ni dólares — ver la
[advertencia sobre costos](#costos-una-advertencia) al final de esta página.

## MW/m3/s

Factor de conversión hidráulica: cuánta energía produce cada unidad de caudal
turbinado. Aparece en [`recursohidrobasica`](../datos/recursohidrobasica) y
[`recursohidrovariable`](../datos/recursohidrovariable).

## %

Porcentaje. Mide la curva de aversión al riesgo (`car`) y la tasa de descuento
(`tasadescuento`) de cada etapa. Aparece en
[`periodobasica`](../datos/periodobasica).

## MBTU/MWh

Factor de consumo térmico: cuánto combustible consume un recurso térmico por
unidad de energía generada. Aparece en
[`recursotermicobasica`](../datos/recursotermicobasica).

## horas

Duración de una etapa del horizonte de optimización. Aparece en
[`periodobasica`](../datos/periodobasica), en el campo `duracionhoras`.

## GWh-etapa

Energía agregada de un bloque de demanda a lo largo de la etapa. Aparece en
[`demandabloque`](../datos/demandabloque).

## Costos: una advertencia

Los costos que devuelve una simulación están expresados en **unidades internas del
catálogo del caso**. No son pesos colombianos ni dólares, y no deben interpretarse ni
presentarse como moneda. Son comparables entre sí dentro de una misma simulación; no
son comparables contra precios de mercado.
