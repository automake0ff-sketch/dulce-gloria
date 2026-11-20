# Arquitectura Dulce Gloria v2

## Módulos
| Módulo | Ubicación | Rol |
|--------|-----------|-----|
| A Web pública | index.html + CSS | Marca, UX, SEO |
| B Destacados + Qamarero | app.js + enlaces | Carta/reservas oficiales |
| C Configurador 3D | cake3d.js + assets/models | Orientativo / futuro GLB |
| D Encargos WhatsApp | app.js order flow | Sin BD ni pagos |
| E Galería / vídeo | index secciones | Estructura + assets/video |
| F SEO / rendimiento | meta, robots, sitemap | Local Sevilla Este |
| G Content Studio | content-studio.html | Herramienta offline separada |

## Qamarero (fuente de verdad)
- Carta: https://r.qamarero.com/dulce-gloria
- Reservas: https://booking.qamarero.com/new-reservation/dulce-gloria
- **No hay API sincronizada** en este proyecto.
- Precios en app.js son orientativos / a confirmar; no se afirma sincronización.

## Despliegue
- Estático en Vercel.
- Content Studio no requiere backend; no incluye API keys.
- Futura integración Qamarero: documentar plan contratado + widget/API oficial si existe.

## Datos pendientes del negocio
Precios Signature, tamaños por variedad, horarios, legales, alérgenos, modelos GLB, vídeos reales, dominio canónico definitivo.
