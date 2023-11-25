<template>
  <button @click="resize()">show</button>
  <P5 id="hey" />
  <P5 id="goblin" />
</template>

<script setup>
const sketch1 = useP5((p5) => {
  p5.setup = () => {
    p5.createCanvas(400, 400);
  }

  p5.draw = () => {
    p5.background(0);
    p5.fill(255);
    p5.ellipse(p5.mouseX, p5.mouseY, 50, 50);
  }
}, "hey")

const resize = () => {
  sketch1.value.resizeCanvas(500, 500)
}
</script>