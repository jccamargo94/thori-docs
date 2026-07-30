import { readdirSync, readFileSync, unlinkSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { basename } from 'node:path'
import { parse, stringify } from 'yaml'

const contentDir = fileURLToPath(new URL('../content/tablas/', import.meta.url))
const outDir = fileURLToPath(new URL('../docs/despacho-hidrotermico/datos/', import.meta.url))

// VitePress corre markdown-it con HTML crudo habilitado: un `<` de una descripción se
// interpretaría como etiqueta. Todo texto que venga del YAML y no esté entre backticks
// (el code span de markdown-it ya escapa solo) pasa por acá antes de ir a la página.
// El orden importa: `&` primero, o las entidades que generamos acá se escaparían de nuevo.
function escapeHtml(texto) {
  return String(texto).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

// Texto libre (párrafo de descripción de tabla): escapado, conserva sus saltos de línea.
function textoLibre(texto) {
  return escapeHtml(texto).trim()
}

// Celda de tabla markdown: escapada, sin `|` ni saltos de línea literales.
function celda(texto) {
  return escapeHtml(texto).replace(/\|/g, '\\|').replace(/\s*\n\s*/g, ' ').trim()
}

function filaCampo(campo) {
  const nombre = escapeHtml(campo.nombre)
  const tipo = escapeHtml(campo.tipo)
  const unidad = campo.unidad != null ? escapeHtml(campo.unidad) : '—'
  const obligatorio = campo.requerido ? 'Sí' : 'No'
  let descripcion = celda(campo.descripcion)
  if (campo.referencia) {
    const referencia = escapeHtml(campo.referencia)
    const destino = campo.referencia.split('.')[0]
    descripcion += `<br>Referencia a [\`${referencia}\`](./${destino}.md)`
  }
  return `| \`${nombre}\` | ${tipo} | ${unidad} | ${obligatorio} | ${descripcion} |`
}

function paginaTabla(t) {
  const titulo = escapeHtml(t.titulo)
  const nombre = escapeHtml(t.nombre)
  const manual = escapeHtml(t.manual)
  const estado = escapeHtml(t.estado)
  const frontmatter = stringify({ title: t.titulo, editLink: false }).trim()
  const campos = t.campos.length
    ? [
        '| Campo | Tipo | Unidad | Obligatorio | Descripción |',
        '|---|---|---|---|---|',
        ...t.campos.map(filaCampo),
      ].join('\n')
    : '_Esta tabla no tiene campos: el manual la declara pero indica que no está disponible en la versión del modelo que documenta el manual._'

  return `---
${frontmatter}
---

# ${titulo}

\`${nombre}\` · sección ${manual} del manual de base de datos · <BadgeEstado estado="${estado}" />

${textoLibre(t.descripcion)}

## Campos

${campos}
`
}

// Limpia huérfanos: un .md generado de una tabla que ya no tiene YAML se queda navegable
// y buscable si no lo borramos antes de regenerar. index.md es manual, nunca se toca.
for (const archivo of readdirSync(outDir)) {
  if (archivo.endsWith('.md') && archivo !== 'index.md') {
    unlinkSync(outDir + archivo)
  }
}

for (const archivo of readdirSync(contentDir).filter((f) => f.endsWith('.yaml'))) {
  const tabla = { ...parse(readFileSync(contentDir + archivo, 'utf-8')), id: basename(archivo, '.yaml') }
  writeFileSync(outDir + `${tabla.id}.md`, paginaTabla(tabla))
}
