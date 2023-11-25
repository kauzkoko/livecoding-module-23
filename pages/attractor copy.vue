<template>
  <div ref="div">
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script setup>
import {
  use,
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
import MatterAttractors from "matter-attractors";
const canvas = ref();

onMounted(() => {
  // install plugin
  use(
    MatterAttractors // PLUGIN_NAME
  );

  // create engine
  var engine = Engine.create();

  // create renderer
  var render = Render.create({
    canvas: canvas.value,
    engine: engine,
    options: {
      width: Math.min(document.documentElement.clientWidth, 1024),
      height: Math.min(document.documentElement.clientHeight, 1024),
      wireframes: false,
    },
  });

  // create runner
  var runner = Runner.create();

  Runner.run(runner, engine);
  Render.run(render);

  // create demo scene
  var world = engine.world;
  world.gravity.scale = 0;

  // create a body with an attractor
  var attractiveBody = Bodies.circle(
    render.options.width / 2,
    render.options.height / 2,
    50,
    {
      isStatic: true,

      // example of an attractor function that
      // returns a force vector that applies to bodyB
      plugin: {
        attractors: [
          function (bodyA, bodyB) {
            if (bodyB.isAttractable) {
              return {
                x: (bodyA.position.x - bodyB.position.x) * 1e-8,
                y: (bodyA.position.y - bodyB.position.y) * 1e-8,
              };
            }
          },
        ],
      },
    }
  );

  World.add(world, attractiveBody);

  // add some bodies that to be attracted
  for (var i = 0; i < 150; i += 1) {
    var body = Bodies.circle(
      Common.random(0, render.options.width),
      Common.random(0, render.options.height),
      10,
      {
        isAttractable: i % 2 ? true : false,
      }
    );

    World.add(world, body);
  }

  // add mouse control
  var mouse = Mouse.create(render.canvas);

  Events.on(engine, "afterUpdate", function () {
    if (!mouse.position.x) {
      return;
    }

    // smoothly move the attractor body towards the mouse
    Body.translate(attractiveBody, {
      x: (mouse.position.x - attractiveBody.position.x) * 0.25,
      y: (mouse.position.y - attractiveBody.position.y) * 0.25,
    });
  });
});
</script>
