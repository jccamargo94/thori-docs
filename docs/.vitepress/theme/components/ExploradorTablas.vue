<script setup lang="ts">
import { computed, ref } from 'vue'
import { withBase } from 'vitepress'
import { data as tablas } from '../../data/tablas.data.mts'
import { ETIQUETAS_FAMILIA } from '../../../../schema/tabla.mts'

const consulta = ref('')
const familia = ref('todas')

const familias = computed(() => ['todas', ...new Set(tablas.map((t) => t.familia))])

const etiquetaFamilia = (f: string) =>
  f === 'todas' ? 'Todas' : (ETIQUETAS_FAMILIA[f as keyof typeof ETIQUETAS_FAMILIA] ?? f)

const normalizar = (s: string) =>
  s.toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '')

const resultados = computed(() => {
  const q = normalizar(consulta.value.trim())
  return tablas
    .filter((t) => familia.value === 'todas' || t.familia === familia.value)
    .map((t) => {
      const campos = q
        ? t.campos.filter(
            (c) => normalizar(c.nombre).includes(q) || normalizar(c.descripcion).includes(q),
          )
        : []
      const coincideTabla =
        !q || normalizar(t.nombre).includes(q) || normalizar(t.titulo).includes(q)
      return { tabla: t, campos, visible: coincideTabla || campos.length > 0 }
    })
    .filter((r) => r.visible)
})
</script>

<template>
  <div class="explorador">
    <div class="controles">
      <input
        v-model="consulta"
        type="search"
        placeholder="Buscar tabla o campo…"
        aria-label="Buscar tabla o campo"
      />
      <select v-model="familia" aria-label="Filtrar por familia">
        <option v-for="f in familias" :key="f" :value="f">{{ etiquetaFamilia(f) }}</option>
      </select>
    </div>

    <p class="conteo" aria-live="polite">{{ resultados.length }} de {{ tablas.length }} tablas</p>

    <details v-for="r in resultados" :key="r.tabla.id" :open="r.campos.length > 0">
      <summary>
        <strong>{{ r.tabla.titulo }}</strong>
        <code>{{ r.tabla.nombre }}</code>
        <span class="familia">{{ etiquetaFamilia(r.tabla.familia) }}</span>
      </summary>
      <p>{{ r.tabla.descripcion }}</p>
      <ul v-if="r.campos.length">
        <li v-for="c in r.campos" :key="c.nombre">
          <code>{{ c.nombre }}</code> — {{ c.descripcion }}
        </li>
      </ul>
      <a :href="withBase(`/despacho-hidrotermico/datos/${r.tabla.id}`)">Ver todos los campos</a>
    </details>
  </div>
</template>

<style scoped>
.controles {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}
.controles input {
  flex: 1;
  padding: 0.5rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg-soft);
}
.controles select {
  padding: 0.5rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg-soft);
}
.conteo {
  color: var(--vp-c-text-2);
  font-size: 0.875rem;
}
details {
  border-bottom: 1px solid var(--vp-c-divider);
  padding: 0.5rem 0;
}
summary {
  cursor: pointer;
  display: flex;
  gap: 0.5rem;
  align-items: baseline;
}
.familia {
  margin-left: auto;
  color: var(--vp-c-text-2);
  font-size: 0.8rem;
}
</style>
