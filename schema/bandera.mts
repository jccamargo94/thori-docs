import { z } from 'zod'
import { ESTADOS } from './tabla.mts'

export const BanderaSchema = z.object({
  nombre: z.string().regex(/^[A-Z0-9_]+$/),
  descripcion: z.string().min(1),
  familia: z.string().min(1),
  estado: z.enum(ESTADOS),
  valores: z
    .array(z.object({ valor: z.string().min(1), significado: z.string().min(1) }))
    .min(1),
})

export type Bandera = z.infer<typeof BanderaSchema>
