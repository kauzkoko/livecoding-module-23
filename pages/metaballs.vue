<template>
  <div>
    <canvas
      class="transform-gpu scale-200"
      :style="{ canvasStyle }"
      id="canvasId"
    ></canvas>
  </div>
</template>

<script setup>
import initMetaballs from "metaballs-js";

const canvasStyle = { width: "720px", height: "480px" };

const options = {
  numMetaballs: 500,
  minRadius: 3,
  maxRadius: 3,
  speed: 10.0,
  color: "#000000",
  backgroundColor: "#ffffff",
  useDevicePixelRatio: true,
};

onMounted(() => {
  const cssSelector = "#canvasId";
  initMetaballs(cssSelector, options);
});
</script>
