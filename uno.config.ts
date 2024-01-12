// uno.config.ts
import { defineConfig, presetAttributify, presetUno } from "unocss";
import { presetWebFonts, transformerDirectives } from "unocss";

export default defineConfig({
  presets: [
    presetAttributify({
      /* preset options */
    }),
    presetUno(),
    // ...custom presets
    presetWebFonts({
      provider: "bunny", // default provider
      fonts: {
        // these will extend the default theme
        sans: "Jost",
      },
    }),
  ],
  transformers: [transformerDirectives()],
});
