---
title: Despacho Hidrotérmico
---

# Despacho Hidrotérmico

El módulo de Despacho Hidrotérmico responde una pregunta: **con los recursos de
generación disponibles, los embalses en el nivel en que están y la demanda esperada,
¿cuál es la forma más barata de atender el sistema durante el horizonte que se analiza?**

Para responderla resuelve un problema de optimización que decide, para cada etapa del
horizonte y cada bloque de demanda, cuánto genera cada planta, cuánto se turbina y
cuánto se vierte en cada embalse, cuánto combustible consume cada térmica y cuánta
energía se intercambia entre áreas.

::: tip Dónde está en la plataforma
En la aplicación esta capacidad vive en la sección **Despacho energético**. Este
sitio la llama por su nombre técnico, Despacho Hidrotérmico, porque es el término
que usa la literatura del sector y el que verás en el resto de la documentación.
:::

## Qué encontrás acá

- [Conceptos](./conceptos) — el vocabulario mínimo para no perderte.
- [Ciclo de una simulación](./ciclo) — de los datos de entrada a los resultados.
- [Modelo de datos](./datos/) — las 43 tablas que describen el caso, campo por campo.
- [Banderas de configuración](./referencia/banderas) — las 29 banderas que cambian qué se modela.

## Qué no encontrás acá

La formulación matemática completa —función objetivo, ecuaciones de las restricciones y
notación— no es pública. Si necesitás ese nivel de detalle, pedilo al equipo de Thori.
