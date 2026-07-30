import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'es-CO',
  title: 'Documentación Thori',
  description: 'Documentación de producto de la plataforma Thori',
  base: '/thori-docs/',
  cleanUrls: true,
  lastUpdated: true,
  themeConfig: {
    search: { provider: 'local' },
    nav: [
      { text: 'Despacho Hidrotérmico', link: '/despacho-hidrotermico/' },
    ],
    sidebar: {
      '/despacho-hidrotermico/': [
        {
          text: 'Empezar',
          items: [{ text: 'Qué es', link: '/despacho-hidrotermico/' }],
        },
        {
          text: 'Datos',
          items: [{ text: 'Modelo de datos', link: '/despacho-hidrotermico/datos/' }],
        },
      ],
    },
    outline: { label: 'En esta página', level: [2, 3] },
    docFooter: { prev: 'Anterior', next: 'Siguiente' },
    lastUpdatedText: 'Última actualización',
    darkModeSwitchLabel: 'Apariencia',
    returnToTopLabel: 'Volver arriba',
    sidebarMenuLabel: 'Menú',
  },
})
