---
title: Cargar una base de datos
---

# Cargar una base de datos

Al terminar esta guía vas a tener una base de datos disponible para armar escenarios
y lanzar simulaciones.

## Antes de empezar

- Tené a mano el archivo `.zip` con las tablas de parámetros del caso, o decidí de
  antemano que vas a construir la base de datos tabla por tabla.
- Ubicate en **Despacho energético → Bases de datos**.

## Pasos

1. Hacé clic en **Crear base de datos**.
2. Completá **Nombre** y **Descripción**.
3. Respondé "¿Desea subir base de datos?": elegí **Si** si tenés el `.zip` completo
   con todas las tablas, o **No** si vas a seleccionar cada tabla por separado.
4. Si elegiste **Si**: arrastrá el archivo a la zona de carga (o hacé clic en
   "haz clic para cargar") y elegí la **Granularidad** (Diaria, Semanal, Mensual o
   Anual). El archivo debe ser un `.zip` de menos de 100MB.
5. Si elegiste **No**, avanzá con **Siguiente** por los pasos del formulario y
   seleccioná, para cada tabla, el archivo correspondiente:
   - **Recursos hidráulicos**: recurso hidráulico básica/periodo/variable,
     ecuaciones factor de conversión, elemento hidráulico básica/periodo, embalse
     básica/periodo, sistema hidráulico básica/periodo, topología hidráulica y
     aportes hídricos.
   - **Recursos térmicos**: recurso térmico básica/periodo/variable y recursos
     térmicos excluyentes.
   - **Recursos NO convencionales**: recurso no convencional básica/periodo/bloque.
   - **Fecha de entrada**.
   - **Áreas operativas**: área básica y área periodo.
   - **Zonas de seguridad**: zona básica, zona periodo, zona recurso y zona especial.
   - **Demanda del sistema**: periodo básica y demanda bloque.
   - **Bloques**: bloque básica y bloque periodo.
   - **Combustibles**: combustible básica y combustible periodo.
   - **Contrato combustibles**: contrato combustible básica/periodo/recurso.
   - **Empresas**: empresa básica, empresa periodo y demanda residual.
6. Hacé clic en **Siguiente** para pasar de un paso al otro y, en el último, en
   **Aceptar** (o en **Crear**, si subiste el `.zip`).

## Qué revisar antes de continuar

- Ves la notificación "Base de datos creada exitosamente" y la fila nueva en el
  listado de **Bases de datos**.
- Si el nombre ya existe, el formulario te avisa "El nombre ya existe, por favor,
  cambielo" antes de dejarte avanzar.
- Para revisar el contenido que quedó cargado, usá el botón de inspección (ícono de
  lupa) de la fila: te lleva a **Inspeccionar archivos**, donde podés elegir la
  gráfica y la métrica de cada tabla cargada. El detalle de cada campo de cada tabla
  está en el [modelo de datos](../datos/).

## Siguiente paso

[Armar el árbol de escenarios](./armar-arbol)
