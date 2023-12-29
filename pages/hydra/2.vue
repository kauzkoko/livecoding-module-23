<template>
  <div w-screen h-screen flexCenter>
    <canvas w-300px h-300px>come here </canvas>
  </div>
</template>

<script setup>
import Hydra from "hydra-synth";

onMounted(() => {
  const pb = new Hydra.PatchBay();
  const h = new Hydra({
    detectAudio: false,
    canvas: document.querySelector("canvas"),
    pb,
  });
  osc(4, 0.1, 1.2).out();
  pb.setName("lol");
});
</script>
