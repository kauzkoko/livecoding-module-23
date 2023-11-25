<template>
  <div>
    <div id="p5" />
    <div ref="drag1" id="drag-1" class="draggable"></div>
    <div ref="drag2" id="drag-2" class="draggable"></div>

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
const attractionValue = shallowRef(100000000);
let width = 3840 / 4;
let height = 2160 / 4;
let bodies;
let minSize = 40;
let randomValues = [];
for (let i = 0; i < 6; i++) {
  randomValues.push({
    x: Math.floor(Math.random() * width),
    y: Math.floor(Math.random() * height),
  });
}
let attractiveBodiesData = [
  {
    size: minSize + 80,
    amount: 200,
    position: {
      x: randomValues[0].x,
      y: randomValues[0].y,
    },
    newPosition: {
      x: randomValues[0].x,
      y: randomValues[0].y,
    },
  },
  {
    size: minSize + 30,
    amount: 100,
    position: {
      x: randomValues[1].x,
      y: randomValues[1].y,
    },
    newPosition: {
      x: randomValues[1].x,
      y: randomValues[1].y,
    },
  },
  {
    size: minSize + 30,
    amount: 100,
    position: {
      x: randomValues[2].x,
      y: randomValues[2].y,
    },
    newPosition: {
      x: randomValues[2].x,
      y: randomValues[2].y,
    },
  },
  {
    size: minSize + 20,
    amount: 40,
    position: {
      x: randomValues[3].x,
      y: randomValues[3].y,
    },
    newPosition: {
      x: randomValues[3].x,
      y: randomValues[3].y,
    },
  },
  {
    size: minSize + 100,
    amount: 400,
    position: {
      x: randomValues[4].x,
      y: randomValues[4].y,
    },
    newPosition: {
      x: randomValues[4].x,
      y: randomValues[4].y,
    },
  },
  {
    size: minSize,
    amount: 160,
    position: {
      x: randomValues[5].x,
      y: randomValues[5].y,
    },
    newPosition: {
      x: randomValues[5].x,
      y: randomValues[5].y,
    },
  },
];

const drag1 = ref();
const drag2 = ref();
onMounted(() => {
  drag2.value.style.transform = `translate(${
    attractiveBodiesData[1].newPosition.x - 25
  }px, ${attractiveBodiesData[1].newPosition.y - 25}px)`;
  drag2.value.setAttribute(
    "data-x",
    attractiveBodiesData[1].newPosition.x - 25
  );
  drag2.value.setAttribute(
    "data-y",
    attractiveBodiesData[1].newPosition.y - 25
  );

  interact(".draggable").draggable({
    listeners: {
      move: dragMoveListener,
    },
  });

  function dragMoveListener(event) {
    var target = event.target;
    var x = (parseFloat(target.getAttribute("data-x")) || 0) + event.dx;
    var y = (parseFloat(target.getAttribute("data-y")) || 0) + event.dy;
    attractiveBodiesData[1].newPosition.x = x;
    attractiveBodiesData[1].newPosition.x = y;
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

  let bodies = [];
  for (let i = 0; i < 6; i++) {
    bodies.push(
      Bodies.circle(
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
      )
    );
    World.add(world, bodies[i]);
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

  Events.on(engine, "afterUpdate", function () {
    if (!attractiveBodiesData[1].newPosition.x) {
      return;
    }
    // smoothly move the attractor body towards the mouse
    Body.translate(bodies[0], {
      x:
        (attractiveBodiesData[1].newPosition.x -
          attractiveBodiesData[1].position.x +
          25) *
        0.25,
      y:
        (attractiveBodiesData[1].newPosition.y -
          attractiveBodiesData[1].position.y +
          25) *
        0.25,
    });
  });

  var runner = Runner.create();
  Runner.run(runner, engine);
});
</script>

<style scoped>
input[type="range"] {
  width: 80vw;
}

#drag-1,
#drag-2 {
  background-color: red;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  touch-action: none;
  user-select: none;
  transform: translate(0px, 0px);
  position: fixed;
  top: 0;
  left: 0;
  cursor: auto !important;
}

#drag-2 {
  background-color: blue;
}
</style>
