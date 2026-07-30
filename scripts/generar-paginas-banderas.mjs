import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { parse, stringify } from 'yaml'

const contentFile = fileURLToPath(new URL('../content/banderas.yaml', import.meta.url))
const outFile = fileURLToPath(
  new URL('../docs/despacho-hidrotermico/referencia/banderas.md', import.meta.url),
)

// Mismo problema y misma solución que scripts/generar-paginas-tablas.mjs: VitePress corre
// markdown-it con HTML crudo habilitado, así que un `<` de una descripción se interpretaría
// como etiqueta. El orden importa: `&` primero, o las entidades que generamos acá se
// escaparían de nuevo.
function escapeHtml(texto) {
  return String(texto).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

function textoLibre(texto) {
  return escapeHtml(texto).trim()
}

function celda(texto) {
  return escapeHtml(texto).replace(/\|/g, '\\|').replace(/\s*\n\s*/g, ' ').trim()
}

function filaValor(v) {
  return `| \`${escapeHtml(v.valor)}\` | ${celda(v.significado)} |`
}

function seccionBandera(b) {
  const nombre = escapeHtml(b.nombre)
  const estado = escapeHtml(b.estado)
  const valores = [
    '| Valor | Efecto |',
    '|---|---|',
    ...b.valores.map(filaValor),
  ].join('\n')

  return `## ${nombre} <BadgeEstado estado="${estado}" />

${textoLibre(b.descripcion)}

${valores}
`
}

// El archivo salió del índice de git al volverse generado (ver .gitignore), así que
// su fecha de "última actualización" derivada de git quedaría congelada para
// siempre en el momento en que se dejó de versionar. `lastUpdated: false` la apaga.
const frontmatter = stringify({ title: 'Banderas de configuración', lastUpdated: false }).trim()
const banderas = parse(readFileSync(contentFile, 'utf-8')).sort((a, b) =>
  a.nombre.localeCompare(b.nombre, 'es'),
)

const contenido = `---
${frontmatter}
---

# Banderas de configuración

Cada ejecución se configura con un conjunto de banderas que activan o desactivan
partes del modelo. Cambiar una bandera cambia qué restricciones se imponen, así que
dos ejecuciones con los mismos datos y distintas banderas dan resultados distintos.

Los nombres están fijados en el código del modelo y no se pueden modificar.

${banderas.map(seccionBandera).join('\n')}`

writeFileSync(outFile, contenido)
