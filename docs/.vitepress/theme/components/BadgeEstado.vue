<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{ estado: string }>()

const TEXTOS: Record<string, { etiqueta: string; ayuda: string }> = {
  vigente: {
    etiqueta: 'Vigente',
    ayuda: 'Verificado contra la versión que corre hoy en la plataforma.',
  },
  'difiere-v6': {
    etiqueta: 'Cambió respecto al manual',
    ayuda: 'Esta página describe el comportamiento actual, que difiere del manual original.',
  },
  'no-implementado': {
    etiqueta: 'No disponible en la plataforma',
    ayuda: 'Documentado en el manual original, sin soporte en la versión actual.',
  },
  'sin-verificar': {
    etiqueta: 'Sin verificar',
    ayuda: 'Transcrito del manual original; falta contrastarlo con la versión actual.',
  },
}

const info = computed(() => TEXTOS[props.estado] ?? TEXTOS['sin-verificar'])
</script>

<template>
  <span class="badge" :class="`badge--${estado}`" :title="info.ayuda">{{ info.etiqueta }}</span>
</template>

<style scoped>
.badge {
  display: inline-block;
  padding: 0.1rem 0.55rem;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 600;
  border: 1px solid;
  cursor: help;
}
.badge--vigente {
  color: var(--vp-c-green-1);
  border-color: var(--vp-c-green-3);
  background: var(--vp-c-green-soft);
}
.badge--difiere-v6 {
  color: var(--vp-c-yellow-1);
  border-color: var(--vp-c-yellow-3);
  background: var(--vp-c-yellow-soft);
}
.badge--no-implementado {
  color: var(--vp-c-red-1);
  border-color: var(--vp-c-red-3);
  background: var(--vp-c-red-soft);
}
.badge--sin-verificar {
  color: var(--vp-c-text-2);
  border-color: var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
}
</style>
