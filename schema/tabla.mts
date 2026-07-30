import { z } from 'zod'

export const FAMILIAS = [
  'configuracion',
  'areas',
  'bloques',
  'combustibles',
  'contratos-combustible',
  'periodos',
  'empresas',
  'recursos-hidraulicos',
  'recursos-termicos',
  'fechas',
  'red-hidraulica',
  'zonas',
  'recursos-no-convencionales',
  'escenarios',
] as const

export const ESTADOS = ['vigente', 'difiere-v6', 'no-implementado', 'sin-verificar'] as const

export const CampoSchema = z.object({
  nombre: z.string().min(1),
  tipo: z.enum(['string', 'integer', 'double', 'boolean', 'date']),
  unidad: z.string().min(1).nullable(),
  requerido: z.boolean(),
  descripcion: z.string().min(1),
  referencia: z.string().regex(/^[a-z0-9]+\.[a-z0-9_]+$/).nullable(),
})

export const TablaSchema = z.object({
  id: z.string().regex(/^[a-z0-9]+$/),
  nombre: z.string().min(1),
  familia: z.enum(FAMILIAS),
  titulo: z.string().min(1),
  descripcion: z.string().min(1),
  estado: z.enum(ESTADOS),
  manual: z.string().regex(/^\d+\.\d+$/),
  campos: z.array(CampoSchema).min(1),
})

export type Campo = z.infer<typeof CampoSchema>
export type Tabla = z.infer<typeof TablaSchema>
