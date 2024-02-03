<template>
  <div class="wrapper flexCenter bg-red">
    <div
      class="circle w-100vh mix-blend-difference bg-gradient-to-tr from-green-500 to-red-500 flexCenter"
    >
      <div
        class="circle w-80% mix-blend-difference bg-gradient-to-tr from-blue-500 to-green-500 grid grid-cols-9"
      >
        <div
          v-for="n in 81"
          class="aspect-1 bg-gradient-to-tr from-blue-500 to-green-500 mix-blend-difference"
        >
          <div v-for="n in Math.floor(Math.random() * 3)" class="line"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { animate, stagger } from "@juliangarnierorg/anime-beta";

onMounted(() => {
  animate(".line", {
    translateX: 320,
    rotate: { from: -180 },
    duration: 1250,
    delay: stagger(65, { from: "center" }),
    ease: "inOutQuint",
    loop: true,
    alternate: true,
  });
});
</script>
