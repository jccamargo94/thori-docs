---
title: Modelo de datos
---

<script setup>
import { data as tablas } from '../../.vitepress/data/tablas.data.mts'
import { computed } from 'vue'

const familias = computed(() => {
  const mapa = new Map()
  for (const t of tablas) {
    if (!mapa.has(t.familia)) mapa.set(t.familia, [])
    mapa.get(t.familia).push(t)
  }
  return [...mapa.entries()]
})
</script>

# Modelo de datos

El caso que se simula se describe con {{ tablas.length }} tablas. Están agrupadas por
familia; cada tabla documenta sus campos, su tipo y su unidad.

<div v-for="[familia, items] in familias" :key="familia">
  <h2>{{ familia }}</h2>
  <ul>
    <li v-for="t in items" :key="t.id">
      <a :href="`/thori-docs/despacho-hidrotermico/datos/${t.id}`">{{ t.titulo }}</a>
      — <code>{{ t.nombre }}</code>
    </li>
  </ul>
</div>
