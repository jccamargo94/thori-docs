import { readFileSync } from 'node:fs'
import { parse } from 'yaml'
import { defineLoader } from 'vitepress'
import type { Bandera } from '../../../schema/bandera.mts'

export declare const data: Bandera[]

export default defineLoader({
  watch: ['../../../content/banderas.yaml'],
  load(archivos: string[]): Bandera[] {
    const banderas: Bandera[] = parse(readFileSync(archivos[0], 'utf-8'))
    return banderas.sort((a, b) => a.nombre.localeCompare(b.nombre, 'es'))
  },
})
