import { readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { basename } from 'node:path'
import { parse, stringify } from 'yaml'

const contentDir = fileURLToPath(new URL('../content/tablas/', import.meta.url))
const outDir = fileURLToPath(new URL('../docs/despacho-hidrotermico/datos/', import.meta.url))

// Celda de tabla markdown: sin `|` ni saltos de línea literales.
function celda(texto) {
  return String(texto).replace(/\|/g, '\\|').replace(/\s*\n\s*/g, ' ').trim()
}

function filaCampo(campo) {
  const unidad = campo.unidad ?? '—'
  const obligatorio = campo.requerido ? 'Sí' : 'No'
  let descripcion = celda(campo.descripcion)
  if (campo.referencia) {
    const destino = campo.referencia.split('.')[0]
    descripcion += `<br>Referencia a [\`${campo.referencia}\`](./${destino}.md)`
  }
  return `| \`${campo.nombre}\` | ${campo.tipo} | ${unidad} | ${obligatorio} | ${descripcion} |`
}

function paginaTabla(t) {
  const frontmatter = stringify({ title: t.titulo, editLink: false }).trim()
  const campos = t.campos.length
    ? [
        '| Campo | Tipo | Unidad | Obligatorio | Descripción |',
        '|---|---|---|---|---|',
        ...t.campos.map(filaCampo),
      ].join('\n')
    : '_Esta tabla no tiene campos: el manual la declara pero indica que no está disponible en la versión actual del modelo._'

  return `---
${frontmatter}
---

# ${t.titulo}

\`${t.nombre}\` · sección ${t.manual} del manual de base de datos

${t.descripcion.trim()}

## Campos

${campos}
`
}

for (const archivo of readdirSync(contentDir).filter((f) => f.endsWith('.yaml'))) {
  const tabla = { ...parse(readFileSync(contentDir + archivo, 'utf-8')), id: basename(archivo, '.yaml') }
  writeFileSync(outDir + `${tabla.id}.md`, paginaTabla(tabla))
}
