# Retrato da capa com poltrona

Imagem editada com a ferramenta integrada `image_gen`, em 24/10/2026, a partir do retrato fornecido pelo usuário. O topo do cabelo, o enquadramento inferior e a poltrona foram reconstruídos por IA, pois não estavam completos na referência.

- Original editado com transparência: `public/images/karin-hero-poltrona.png` (1024 × 1536).
- Variantes WebP com alpha preservado: `public/images/opt/karin-hero-poltrona-{480,720,1024}.webp`.
- Integração: `app/components/Hero.vue` e preload em `nuxt.config.ts`. A seção de consulta usa uma [pose alternativa](consulta-pose-alternativa.md) para evitar repetir o mesmo retrato.

## Prompt utilizado

```text
Use case: background-extraction with identity-preserve and outpainting. Edit the supplied portrait of this exact woman for her medical website hero. Preserve her identity very faithfully: same facial proportions, eyes, eyebrows, nose, smile and teeth, hairstyle and hair color, blush-pink blazer over black top, gold pearl earrings and gold pearl pendant necklace. Only soften the very saturated pink/magenta eye makeup and blush to a discreet natural professional rose-beige look; preserve natural skin texture. Widen and extend the original photo to show her entire head with a small clear margin above hair, her full seated pose, both hands naturally relaxed on lap, and the entire small upholstered blush/dusty rose armchair she is sitting on, including both armrests, seat, backrest and legs with room around all edges. Reconstruct cropped areas plausibly and conservatively. She is seated upright facing camera, warm smile same as reference; black trousers and understated closed black shoes. Chair should be a compact elegant rounded armchair, not a large sofa. Full woman and full chair visible, no parts clipped by canvas. Photorealistic professional studio portrait, retain source lighting on face, detailed natural hair strands, no excessive smoothing. Isolate ONLY the woman plus chair as a single cutout on a genuinely transparent alpha background, including transparent areas between chair legs. No room, floor, plants, wall, colored backdrop, text, logos, or watermark. Portrait composition suitable for the right column of a website hero.
```
