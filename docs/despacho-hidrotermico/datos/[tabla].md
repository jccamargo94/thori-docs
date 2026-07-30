---
editLink: false
---

# {{ $params.titulo }}

<p><code>{{ $params.nombre }}</code> · sección {{ $params.manual }} del manual de base de datos</p>

{{ $params.descripcion }}

## Campos

<CamposTabla :campos="$params.campos" />
