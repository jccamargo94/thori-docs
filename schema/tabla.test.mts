import { describe, expect, it } from 'vitest'
import { readdirSync, readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { parse } from 'yaml'
import { FAMILIAS, TablaSchema } from './tabla.mts'

const dir = fileURLToPath(new URL('../content/tablas/', import.meta.url))
const archivos = readdirSync(dir).filter((f) => f.endsWith('.yaml'))
const tablas = archivos.map((f) => ({
  archivo: f,
  datos: parse(readFileSync(dir + f, 'utf-8')),
}))

describe('YAML de tablas', () => {
  it('hay al menos una tabla', () => {
    expect(archivos.length).toBeGreaterThan(0)
  })

  it.each(tablas)('$archivo cumple el esquema', ({ datos }) => {
    expect(() => TablaSchema.parse(datos)).not.toThrow()
  })

  it.each(tablas)('$archivo tiene id igual al nombre de archivo', ({ archivo, datos }) => {
    expect(datos.id).toBe(archivo.replace(/\.yaml$/, ''))
  })

  it('no hay ids repetidos', () => {
    const ids = tablas.map((t) => t.datos.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('toda familia usada es una familia declarada', () => {
    for (const { datos } of tablas) expect(FAMILIAS).toContain(datos.familia)
  })

  it('toda referencia apunta a una tabla y campo que existen', () => {
    const porId = new Map(tablas.map((t) => [t.datos.id, t.datos]))
    for (const { archivo, datos } of tablas) {
      for (const campo of datos.campos) {
        if (!campo.referencia) continue
        const [tablaId, campoNombre] = campo.referencia.split('.')
        const destino = porId.get(tablaId)
        expect(destino, `${archivo}: referencia a tabla inexistente ${tablaId}`).toBeDefined()
        expect(
          destino.campos.some((c) => c.nombre === campoNombre),
          `${archivo}: referencia a campo inexistente ${campo.referencia}`,
        ).toBe(true)
      }
    }
  })

  it('ninguna descripción menciona DHOG ni RIGHTSIDE', () => {
    for (const { archivo, datos } of tablas) {
      const texto = JSON.stringify(datos)
      expect(texto, `${archivo} menciona DHOG`).not.toMatch(/DHOG/i)
      expect(texto, `${archivo} menciona RIGHTSIDE`).not.toMatch(/RIGHTSIDE/i)
    }
  })
})
