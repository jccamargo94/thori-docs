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

// Fuente única de los nombres legibles de familia: cualquier lugar que muestre una
// familia (el índice del modelo de datos, el explorador) consume este mapa en vez
// de imprimir el id crudo (`red-hidraulica`, etc.).
export const ETIQUETAS_FAMILIA: Record<(typeof FAMILIAS)[number], string> = {
  configuracion: 'Configuración',
  areas: 'Áreas operativas',
  bloques: 'Bloques',
  combustibles: 'Combustibles',
  'contratos-combustible': 'Contratos de combustible',
  periodos: 'Periodos',
  empresas: 'Empresas',
  'recursos-hidraulicos': 'Recursos hidráulicos',
  'recursos-termicos': 'Recursos térmicos',
  fechas: 'Fechas de entrada',
  'red-hidraulica': 'Red hidráulica',
  zonas: 'Zonas de seguridad',
  'recursos-no-convencionales': 'Recursos no convencionales',
  escenarios: 'Escenarios',
}

export const ESTADOS = ['vigente', 'difiere-v6', 'no-implementado', 'sin-verificar'] as const

export const CampoSchema = z.object({
  nombre: z.string().min(1),
  tipo: z.enum(['string', 'integer', 'double', 'boolean', 'date']),
  unidad: z.string().min(1).nullable(),
  requerido: z.boolean(),
  descripcion: z.string().min(1),
  referencia: z.string().regex(/^[a-z0-9]+\.[a-z0-9_]+$/).nullable(),
})

export const TablaSchema = z
  .object({
    id: z.string().regex(/^[a-z0-9]+$/),
    nombre: z.string().min(1),
    familia: z.enum(FAMILIAS),
    titulo: z.string().min(1),
    descripcion: z.string().min(1),
    estado: z.enum(ESTADOS),
    manual: z.string().regex(/^\d+\.\d+$/),
    campos: z.array(CampoSchema),
  })
  // Dos secciones del manual (7.3 y 8.4) declaran una tabla y dicen que no está
  // disponible, sin definir un solo campo. Inventar un campo placeholder para
  // satisfacer el esquema sería fabricar documentación; la única forma honesta de
  // representarlas es sin campos, y el estado tiene que decirlo.
  .refine((t) => t.campos.length > 0 || t.estado === 'no-implementado', {
    message: 'una tabla sin campos debe declarar estado: no-implementado',
    path: ['campos'],
  })

export type Campo = z.infer<typeof CampoSchema>
export type Tabla = z.infer<typeof TablaSchema>
