<script setup lang="ts">
import type { Campo } from '../../../../schema/tabla.mts'

defineProps<{ campos: Campo[] }>()
</script>

<template>
  <p v-if="campos.length === 0">
    <em>Esta tabla no tiene campos: el manual la declara pero indica que no está disponible en la versión actual del modelo.</em>
  </p>
  <table v-else class="campos">
    <thead>
      <tr>
        <th>Campo</th>
        <th>Tipo</th>
        <th>Unidad</th>
        <th>Obligatorio</th>
        <th>Descripción</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="campo in campos" :key="campo.nombre">
        <td><code>{{ campo.nombre }}</code></td>
        <td>{{ campo.tipo }}</td>
        <td>{{ campo.unidad ?? '—' }}</td>
        <td>{{ campo.requerido ? 'Sí' : 'No' }}</td>
        <td>
          {{ campo.descripcion }}
          <template v-if="campo.referencia">
            <br />
            <small>
              Referencia a
              <a :href="`/thori-docs/despacho-hidrotermico/datos/${campo.referencia.split('.')[0]}`">
                <code>{{ campo.referencia }}</code>
              </a>
            </small>
          </template>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
.campos {
  display: table;
  width: 100%;
}
</style>
