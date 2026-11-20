# Modelos 3D — Dulce Gloria

## Estado actual
La web usa modelos **procedurales orientativos** (Three.js) como fallback.
Los archivos GLB fotorrealistas **aún no están producidos**.

## Estructura prevista
```
cakes/
  matilda.glb
  redvelvet.glb
  lotus.glb
  oreo.glb
  pistacho-frambuesa.glb
  ferrero.glb
  selva.glb
  nata-fresa.glb
  choco-bosque.glb
  cheesecake.glb
textures/   # PBR: basecolor, normal, roughness (WebP)
previews/   # PNG/WebP de referencia por variedad
```

## Requisitos de producción (Blender)
- Geometría propia por variedad (no recoloreado de una sola malla).
- Capas visibles, coberturas y decoración características.
- Materiales PBR, polycount móvil ~5–15k tris por tarta.
- Export GLB embebido o texturas externas optimizadas.
- Naming: `cake_{id}.glb` alineado con `cakeTypes[].id` en app.js.

## Carga en runtime
`cake3d.js` intentará cargar `assets/models/cakes/{id}.glb`.
Si el archivo no existe o WebGL falla → fallback procedural + foto real.

## No afirmar
No presentar el procedural como “fotorrealista” ni como modelo final del negocio.
