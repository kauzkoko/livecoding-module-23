<template>
  <div>
    <div
      v-for="n in 6"
      :id="`drag-${n}`"
      class="draggable flex justify-center items-center"
      ref="allRefs"
    >
      <div class="flex items-center justify-center">
        <!-- <img
          src="/habitat-50.png"
          class="aspect-1 absolute"
          :style="{
            width: `${attractiveBodiesData[n - 1].size * 2 - 40}px`,
          }"
        /> -->
        <div
          class="aspect-1 absolute bg-black rounded-full"
          :style="{
            width: `${attractiveBodiesData[n - 1].size * 2 - 40}px`,
          }"
        />
        <img
          src="/test.png"
          class="absolute"
          :style="{ width: 200 / 2 + 'px', height: 200 / 2 + 'px' }"
        />
      </div>
    </div>
    <div class="pointer-events-none! fixed" id="p5" />

    <div>
      <input
        type="range"
        v-model="attractionValue"
        min="1000000"
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
import { p } from "@antfu/utils";
const attractionValue = shallowRef(10000000);
let width = 3840 / 2;
let height = 2160 / 2;
let minSize = 200 / 2;

let randomValues = [];
for (let i = 0; i < 6; i++) {
  randomValues.push({
    x: 101 + Math.floor(Math.random() * (width - 202)),
    y: 101 + Math.floor(Math.random() * (height - 202)),
  });
}
let attractiveBodiesData = [
  {
    id: "drag-1",
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
    id: "drag-2",
    size: minSize,
    amount: 200,
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
    id: "drag-3",
    size: minSize + 30,
    amount: 200,
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
    id: "drag-4",
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
    id: "drag-5",
    size: minSize + 200,
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
    id: "drag-6",
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

let bodies = [];
const allRefs = ref([]);
onMounted(() => {
  allRefs.value.forEach((element, index) => {
    element.style.transform = `translate(${attractiveBodiesData[index].newPosition.x}px, ${attractiveBodiesData[index].newPosition.y}px)`;
    element.setAttribute(
      "data-x",
      attractiveBodiesData[index].newPosition.x - 25
    );
    element.setAttribute(
      "data-y",
      attractiveBodiesData[index].newPosition.y - 25
    );
  });

  interact(".draggable").draggable({
    listeners: {
      move: dragMoveListener,
    },
  });

  function dragMoveListener(event) {
    var target = event.target;
    let index = attractiveBodiesData.findIndex((obj) => obj.id === target.id);
    let x = (parseFloat(target.getAttribute("data-x")) || 0) + event.dx;
    let y = (parseFloat(target.getAttribute("data-y")) || 0) + event.dy;
    if (x < width - 100 && x > 100 && y < height - 100 && y > 100) {
      attractiveBodiesData[index].newPosition.x = x;
      attractiveBodiesData[index].newPosition.y = y;
      target.style.transform = "translate(" + x + "px, " + y + "px)";
      target.setAttribute("data-x", x);
      target.setAttribute("data-y", y);
    }
  }
  window.dragMoveListener = dragMoveListener;

  use(MatterAttractors);
  let engine = Engine.create();

  let sketch = (p5) => {
    p5.setup = () => {
      let canvas = p5.createCanvas(width, height);
      canvas.parent("p5");
      p5.noStroke();
    };

    p5.draw = () => {
      p5.clear();
      bodies = Composite.allBodies(engine.world);
      for (let i = 0; i < bodies.length; i++) {
        if (bodies[i].biom) {
          attractiveBodiesData[bodies[i].biom - 1].position = {
            x: bodies[i].position.x,
            y: bodies[i].position.y,
          };
        } else if (!bodies[i].attractedTo) {
          p5.strokeWeight(1);
          p5.fill(255);
          p5.ellipse(bodies[i].position.x, bodies[i].position.y, 40);
        } else {
          p5.noStroke();
          p5.stroke(0);
          p5.fill(0);
          p5.ellipse(bodies[i].position.x, bodies[i].position.y, 40);
        }
      }
    };
  };
  new p5(sketch);

  var world = engine.world;
  world.gravity.scale = 0;

  const wallThickness = 1000;
  const ground = Bodies.rectangle(
    width / 2,
    height + wallThickness / 2,
    width,
    wallThickness,
    {
      isStatic: true,
    }
  );
  const ceiling = Bodies.rectangle(
    width / 2,
    0 - wallThickness / 2,
    width,
    wallThickness,
    {
      isStatic: true,
    }
  );
  const leftWall = Bodies.rectangle(
    0 - wallThickness / 2,
    height / 2,
    wallThickness,
    height,
    {
      isStatic: true,
    }
  );
  const rightWall = Bodies.rectangle(
    width + wallThickness / 2,
    height / 2,
    wallThickness,
    height,
    {
      isStatic: true,
    }
  );

  World.add(engine.world, [ground, ceiling, leftWall, rightWall]);

  let attractors = [];
  for (let i = 0; i < 6; i++) {
    attractors.push(
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
    World.add(world, attractors[i]);
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
    attractiveBodiesData.forEach((element, index) => {
      Body.translate(attractors[index], {
        x:
          (attractiveBodiesData[index].newPosition.x -
            attractiveBodiesData[index].position.x +
            25) *
          0.25,
        y:
          (attractiveBodiesData[index].newPosition.y -
            attractiveBodiesData[index].position.y +
            25) *
          0.25,
      });
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
#drag-2,
#drag-3,
#drag-4,
#drag-5,
#drag-6 {
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
