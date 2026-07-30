import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import CamposTabla from './components/CamposTabla.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('CamposTabla', CamposTabla)
  },
} satisfies Theme
