# thori-docs

Documentación de producto de la plataforma Thori. Sitio construido con VitePress y
publicado en GitHub Pages.

## Desarrollo

```bash
npm install
npm run docs:dev
```

## Construir

```bash
npm run docs:build
npm run docs:preview
```

El contenido estructurado (tablas del modelo de datos, banderas de configuración) vive
en `content/` como YAML y es la única fuente de verdad: las páginas y los componentes
interactivos se generan a partir de ahí.
