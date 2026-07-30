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

Las páginas de tabla (`docs/despacho-hidrotermico/datos/*.md`, salvo `index.md`) y la
de banderas (`docs/despacho-hidrotermico/referencia/banderas.md`) se generan y se
borran en cada build (`predocs:dev`/`predocs:build`, ver `scripts/`); están
gitignoradas, no las edites a mano. Para agregar una tabla: (1) sumá su YAML en
`content/tablas/`, (2) si es de una familia nueva, agregala a `FAMILIAS` y a
`ETIQUETAS_FAMILIA` en `schema/tabla.mts`, y (3) si trae una unidad nueva, documentala
en `docs/despacho-hidrotermico/referencia/unidades.md`.
