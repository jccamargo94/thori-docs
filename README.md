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

## Capturas de pantalla

Las imágenes que se referencian desde el markdown van en `docs/public/`: VitePress las
sirve tal cual desde la raíz del sitio, así que una captura en
`docs/public/despacho-hidrotermico/cargar-datos-arbol.webp` se referencia en el
markdown como `/despacho-hidrotermico/cargar-datos-arbol.webp`.

- **Nombre**: descriptivo y en kebab-case (`cargar-datos-arbol.webp`, no
  `captura1.webp`), con el mismo prefijo de sección que la guía donde se usa.
- **Formato**: `.webp`. No subas `.png` ni `.jpg`.
- **Qué capturar**: siempre contra el ambiente de desarrollo, con datos ficticios —
  nunca una captura de un ambiente con datos reales de un cliente.
- **Encuadre**: recortada al widget o al componente que se está documentando, nunca la
  pantalla completa. Sin cromo del navegador (barra de direcciones, pestañas,
  marcadores): solo el contenido de la aplicación.

Sin capturas propias todavía, `docs/public/` solo tiene un `.gitkeep`.
