<template>
  <div fixed left-100px top-100px bg-blue w-100px h-100px>fixasdfjasdf</div>
  <div bg-white w-screen h-screen>
    <div class="pointer-events-none! fixed" id="p5" />
  </div>
</template>

<script setup>
const { fragmentShader, vertexShader } = useShaders();

const { width: windowWidth, height: windowHeight } = useWindowSize();
const { x, y } = useMouse();

const props = defineProps({
  width: Number,
  height: Number,
});

let metaballShader;
let balls = [];
let width = props.width ?? windowWidth.value;
let height = props.height ?? windowHeight.value;
let bioms = [
  { x: (width / 5) * 5, y: height / 2, r: 200 },
  { x: (width / 5) * 4, y: height / 2, r: 500 },
  { x: (width / 5) * 3, y: height / 2, r: 1000 },
  { x: (width / 5) * 2, y: height / 2, r: 1500 },
  { x: (width / 5) * 1, y: height / 2, r: 500 },
];
const BASE_SPEED = 0.000000001;

onMounted(() => {
  let sketch = (p5) => {
    p5.setup = () => {
      let canvas = p5.createCanvas(width, height, p5.WEBGL);
      p5.setAttributes("antialias", true);
      canvas.parent("p5");
      metaballShader = p5.createShader(vertexShader, fragmentShader);
      p5.shader(metaballShader);
      for (let i = 0; i < bioms.length; i++) {
        balls.push(new Ball(bioms[i].x, bioms[i].y, bioms[i].r));
      }

      metaballShader.setUniform("width", width);
      metaballShader.setUniform("height", height);
      metaballShader.setUniform(
        "rs",
        balls.map((b) => b.r)
      );
    };

    p5.draw = () => {
      p5.clear();
      metaballShader.setUniform(
        "xs",
        balls.map((b) => b.pos.x)
      );
      metaballShader.setUniform(
        "ys",
        balls.map((b) => b.pos.y)
      );
      p5.quad(-1, -1, 1, -1, 1, 1, -1, 1);
      balls[0].manualUpdate(p5.mouseX, p5.mouseY);
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
