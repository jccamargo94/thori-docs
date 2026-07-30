---
title: Banderas de configuración
---

<script setup>
import { data as banderas } from '../../.vitepress/data/banderas.data.mts'
</script>

# Banderas de configuración

Cada ejecución se configura con un conjunto de banderas que activan o desactivan
partes del modelo. Cambiar una bandera cambia qué restricciones se imponen, así que
dos ejecuciones con los mismos datos y distintas banderas dan resultados distintos.

Los nombres están fijados en el código del modelo y no se pueden modificar.

## Índice

[AREAS](#AREAS) · [CAR](#CAR) · [CONTRATOSBILATERALES](#CONTRATOSBILATERALES) ·
[CONTRATOSCOMBUSTIBLE](#CONTRATOSCOMBUSTIBLE) · [COSTO1](#COSTO1) · [COSTO2](#COSTO2) ·
[COSTO3](#COSTO3) · [DEMANDA](#DEMANDA) · [DH](#DH) · [ESCENARIO](#ESCENARIO) ·
[FCVARIABLE](#FCVARIABLE) · [FTVARIABLE](#FTVARIABLE) · [GAS](#GAS) ·
[GENERACIONMAXIMA](#GENERACIONMAXIMA) · [GENERARLP](#GENERARLP) · [ITERATIVO](#ITERATIVO) ·
[MARGINALES](#MARGINALES) · [MODELO](#MODELO) · [OPTIMIZADOR](#OPTIMIZADOR) ·
[PENALIZACION_VMN](#PENALIZACION_VMN) · [PENALIZACION_VMX](#PENALIZACION_VMX) ·
[PENALIZACIONV](#PENALIZACIONV) · [PERFILPERIODICO](#PERFILPERIODICO) · [RGON](#RGON) ·
[TASADESCUENTO](#TASADESCUENTO) · [UTILVARIABLE](#UTILVARIABLE) · [VERTIMIENTOS](#VERTIMIENTOS) ·
[VOLUMENFINAL](#VOLUMENFINAL) · [ZONAS](#ZONAS)

<div v-for="b in banderas" :key="b.nombre">
  <h2 :id="b.nombre">
    <code>{{ b.nombre }}</code>
    <BadgeEstado :estado="b.estado" />
  </h2>
  <p>{{ b.descripcion }}</p>
  <table>
    <thead><tr><th>Valor</th><th>Efecto</th></tr></thead>
    <tbody>
      <tr v-for="v in b.valores" :key="v.valor">
        <td><code>{{ v.valor }}</code></td>
        <td>{{ v.significado }}</td>
      </tr>
    </tbody>
  </table>
</div>
