// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  ssr: false,
  unocss: {
    shortcuts: [
      { flexCenter: "flex justify-center items-center" },
      { diff: "mix-blend-difference" },
      { normal: "mix-blend-normal" },
      {
        circle:
          "bg-white w-100px aspect-1 rounded-full transition-all duration-200",
      },
      {
        smallCircle:
          "bg-white w-100px aspect-1 rounded-full transition-all duration-200",
      },
      {
        smallerCircle:
          "bg-white w-90% aspect-1 rounded-full transition-all duration-200",
      },
      {
        largeCircle:
          "bg-white w-300px aspect-1 rounded-full transition-all duration-200",
      },
      {
        wrapper: "w-screen h-screen overflow-hidden bg-black",
      },
      {
        dashy: "border-black border-dashed border-5px",
      },
    ],
  },
  supabase: {
    redirect: false,
  },
  modules: ["@unocss/nuxt", "@vueuse/nuxt", "@nuxtjs/supabase"],
  app: {
    head: {
      script: [
        {
          src: "/p5.min.js",
        },
      ],
    },
  },
});
