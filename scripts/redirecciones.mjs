// GitHub Pages no tiene redirects de servidor. Cuando una tabla se renombra, su URL viejo
// ya está publicado y compartido: la única vía estática es dejar una página con meta
// refresh en el id viejo. Vive en su propio módulo para que el test lo importe sin
// disparar los efectos del generador, que borra y reescribe el directorio de salida.
export const REDIRECCIONES = {
  curvasfc: 'ecuacionesfc',
}
