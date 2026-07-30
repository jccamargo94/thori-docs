import { describe, expect, it } from 'vitest'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { parse } from 'yaml'
import { BanderaSchema } from './bandera.mts'

const ruta = fileURLToPath(new URL('../content/banderas.yaml', import.meta.url))
const banderas = parse(readFileSync(ruta, 'utf-8'))

describe('catálogo de banderas', () => {
  it('están las 29 banderas del manual', () => {
    expect(banderas).toHaveLength(29)
  })

  it.each(banderas)('$nombre cumple el esquema', (b) => {
    expect(() => BanderaSchema.parse(b)).not.toThrow()
  })

  it('no hay nombres repetidos', () => {
    const nombres = banderas.map((b) => b.nombre)
    expect(new Set(nombres).size).toBe(nombres.length)
  })

  it('ningún texto menciona DHOG ni RIGHTSIDE', () => {
    const texto = JSON.stringify(banderas)
    expect(texto).not.toMatch(/DHOG/i)
    expect(texto).not.toMatch(/RIGHTSIDE/i)
  })
})

describe('el esquema rechaza datos inválidos', () => {
  const valida = {
    nombre: 'EJEMPLO',
    descripcion: 'Una bandera de ejemplo para probar el esquema.',
    familia: 'ejecucion',
    estado: 'sin-verificar',
    valores: [{ valor: '0', significado: 'Inactiva.' }],
  }

  it('acepta la bandera de ejemplo', () => {
    expect(BanderaSchema.safeParse(valida).success).toBe(true)
  })

  it.each([
    ['nombre en minúsculas', { ...valida, nombre: 'ejemplo' }],
    ['estado fuera del enum', { ...valida, estado: 'revisado' }],
    ['sin valores', { ...valida, valores: [] }],
    ['descripción vacía', { ...valida, descripcion: '' }],
    ['familia vacía', { ...valida, familia: '' }],
    ['valor sin significado', { ...valida, valores: [{ valor: '0', significado: '' }] }],
  ])('rechaza: %s', (_caso, datos) => {
    expect(BanderaSchema.safeParse(datos).success).toBe(false)
  })
})
