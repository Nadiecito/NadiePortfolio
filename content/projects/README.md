# Cómo agregar o quitar proyectos del portafolio

Cada archivo `.md` en esta carpeta se convierte en una tarjeta en la galería.

## Agregar un proyecto

Crea un archivo con nombre como `009-mi-proyecto.md` (usa prefijo numérico para controlar el orden) con esta estructura:

```markdown
---
title: "Título del proyecto"
type: "image"          # image | gif | video
image: "assets/work/mi-imagen.png"
link: "https://..."    # opcional — si la tarjeta debe ser clickeable
caption_en: "English caption"
caption_es: "Descripción en español"
---

Descripción larga opcional (no aparece en el sitio, solo como nota tuya).
```

## Quitar un proyecto

- Borra el archivo `.md`, o
- Agrega `draft: true` al frontmatter para ocultarlo sin borrar el archivo

## Aplicar cambios

Después de agregar/quitar/editar archivos, corre:

```bash
npm run build
```

Esto regenera la sección de galería en `index.html`.

## Tipos de media

- `type: "image"` — PNG, JPG, WebP, SVG
- `type: "gif"` — GIF animado (< 2MB idealmente)
- `type: "video"` — MP4 (usa `<video autoplay loop muted>`)

Si el archivo de imagen no existe, la tarjeta muestra el placeholder `⌐◨-◨` automáticamente.
