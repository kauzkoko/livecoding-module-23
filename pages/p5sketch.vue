<template>
  <div>
    <P5 :sketch="sketch" />
  </div>
  <NuxtPage />
</template>

<script setup>
const sketch = (p5) => {
  p5.setup = () => {
    p5.createCanvas(400, 400);
  };

  p5.draw = () => {
    p5.background(0);
    p5.fill(255);
    p5.ellipse(p5.mouseX, p5.mouseY, 50, 50);
  };
};
</script>
