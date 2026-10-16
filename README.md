# Escudo medieval interactivo

Modelo original del usuario, texturizado en Blender y presentado con Google `<model-viewer>` 4.4.0. HTML, CSS y JavaScript sin compilación ni servicios externos en tiempo de ejecución.

## Abrir localmente

Desde esta carpeta, con Python instalado:

```sh
python -m http.server 8000
```

Abrir <http://localhost:8000>. Utiliza un servidor HTTP; abrir `index.html` con `file://` puede bloquear la carga del GLB.

## Los tres botones

1. **Cambiar acabado:** alterna limpio/desgastado. El desgaste se representa mediante mayor rugosidad y oscurecimiento PBR; conserva la variación de las texturas horneadas.
2. **Cambiar color del metal:** alterna bronce/cobre exclusivamente en el borde metálico, sin cambiar su metalicidad.
3. **Activar/desactivar normal map:** retira o restaura la textura normal original del bronce. Acercarse al borde permite apreciar mejor el grano.

Los botones se habilitan tras `load`. Los ocho estados se calculan desde los valores originales; restauran colores, rugosidad y referencias de textura sin acumular cambios. Se pueden combinar en cualquier orden. Arrastrar gira la cámara; rueda o pellizco cambia la distancia.

## Archivos

- `source/escudo_medieval_pbr.blend`: copia final con los doce mapas incorporados y una iluminación de estudio.
- `assets/escudo_medieval.glb`: modelo listo para web, 3.373 triángulos, aproximadamente 2,83 MB, tres materiales y nueve imágenes incorporadas. Roughness y Metallic comparten canales G y B dentro del GLB.
- `assets/textures/`: Base Color, Roughness, Metallic y Normal por material; 1024 × 1024 para madera/bronce y 512 × 512 para cuero.
- `index.html`, `styles.css`, `app.js`, `favicon.svg`: página y controles.
- `vendor/`: copia local de model-viewer y su licencia Apache 2.0.
- `source/*report.json`, `source/verification-blend.json`, `verification/`: informes de revisión.

## Modelo y materiales

El archivo recibido no contenía materiales. Referenciaba `escudo.png`, una imagen externa no incorporada y ausente; no fue posible recuperar su apariencia. Se eligieron madera, bronce y cuero para las tres piezas existentes, sin añadir emblemas ni sustituir el modelo.

Se conservó intacto el archivo original. La copia se centró y escaló uniformemente hasta aproximadamente 0,99 m de alto y 0,64 m de ancho, como decisión de presentación. La separación de las piezas se mantuvo. El agarre tenía caras degeneradas y UV colapsadas en superficies creadas por modificadores: se aplicó su geometría evaluada, se limpiaron duplicados/caras de área despreciable y se rehízo su UV. Las posiciones finales difieren menos de 0,000001 m de la superficie evaluada original, descontando la transformación uniforme. Cuerpo y borde mantienen sus modificadores de subdivisión; la exportación usa nivel 1 para web.

Los materiales procedurales se hornearon con Cycles. Base Color usa sRGB; Roughness, Metallic y Normal usan Non-Color. El normal map usa espacio tangente y un nodo Normal Map. Se exportaron tangentes para mantener el sombreado entre aplicaciones. El GLB excluye cámara y luces.

## Verificación

Ver [VERIFICACION.md](VERIFICACION.md). Khronos glTF Validator: **0 errores, 0 advertencias**. Chrome: carga, ocho combinaciones, restauración, clics repetidos, cámara, móvil/escritorio y subruta de Pages verificados, sin errores JavaScript ni solicitudes fallidas.

## Publicación y GitHub Pages

- **Repositorio:** <https://github.com/BlenderVIC/Modelo-3D-interactivo-para-web>
- **Sitio web interactivo:** <https://blendervic.github.io/Modelo-3D-interactivo-para-web/>

El proyecto está preparado para servirse directamente desde la raíz de la rama `main` en GitHub Pages mediante `.nojekyll` y rutas relativas.

## Referencias

- [API y documentación oficial de model-viewer](https://modelviewer.dev/docs/)
- [Ejemplos oficiales de materiales](https://modelviewer.dev/examples/scenegraph/)
- [Interfaz oficial utilizada, versión 4.4.0](https://github.com/google/model-viewer/blob/v4.4.0/packages/model-viewer/src/features/scene-graph/api.ts)
- [Khronos glTF Validator](https://github.com/KhronosGroup/glTF-Validator)

La licencia de model-viewer se incluye en `vendor/model-viewer.LICENSE`. No se presupone ni modifica la titularidad del modelo proporcionado por el usuario.
