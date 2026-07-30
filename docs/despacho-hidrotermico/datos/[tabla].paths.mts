import { readdirSync, readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { parse } from 'yaml'

const dir = fileURLToPath(new URL('../../../content/tablas/', import.meta.url))

export default {
  paths() {
    return readdirSync(dir)
      .filter((f) => f.endsWith('.yaml'))
      .map((f) => {
        const t = parse(readFileSync(dir + f, 'utf-8'))
        return { params: { tabla: t.id, ...t } }
      })
  },
}
