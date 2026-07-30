import { describe, expect, it } from 'vitest'
import { readdirSync, readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { parse } from 'yaml'
import { FAMILIAS, TablaSchema } from './tabla.mts'
import { REDIRECCIONES } from '../scripts/redirecciones.mjs'

const dir = fileURLToPath(new URL('../content/tablas/', import.meta.url))
const archivos = readdirSync(dir).filter((f) => f.endsWith('.yaml'))
const tablas = archivos.map((f) => ({
  archivo: f,
  datos: parse(readFileSync(dir + f, 'utf-8')),
}))

describe('YAML de tablas', () => {
  it('están las 43 tablas del manual', () => {
    expect(archivos).toHaveLength(43)
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

describe('unidades documentadas', () => {
  const unidadesMd = readFileSync(
    fileURLToPath(new URL('../docs/despacho-hidrotermico/referencia/unidades.md', import.meta.url)),
    'utf-8',
  )
  const unidadesUsadas = [
    ...new Set(
      tablas.flatMap(({ datos }) => datos.campos.map((c: { unidad: string | null }) => c.unidad)),
    ),
  ].filter((u): u is string => u != null)

  // Ata unidades.md a los YAML: si aparece una unidad nueva en un campo y nadie le
  // agrega su sección, este test lo dice en vez de dejarlo pasar en silencio.
  it.each(unidadesUsadas)('la unidad %s tiene su sección en unidades.md', (unidad) => {
    expect(unidadesMd).toContain(`## ${unidad}`)
  })
})

describe('el esquema rechaza datos inválidos', () => {
  const valida = {
    id: 'ejemplo',
    nombre: 'ejemplo',
    familia: 'configuracion',
    titulo: 'Tabla de ejemplo',
    descripcion: 'Una tabla para probar el esquema.',
    estado: 'sin-verificar',
    manual: '1.1',
    campos: [
      {
        nombre: 'campo',
        tipo: 'string',
        unidad: null,
        requerido: true,
        descripcion: 'Un campo.',
        referencia: null,
      },
    ],
  }

  it('acepta el objeto de referencia', () => {
    expect(TablaSchema.safeParse(valida).success).toBe(true)
  })

  it.each([
    ['estado fuera del enum', { ...valida, estado: 'revisado' }],
    ['tipo de campo fuera del enum', { ...valida, campos: [{ ...valida.campos[0], tipo: 'float' }] }],
    ['familia fuera del enum', { ...valida, familia: 'inventada' }],
    ['id con mayúsculas', { ...valida, id: 'Ejemplo' }],
    ['sección de manual mal formada', { ...valida, manual: '1' }],
    ['campo sin descripción', { ...valida, campos: [{ ...valida.campos[0], descripcion: '' }] }],
    ['falta el campo requerido titulo', { ...valida, titulo: undefined }],
    ['sin campos pero con estado sin-verificar', { ...valida, campos: [] }],
    ['nombre en PascalCase', { ...valida, nombre: 'Ejemplo' }],
    ['id que no deriva del nombre', { ...valida, id: 'otracosa' }],
  ])('rechaza: %s', (_caso, datos) => {
    expect(TablaSchema.safeParse(datos).success).toBe(false)
  })

  it('acepta una tabla sin campos si declara no-implementado', () => {
    const sinCampos = { ...valida, campos: [], estado: 'no-implementado' }
    expect(TablaSchema.safeParse(sinCampos).success).toBe(true)
  })
})

describe('ecuacionesFC refleja el código, no el manual', () => {
  const porId = new Map(tablas.map((t) => [t.datos.id, t.datos]))

  it('curvasfc ya no existe: la reemplaza ecuacionesfc', () => {
    expect(porId.has('curvasfc')).toBe(false)
    expect(porId.has('ecuacionesfc')).toBe(true)
  })

  it('declara los seis campos que el optimizador consume', () => {
    const campos = porId.get('ecuacionesfc').campos.map((c: { nombre: string }) => c.nombre)
    expect(campos).toEqual([
      'recurso',
      'embalse',
      'escenario',
      'intercepto',
      'coeficientelineal',
      'coeficientecuadratico',
    ])
  })

  it('no se declara no-implementado: el modelo la usa', () => {
    expect(porId.get('ecuacionesfc').estado).toBe('difiere-v6')
  })
})

describe('redirects de páginas renombradas', () => {
  it('curvasfc redirige a ecuacionesfc', () => {
    expect(REDIRECCIONES.curvasfc).toBe('ecuacionesfc')
  })

  it('ningún destino apunta a una tabla que no existe', () => {
    const ids = new Set(tablas.map((t) => t.datos.id))
    for (const destino of Object.values(REDIRECCIONES)) expect(ids).toContain(destino)
  })

  it('ningún origen pisa una tabla viva', () => {
    const ids = new Set(tablas.map((t) => t.datos.id))
    for (const origen of Object.keys(REDIRECCIONES)) expect(ids).not.toContain(origen)
  })
})

describe('el nombre publicado es el nombre real del archivo', () => {
  it.each(tablas)('$archivo usa camelCase con inicial minúscula', ({ datos }) => {
    expect(datos.nombre).toMatch(/^[a-z][a-zA-Z0-9]*$/)
  })

  it.each(tablas)('$archivo tiene id igual a su nombre en minúsculas', ({ datos }) => {
    expect(datos.id).toBe(datos.nombre.toLowerCase())
  })
})
