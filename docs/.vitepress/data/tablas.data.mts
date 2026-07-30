import { readFileSync } from 'node:fs'
import { basename } from 'node:path'
import { parse } from 'yaml'
import { defineLoader } from 'vitepress'
import { FAMILIAS, type Tabla } from '../../../schema/tabla.mts'

export declare const data: Tabla[]

export default defineLoader({
  watch: ['../../../content/tablas/*.yaml'],
  load(archivos: string[]): Tabla[] {
    return archivos
      .map((f) => ({ ...parse(readFileSync(f, 'utf-8')), id: basename(f, '.yaml') }) as Tabla)
      .sort(
        (a, b) =>
          FAMILIAS.indexOf(a.familia as never) - FAMILIAS.indexOf(b.familia as never) ||
          a.nombre.localeCompare(b.nombre, 'es'),
      )
  },
})
