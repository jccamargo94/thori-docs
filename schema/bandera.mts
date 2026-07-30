import { z } from 'zod'
import { ESTADOS } from './tabla.mts'

export const FAMILIAS = [
  'areas',
  'demanda',
  'contratos',
  'combustible',
  'hidraulica',
  'termica',
  'zonas',
  'costos',
  'ejecucion',
] as const

export const BanderaSchema = z
  .object({
    nombre: z.string().regex(/^[A-Z0-9_]+$/),
    descripcion: z.string().min(1),
    familia: z.enum(FAMILIAS),
    estado: z.enum(ESTADOS),
    valores: z
      .array(z.object({ valor: z.string().min(1), significado: z.string().min(1) }))
      .min(1),
    // Una bandera activa no solo cambia el modelo: obliga a subir archivos que sin ella
    // sobran. Publicarlo acá, y no en la guía de carga, evita duplicar la lista en dos
    // lugares que se desincronizan. `fuente` importa porque las dos autoridades no
    // coinciden: hay archivos que el modelo necesita y el validador todavía no exige.
    archivos: z
      .array(
        z.object({
          tabla: z.string().regex(/^[a-z0-9]+$/),
          fuente: z.enum(['validador', 'modelo']),
          // Solo cuando la exigencia depende del valor de la bandera y no de que esté
          // activa. Omitido = lo exige cualquier valor distinto de 0. Sin esto la lista
          // mentiría en las dos direcciones: quien pone 1 creería que necesita el archivo
          // del 3, y al revés.
          valores: z.array(z.string().min(1)).min(1).optional(),
        }),
      )
      .default([]),
  })
  .refine(
    (b) =>
      b.archivos.every((a) =>
        (a.valores ?? []).every((v) => v !== '0' && b.valores.some((x) => x.valor === v)),
      ),
    {
      message: 'todo valor en archivos debe existir en valores de la bandera y no ser "0"',
      path: ['archivos'],
    },
  )

export type Bandera = z.infer<typeof BanderaSchema>
