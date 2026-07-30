import { describe, expect, it } from 'vitest'
import { readFileSync, readdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { parse } from 'yaml'
import { BanderaSchema, FAMILIAS } from './bandera.mts'

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

  it('toda familia usada es una familia declarada', () => {
    for (const b of banderas) expect(FAMILIAS).toContain(b.familia)
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
    ['familia fuera del enum', { ...valida, familia: 'inventada' }],
    ['valor sin significado', { ...valida, valores: [{ valor: '0', significado: '' }] }],
    ['archivo con un valor que la bandera no documenta', { ...valida, archivos: [{ tabla: 'ejemplo', fuente: 'modelo', valores: ['9'] }] }],
  ])('rechaza: %s', (_caso, datos) => {
    expect(BanderaSchema.safeParse(datos).success).toBe(false)
  })
})

describe('archivos exigidos por cada bandera', () => {
  const idsTabla = new Set(
    readdirSync(fileURLToPath(new URL('../content/tablas/', import.meta.url)))
      .filter((f) => f.endsWith('.yaml'))
      .map((f) => f.replace(/\.yaml$/, '')),
  )

  it('AREAS exige areaBasica y areaPeriodo', () => {
    const areas = banderas.find((b) => b.nombre === 'AREAS')
    expect(areas.archivos.map((a) => a.tabla).sort()).toEqual(['areabasica', 'areaperiodo'])
  })

  it('todo archivo declarado apunta a una tabla que existe', () => {
    for (const b of banderas) {
      for (const a of b.archivos ?? []) {
        expect(idsTabla, `${b.nombre}: tabla inexistente ${a.tabla}`).toContain(a.tabla)
      }
    }
  })

  it('toda entrada declara de dónde salió', () => {
    for (const b of banderas) {
      for (const a of b.archivos ?? []) {
        expect(['validador', 'modelo']).toContain(a.fuente)
      }
    }
  })

  it('todo valor declarado en archivos existe entre los valores de la bandera', () => {
    for (const b of banderas) {
      for (const a of b.archivos ?? []) {
        for (const v of a.valores ?? []) {
          expect(v).not.toBe('0')
          expect(
            b.valores.some((x) => x.valor === v),
            `${b.nombre}: el archivo ${a.tabla} declara el valor ${v}, que la bandera no documenta`,
          ).toBe(true)
        }
      }
    }
  })
})
