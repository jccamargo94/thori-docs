import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import ExploradorTablas from './components/ExploradorTablas.vue'
import BadgeEstado from './components/BadgeEstado.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('ExploradorTablas', ExploradorTablas)
    app.component('BadgeEstado', BadgeEstado)
  },
} satisfies Theme
