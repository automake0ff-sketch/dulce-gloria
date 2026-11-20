# Dulce Gloria — Demo

## Fix 3D (nov 2026)
**Causa:** `THREE.CapsuleGeometry` no existe en Three.js **r128** (añadida en r133). Al construir drips de chocolate el build fallaba y el loader se quedaba en «Cargando modelo…».

**Solución:** drips con `CylinderGeometry`; carga dual CDN; estados loading/ok/error + reintentar; tamaño mínimo del contenedor.

## Fotos
- Galería/hero: dulcegloria.com (oficiales)
- Por producto: mapa `PRODUCT_PHOTOS` en `app.js` (vacío hasta verificación 1:1)

## Deploy
Vercel / GitHub Pages — branch `main`
