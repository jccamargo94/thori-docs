---
title: Armar el árbol de escenarios
---

# Armar el árbol de escenarios

Al terminar esta guía vas a tener un árbol de escenarios listo para elegir al lanzar
una simulación.

## Antes de empezar

- Necesitás una [base de datos ya cargada](./cargar-datos).
- Ubicate en **Despacho energético → Escenarios**, pestaña **Parametrización
  escenarios**.

## Pasos

1. Hacé clic en **Crear escenarios básica**.
2. En **Seleccione la base de datos**, elegí la base de datos sobre la que vas a
   trabajar, y completá **Nombre** y **Descripción**.
3. En la tabla que aparece, para cada variable definí el **Número de escenarios**,
   si queda **Activo** y su **Etapa de árbol**.
4. Hacé clic en **Siguiente**.
5. En el paso **Crear árbol de escenarios**, revisá el listado que se generó; podés
   eliminar una fila puntual con el botón de la columna **Acciones**, o seleccionar
   varias y usar el botón circular de ícono de papelera (arriba de la tabla, con el
   tooltip "Eliminar todos") para eliminarlas juntas.
6. Hacé clic en **Guardar árbol**.

Alternativa más rápida: en la pestaña **Arboles de escenarios**, el botón
**Asistente de escenarios** genera un árbol guiado sin pasar por el formulario manual.

## Qué revisar antes de continuar

- Ves el aviso "Árbol de escenario exitoso" y el árbol nuevo aparece en la pestaña
  **Arboles de escenarios**.
- Desde esa pestaña podés abrir el diálogo **Árbol de Escenarios** para revisar la
  combinación completa que se generó; su estructura de columnas se documenta en la
  tabla [`arbolescenarios`](../datos/arbolescenarios).
- Si el nombre ya existe, el formulario te avisa antes de dejarte guardar.

## Siguiente paso

[Correr una simulación](./correr-simulacion)
