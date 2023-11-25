<template>
  <div>
    <div id="p5" />
    <div
      v-for="token in attractiveBodiesData"
      class="fixed left-0 top-0"
      :style="{
        transform: `translate(${token.position.x - token.size}px, ${
          token.position.y - token.size
        }px)`,
      }"
    >
      <img
        src="/habitat-50.png"
        class="absolute rounded-full border-1px border-black border-solid"
        :style="{
          width: `${token.size * 2}px`,
          height: `${token.size * 2}px`,
        }"
      />
      <img
        class="w-50px h-50px"
        src="/token.png"
        :style="{
          transform: `translate(${token.size - 25}px, ${token.size - 25}px)`,
        }"
      />
    </div>

    <div>
      <input
        type="range"
        v-model="attractionValue"
        min="10000000"
        step="1000000"
        max="10000000000"
      />
    </div>
  </div>
</template>

<script setup>
import interact from "interactjs";
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
const attractionValue = shallowRef(10000000000);
let width = 3840 / 4;
let height = 2160 / 4;
let bodies;
let minSize = 40;
let attractiveBodiesData = [
  {
    size: minSize + 80,
    amount: 200,
    position: {
      x: Math.floor(Math.random() * width),
      y: Math.floor(Math.random() * height),
    },
  },
  {
    size: minSize + 30,
    amount: 100,
    position: {
      x: Math.floor(Math.random() * width),
      y: Math.floor(Math.random() * height),
    },
  },
  {
    size: minSize + 30,
    amount: 100,
    position: {
      x: Math.floor(Math.random() * width),
      y: Math.floor(Math.random() * height),
    },
  },
  {
    size: minSize + 20,
    amount: 40,
    position: {
      x: Math.floor(Math.random() * width),
      y: Math.floor(Math.random() * height),
    },
  },
  {
    size: minSize + 100,
    amount: 400,
    position: {
      x: Math.floor(Math.random() * width),
      y: Math.floor(Math.random() * height),
    },
  },
  {
    size: minSize,
    amount: 160,
    position: {
      x: Math.floor(Math.random() * width),
      y: Math.floor(Math.random() * height),
    },
  },
];

onMounted(() => {
  interact(".draggable").draggable({
    listeners: {
      move: dragMoveListener,
    },
  });

  function dragMoveListener(event) {
    var target = event.target;
    var x = (parseFloat(target.getAttribute("data-x")) || 0) + event.dx;
    var y = (parseFloat(target.getAttribute("data-y")) || 0) + event.dy;
    target.style.transform = "translate(" + x + "px, " + y + "px)";
    target.setAttribute("data-x", x);
    target.setAttribute("data-y", y);
  }
  window.dragMoveListener = dragMoveListener;

  use(MatterAttractors);
  let engine = Engine.create();

  let sketch = (p5) => {
    p5.setup = () => {
      let canvas = p5.createCanvas(width, height);
      canvas.parent("p5");
    };

    p5.draw = () => {
      p5.background(0);
      p5.fill(255);
      bodies = Composite.allBodies(engine.world);
      for (let i = 0; i < bodies.length; i++) {
        if (bodies[i].biom) {
          attractiveBodiesData[bodies[i].biom - 1].position = {
            x: bodies[i].position.x,
            y: bodies[i].position.y,
          };
        } else if (!bodies[i].attractedTo) {
          p5.fill(0, 255, 0);
          p5.ellipse(bodies[i].position.x, bodies[i].position.y, 5);
        } else {
          p5.fill(160);
          p5.ellipse(bodies[i].position.x, bodies[i].position.y, 5);
        }
      }
    };
  };
  new p5(sketch);

  var world = engine.world;
  world.gravity.scale = 0;

  for (let i = 0; i < 6; i++) {
    let body = Bodies.circle(
      attractiveBodiesData[i].position.x,
      attractiveBodiesData[i].position.y,
      attractiveBodiesData[i].size,
      {
        biom: i + 1,
        isStatic: true,
        plugin: {
          attractors: [
            function (bodyA, bodyB) {
              if (bodyB.attractedTo === i + 1) {
                return {
                  x:
                    (bodyA.position.x - bodyB.position.x) /
                    attractionValue.value,
                  y:
                    (bodyA.position.y - bodyB.position.y) /
                    attractionValue.value,
                };
              }
            },
          ],
        },
      }
    );
    World.add(world, body);
    for (let j = 0; j < attractiveBodiesData[i].amount; j++) {
      let body = Bodies.rectangle(
        Common.random(0, width),
        Common.random(0, height),
        4,
        4,
        {
          attractedTo: i + 1,
        }
      );
      World.add(world, body);
    }
  }
  // rest;
  for (let j = 0; j < 500; j++) {
    let body = Bodies.rectangle(
      Common.random(0, width),
      Common.random(0, height),
      4,
      4,
      { attractedTo: 0 }
    );
    World.add(world, body);
  }

  var runner = Runner.create();
  Runner.run(runner, engine);
});
</script>

<style scoped>
input[type="range"] {
  width: 80vw;
}

main canvas {
  position: fixed;
  top: 0;
  left: 0;
}
</style>
