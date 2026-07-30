---
title: Leer los resultados
---

# Leer los resultados

Al terminar esta guía vas a saber interpretar cada vista de resultados de una
simulación, y vas a evitar el malentendido más común con los costos.

## Antes de empezar

- Necesitás una simulación con el botón **Ver resultados** disponible en el
  listado de **Simulaciones**, es decir, que haya terminado de [correr](./correr-simulacion).

## Pasos

1. En la tarjeta de la simulación, hacé clic en **Ver resultados**.
2. Abrí la **Ficha técnica** (desplegable) para confirmar con qué configuración
   corrió.
3. Elegí la vista en **Seleccione la gráfica**. Las opciones son: **Generación por
   tecnología** (Horaria, Diaria, Por etapa), **Generación por fuente**,
   **Generación por planta**, **Generación por empresa**, **Costos marginales**
   (Bloques, Bloques/Percentiles, Ponderados, Ponderados/Percentiles), **Embalses**
   (Embalses, Vertimientos), **Sistema Interconectado Nacional** y **Aportes en
   energía**.
4. Según la vista elegida, filtrá por **Bloque**, **Escenario** (uno, varios o
   "Todas") y **Seleccionar elementos**.
5. Descargá el detalle de la vista actual con **Descargar datos**, o el paquete
   completo de la simulación con **Descargar todos los datos**.
6. Si necesitás un documento para compartir, andá a la sección **Reportes** y hacé
   clic en **Generar reporte**. Su estado pasa por Pendiente, Generando y Listo (o
   Fallido); cuando queda Listo, descargalo con **Descargar PDF** o **Descargar
   Word**.

## Qué revisar antes de continuar

- **Los costos no son moneda.** Los valores que ves en **Costos marginales** están
  expresados en unidades internas del catálogo del caso (la interfaz los rotula
  como "ud. de costo/MWh"), no en pesos colombianos ni en dólares. Son comparables
  entre escenarios de una misma simulación, pero no contra precios de mercado. Ver
  el detalle en [Unidades](../referencia/unidades).
- Si una vista no muestra datos para el elemento elegido, aparece el mensaje "No
  hay datos para este activo": revisá que el elemento y el escenario elegidos
  existan en esta simulación.
- Un reporte en estado Fallido no se puede descargar; generá uno nuevo con
  **Generar reporte**.

## Siguiente paso

Con esto cerrás el ciclo completo: base de datos → escenarios → simulación →
resultados. Para repasar el significado de cada término o unidad, revisá el
[Glosario](../referencia/glosario) y las [Unidades](../referencia/unidades).
