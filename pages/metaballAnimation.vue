<template>
  <div w-screen h-screen flexCenter @click="animate()">
    <div class="pointer-events-none! fixed" id="p5" />
  </div>
</template>

<script setup>
import { TransitionPresets } from "@vueuse/core";
const { fragmentShader, vertexShader } = useShaders();
const { width: windowWidth, height: windowHeight } = useWindowSize();
let width = 800;
let height = windowHeight.value;
let metaballShader;
let bioms = [
  { x: width / 2, y: 300, r: 200 },
  { x: width / 2, y: 1200, r: 100 },
];
let balls = [];
let multiplier = 2;

class Ball {
  constructor(x, y, r) {
    this.pos = {
      x: x,
      y: height - y,
    };

    this.r = r;
  }
}

const source = ref(bioms[1].y);
const output = useTransition(source, {
  duration: 1000,
  transition: TransitionPresets.linear,
  onFinished() {
    source.value = 1200;
  },
});

const animate = () => {
  console.log("animate");
  source.value = 300;
};

onMounted(() => {
  let sketch = (p5) => {
    p5.setup = () => {
      let canvas = p5.createCanvas(width, height, p5.WEBGL);
      canvas.parent("p5");
      metaballShader = p5.createShader(vertexShader, fragmentShader);
      p5.shader(metaballShader);

      balls = [];
      for (let i = 0; i < bioms.length; i++) {
        balls.push(new Ball(bioms[i].x, bioms[i].y, bioms[i].r));
      }

      metaballShader.setUniform("width", width);
      metaballShader.setUniform("height", height);
    };

    p5.draw = () => {
      bioms.forEach((biom, index) => {
        if (index === 1) {
          bioms[index].y = output.value;
        }
      });
      p5.clear();
      metaballShader.setUniform(
        "rs",
        balls.map((b, index) => bioms[index].r * multiplier * 8)
      );
      metaballShader.setUniform(
        "xs",
        balls.map((b, index) => bioms[index].x)
      );
      metaballShader.setUniform(
        "ys",
        balls.map((b, index) => height - bioms[index].y)
      );
      p5.quad(-1, -1, 1, -1, 1, 1, -1, 1);
    };
  };
  new p5(sketch);
});
</script>
