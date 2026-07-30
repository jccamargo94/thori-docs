import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'

export default withMermaid({
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
          items: [
            { text: 'Qué es', link: '/despacho-hidrotermico/' },
            { text: 'Conceptos', link: '/despacho-hidrotermico/conceptos' },
            { text: 'Ciclo de una simulación', link: '/despacho-hidrotermico/ciclo' },
          ],
        },
        {
          text: 'Guías',
          items: [
            { text: 'Cargar datos', link: '/despacho-hidrotermico/guias/cargar-datos' },
            { text: 'Armar el árbol de escenarios', link: '/despacho-hidrotermico/guias/armar-arbol' },
            { text: 'Correr una simulación', link: '/despacho-hidrotermico/guias/correr-simulacion' },
            { text: 'Leer los resultados', link: '/despacho-hidrotermico/guias/leer-resultados' },
          ],
        },
        {
          text: 'Datos',
          items: [{ text: 'Modelo de datos', link: '/despacho-hidrotermico/datos/' }],
        },
        {
          text: 'Referencia',
          items: [
            { text: 'Glosario', link: '/despacho-hidrotermico/referencia/glosario' },
            { text: 'Unidades', link: '/despacho-hidrotermico/referencia/unidades' },
            { text: 'Estados de verificación', link: '/despacho-hidrotermico/referencia/estados' },
            { text: 'Banderas de configuración', link: '/despacho-hidrotermico/referencia/banderas' },
          ],
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

