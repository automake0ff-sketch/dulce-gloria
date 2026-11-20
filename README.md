# Dulce Gloria — Web comercial (v2)

Pastelería artesanal · Sevilla Este

## Demo
https://dulce-gloria.vercel.app/

## Fuentes oficiales
- Web: https://dulcegloria.com/
- Carta (Qamarero): https://r.qamarero.com/dulce-gloria
- Reservas (Qamarero): https://booking.qamarero.com/new-reservation/dulce-gloria
- Instagram: https://www.instagram.com/dulcegloriasweetsandcoffe/
- WhatsApp encargos: +34 652 02 06 42
- Dirección: Av. de Emilio Lemos, 26, 41020 Sevilla

## Arquitectura
Ver `ARCHITECTURE.md`.

## Archivos principales
| Archivo | Rol |
|---------|-----|
| `index.html` | Web pública |
| `app.js` | Catálogo orientativo, encargos WhatsApp |
| `cake3d.js` | Visor 3D **orientativo** (procedural; GLB pendiente) |
| `content-studio.html` | Herramienta offline de borradores RRSS (no publica) |
| `assets/models/` | Estructura para futuros GLB |
| `robots.txt` / `sitemap.xml` | SEO |

## Qamarero
Es la fuente de verdad de carta y reservas. **Esta web no sincroniza precios** con el TPV.

## 3D
Modelos procedurales = orientación visual.  
Producción fotorrealista: Blender → GLB en `assets/models/cakes/` (ver README en esa carpeta).

## Content Studio
Solo plantillas locales. Sin API keys. Sin publicación automática en Instagram.

## Despliegue
Estático en Vercel. No requiere backend ni variables secretas para la web pública.
