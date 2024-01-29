<template>
  <div w-screen h-screen class="font-sans">
    <Zhdksvg />
  </div>
</template>

<script setup>
import { animate, stagger } from "@juliangarnierorg/anime-beta";

onMounted(() => {
  animate("#logo", {
    translateY: { to: -3000 },
    duration: 4000,
    ease: "easein",
  });

  animate("#energyball", {
    keyframes: [
      { translateY: 200, duration: 500 },
      { radius: 3, duration: 250, delay: 400 },
    ],
    ease: "out",
  });
});
</script>
