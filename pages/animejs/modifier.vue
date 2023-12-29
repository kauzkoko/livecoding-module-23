<template>
  <div w-screen h-screen>
    <div class="w-100px h-100px bg-blue square">animejsv4</div>
  </div>
</template>

<script setup>
import { animate, stagger } from "@juliangarnierorg/anime-beta";

onMounted(() => {
  animate(".square", {
    translateX: { to: 300, modifier: (v) => v - 50 },
    // translateX: { to: 300, modifier: (v) => console.log(v) },
    rotate: { from: -180 },
    duration: 1250,
    delay: stagger(65, { from: "center" }),
    ease: "inOutQuint",
    loop: true,
    alternate: true,
  });
});
</script>
