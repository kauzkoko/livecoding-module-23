<template>
  <div class="w-screen h-screen overflow-hidden flex">
    <canvas
      class="opacity-50"
      v-if="false"
      :style="{ width: width + 'px', height: height + 'px' }"
      ref="canvas"
    />
    <div
      class="bg-white"
      :style="{ width: width + 'px', height: height + 'px' }"
    >
      <div class="pointer-events-none! fixed" id="p5" />
    </div>
  </div>
</template>

<script setup>
import { Engine, Render, Runner, Bodies, Composite, Body } from "matter-js";
import { mul } from "~/public/jsm/nodes/Nodes";
const canvas = ref();

const { fragmentShader, vertexShader } = useShaders();

const { width: windowWidth, height: windowHeight } = useWindowSize();
const { x, y } = useMouse();

const props = defineProps({
  width: Number,
  height: Number,
});

let multiplier = 2;
let manualWidth = 720 * multiplier;
let manualHeight = 480 * multiplier;

let metaballShader;
let balls = [];
let width = manualWidth ?? props.width ?? windowWidth.value;
let height = manualHeight ?? props.height ?? windowHeight.value;
let bioms = [
  { x: (width / 5) * 5, y: height / 2, r: 10 },
  { x: (width / 5) * 4, y: height / 2, r: 20 },
  { x: (width / 5) * 3, y: height / 2, r: 30 },
  { x: (width / 5) * 2, y: height / 2, r: 10 },
  { x: (width / 5) * 1, y: height / 2, r: 40 },
];
let initBodies = [];
let allBodies = [];

onKeyStroke("ArrowDown", (e) => {
  e.preventDefault();
  Body.scale(allBodies[4], 1.01, 1.01);
});

onMounted(() => {
  var engine = Engine.create();
  bioms.forEach((biom, index) => {
    initBodies.push(Bodies.circle(biom.x, biom.y, biom.r, biom.r));
  });
  var ground = Bodies.rectangle(width / 2, height, width, 200, {
    isStatic: true,
  });

  Composite.add(engine.world, [...initBodies, ground]);
  var runner = Runner.create();
  Runner.run(runner, engine);

  allBodies = Composite.allBodies(engine.world);
  let sketch = (p5) => {
    p5.setup = () => {
      let canvas = p5.createCanvas(width, height, p5.WEBGL);
      canvas.parent("p5");
      metaballShader = p5.createShader(vertexShader, fragmentShader);
      p5.shader(metaballShader);
      for (let i = 0; i < bioms.length; i++) {
        balls.push(new Ball(bioms[i].x, bioms[i].y, bioms[i].r));
      }

      metaballShader.setUniform("width", width);
      metaballShader.setUniform("height", height);
    };

    p5.draw = () => {
      p5.clear();
      metaballShader.setUniform(
        "rs",
        balls.map((b, index) => allBodies[index].circleRadius * multiplier * 8)
      );
      metaballShader.setUniform(
        "xs",
        balls.map((b, index) => allBodies[index].position.x)
      );
      metaballShader.setUniform(
        "ys",
        balls.map((b, index) => height - allBodies[index].position.y)
      );
      p5.quad(-1, -1, 1, -1, 1, 1, -1, 1);
    };
  };
  new p5(sketch);
});

class Ball {
  constructor(x, y, r) {
    this.pos = {
      x: x,
      y: height - y,
    };

    this.r = r;
  }

  manualUpdate(x, y) {
    this.pos.x = x;
    this.pos.y = height - y;
  }
}
</script>
