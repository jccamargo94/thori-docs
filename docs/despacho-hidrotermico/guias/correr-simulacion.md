---
title: Correr una simulación
---

# Correr una simulación

Al terminar esta guía vas a tener una simulación en ejecución y vas a saber
interpretar cada estado hasta que termine.

## Antes de empezar

- Necesitás una [base de datos cargada](./cargar-datos) y, si vas a resolver más de
  un escenario, su [árbol de escenarios armado](./armar-arbol).
- Si querés decidir con precisión qué restricciones activar, revisá las
  [banderas de configuración](../referencia/banderas): cada casilla del paso de
  restricciones corresponde a una de ellas.

## Pasos

1. En **Despacho energético → Simulaciones**, hacé clic en **Creación de
   simulación**.
2. Paso **Características principales**: completá el **Nombre de la simulación** y
   la **Descripción**, elegí el beneficio en "Qué beneficio desea obtener de esta
   simulación" (**Quiero minimizar los costos** o **Quiero maximizar las
   utilidades**), seleccioná la **Base de datos** — es lo primero que hay que elegir,
   porque de ella dependen el horizonte y los árboles de escenarios disponibles — y
   definí el **Horizonte**: **Fecha de inicio**, **Granularidad** y **Plazo**.
3. Paso **Restricciones de la simulación**: marcá las restricciones a incluir,
   agrupadas en cuatro bloques — **Ecuaciones de Generación hidráulica**,
   **Ecuaciones de Generación Térmica**, **Ecuaciones de Modelo Eléctrico** y
   **Generales** — y elegí la **Fuente de datos**: **Demanda**, **Factor de
   Conversión Variable** y **Factor de Consumo Variable**.
4. Paso **Escenarios**: elegí el **Árbol escenarios** de la base de datos, y el
   **Escenario** a resolver: **Todos los escenarios** (el modelo optimiza cada rama,
   tarda más) o **Escenario específico** (una sola rama, ideal para pruebas
   rápidas; se habilita el campo **Escenario específico** con el número puntual).
5. Paso de resumen: revisá la configuración completa y, si querés, abrí
   **Opciones avanzadas** para activar **Calcular también la capa de riesgo**: un
   cálculo adicional que corre después del despacho de costo mínimo y añade la cola
   de riesgo — qué tan caro sale el sistema en los escenarios malos —, algo que un
   despacho de costo mínimo no puede expresar por sí solo. No sustituye a los
   resultados de siempre; alarga la simulación entre 20 y 80 minutos.
6. Hacé clic en **Ejecutar simulación** (el botón dice **Actualizar simulación** o
   **Replicar simulación** si venís de editar o de replicar una existente).

## Qué revisar antes de continuar

- En el listado de **Simulaciones**, la tarjeta de tu simulación muestra el
  **Estado** con una barra de progreso y uno de tres botones: **Simulación en
  ejecución**, **Simulación fallida**, o **Ver resultados** cuando termina bien.
- Mientras está en ejecución, el botón con ícono de tickets ("Mostrar mensajes del
  solver") abre una consola en vivo con el estado **En vivo** / **Conectando…** /
  **Desconectado**; sirve para diagnosticar por qué una simulación tarda o falla.
- Error frecuente: si la base de datos elegida no tiene ningún árbol de escenarios
  asociado, la aplicación te lo avisa y te ofrece crear uno antes de seguir — volvé
  a [armar el árbol de escenarios](./armar-arbol).

## Siguiente paso

[Leer los resultados](./leer-resultados)
