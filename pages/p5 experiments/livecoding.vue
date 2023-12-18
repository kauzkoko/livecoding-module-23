<template>
  <div>
    <div id="p5" />
    <button @click="change()"></button>
  </div>
</template>

<script setup>
import {
  Engine,
  Render,
  Runner,
  Bodies,
  Composite,
  World,
  Events,
  Mouse,
  Common,
  Body,
} from "matter-js";
let width = 3840 / 4;
let height = 2160 / 4;
let minSize = 40;
let size = 50;
let bodies;

onMounted(() => {
  let engine = Engine.create();
  let sketch = (p5) => {
    p5.setup = () => {
      let canvas = p5.createCanvas(width, height);
      canvas.parent("p5");
      p5.noStroke();
    };

    p5.draw = () => {
      p5.background(0);
      p5.fill(255);
      bodies = Composite.allBodies(engine.world);
      for (let i = 0; i < bodies.length; i++) {
        p5.fill(160);
        p5.ellipse(bodies[i].position.x, bodies[i].position.y, size * 2);
      }
    };
  };
  new p5(sketch);

  let world = engine.world;
  // world.gravity.scale = 0;

  let thickness = 100;
  Composite.add(world, [
    // walls
    Bodies.rectangle(width / 2, 0 - thickness / 2, height, thickness, {
      isStatic: true,
    }),
    Bodies.rectangle(width / 2, height + thickness / 2, width, thickness, {
      isStatic: true,
    }),
    Bodies.rectangle(width + thickness / 2, height / 2, thickness, height, {
      isStatic: true,
    }),
    Bodies.rectangle(0 - thickness / 2, height / 2, thickness, height, {
      isStatic: true,
    }),
  ]);

  for (let j = 0; j < 30; j++) {
    let body = Bodies.circle(
      Common.random(0, width),
      Common.random(0, height),
      size
    );
    World.add(world, body);
  }

  var runner = Runner.create();
  Runner.run(runner, engine);
});

const change = () => {
  bodies[10].setScale(2);
  console.log(bodies[10]);
};
</script>

<style scoped></style>
