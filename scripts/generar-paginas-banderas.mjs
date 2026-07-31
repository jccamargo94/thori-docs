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

function listaArchivos(archivos) {
  // La ausencia de sección es indistinguible de "nadie lo verificó". Como la auditoría
  // recorrió las 29 banderas, el caso vacío se dice con todas las letras.
  if (!archivos?.length) {
    return `
No obliga a subir ningún archivo adicional: trabaja sobre datos que ya vienen en las
tablas obligatorias de todo caso.
`
  }
  const filas = archivos.map((a) => {
    const enlace = `[\`${escapeHtml(a.tabla)}\`](../datos/${escapeHtml(a.tabla)}.md)`
    const cuando = a.valores?.length
      ? `Solo con valor ${a.valores.map((v) => `\`${escapeHtml(v)}\``).join(' o ')}. `
      : ''
    const nota =
      a.fuente === 'modelo'
        ? 'La necesita el modelo. El validador de insumos todavía no la pide: un caso sin ella pasa la validación y falla al resolver.'
        : 'La exige el validador de insumos al crear la base de datos.'
    return `| ${enlace} | ${cuando}${nota} |`
  })
  return `
**Archivos que obliga a subir**

| Tabla | Cuándo se reclama |
|---|---|
${filas.join('\n')}
`
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
${listaArchivos(b.archivos)}`
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

## De la bandera a la restricción

Activar una bandera con cierto valor no solo exige un archivo: ese archivo alimenta
una restricción concreta del modelo de optimización. Estos tres ejemplos muestran el
patrón completo, de punta a punta:

\`\`\`mermaid
flowchart LR
  subgraph FC3 ["FCVARIABLE = 3"]
    F3["FCVARIABLE = 3"] --> T3["ecuacionesFC"] --> C3["r59_ProduccionHidro3<br/>produccion como funcion lineal<br/>de volumen y turbinamiento"]
  end

  subgraph FT1 ["FTVARIABLE = 1"]
    F1["FTVARIABLE = 1"] --> T1["recursoTermicoVariable"] --> C1["r27_ProduccionTermicoFT<br/>produccion termica con<br/>factor de consumo variable"]
  end

  subgraph Z1 ["ZONAS = 1"]
    FZ["ZONAS = 1"] --> TZ["zonaBasica / zonaEspecial<br/>zonaPeriodo / zonaRecurso"] --> CZ["r14_ZonaMinimo<br/>r15_ZonaMaximo<br/>limites por zona de seguridad"]
  end
\`\`\`

El primer caso (\`FCVARIABLE = 3\`) muestra que la clave real es la pareja
bandera-valor, no solo la bandera: \`FCVARIABLE\` en \`1\` o \`2\` exige otras tablas y
alimenta otras restricciones. El tercero (\`ZONAS = 1\`) muestra que una sola bandera
puede exigir varias tablas a la vez y alimentar varias restricciones a la vez.

${banderas.map(seccionBandera).join('\n')}`

writeFileSync(outFile, contenido)
