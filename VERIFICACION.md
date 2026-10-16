# Verificación de la entrega

Fecha: 16 de octubre de 2026.

| Comprobación | Resultado |
| --- | --- |
| Archivo original | No modificado; SHA-256 en `source/verification-blend.json` |
| Forma y proporciones | Conservadas mediante una transformación uniforme; comparación de vértices evaluados con error máximo menor de 0,000001 m |
| UV | Sin triángulos UV degenerados en las tres mallas finales; corrección del agarre documentada |
| Mapas PBR | 12 PNG, 1024²/512²; empaquetados en el `.blend` |
| Espacios de color | Color sRGB; roughness/metallic/normal Non-Color |
| GLB | 3 mallas, 3 materiales, 3.373 triángulos, texturas incorporadas; sin cámara ni luces |
| Khronos glTF Validator 2.0.0-dev.3.10 | Cero errores y cero advertencias |
| Visor externo a Blender | GLB abierto y revisado visualmente en Chrome 155.0.8059.84 |
| Tres botones | Ocho combinaciones verificadas contra factores y referencias reales del material |
| Restauración | Colores y factores exactos; normal original restaurado; sin pérdida de texturas |
| Repetición | Tres rondas de doble pulsación por botón y restauración final |
| Cámara | Arrastre verificado; zoom de 2,1 m a aproximadamente 1,59 m |
| Escritorio | 1440 × 1100, revisión visual |
| Móvil | 390 × 844, emulación táctil, botones probados y sin desbordamiento horizontal |
| JavaScript / red | Sin errores de página, solicitudes fallidas ni respuestas HTTP 4xx/5xx durante las pruebas |
| GitHub Pages | Recursos probados bajo `/Modelo-3D-interactivo-para-web/` en servidor local |
| Publicación real | Subido a rama main y configurado en GitHub Pages |

Informes completos: `verification/browser-report.json`, `verification/gltf-validation.json`, `source/material-report.json` y `source/verification-blend.json`.

La prueba móvil es una emulación de Chrome, no una prueba en un teléfono físico. La iluminación de Blender y el entorno neutral del visor son distintos, pero comparten el mismo modelo y mapas PBR. El acabado desgastado utiliza cambios de propiedades PBR; no pretende recuperar una textura original ausente.
