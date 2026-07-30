import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import CamposTabla from './components/CamposTabla.vue'
import ExploradorTablas from './components/ExploradorTablas.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('CamposTabla', CamposTabla)
    app.component('ExploradorTablas', ExploradorTablas)
  },
} satisfies Theme
