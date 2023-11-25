<template>
  <div ref="div">
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script setup>
import { Engine, Render, Runner, Bodies, Composite } from "matter-js";
const canvas = ref();

onMounted(() => {
  console.log(canvas.value);
  console.log(Render);
  // create an engine
  var engine = Engine.create();

  // create a renderer
  var render = Render.create({
    canvas: canvas.value,
    // element: div.value,
    engine: engine,
  });

  // create two boxes and a ground
  var boxA = Bodies.rectangle(400, 200, 80, 80);
  var boxB = Bodies.rectangle(450, 50, 80, 80);
  var ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });

  // add all of the bodies to the world
  Composite.add(engine.world, [boxA, boxB, ground]);

  // run the renderer
  Render.run(render);

  // create runner
  var runner = Runner.create();

  // run the engine
  Runner.run(runner, engine);
});
</script>
