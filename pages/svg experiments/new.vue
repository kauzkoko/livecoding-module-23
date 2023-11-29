<template>
  <div id="new-container" w-screen h-screen overflow-hidden flexCenter>
    <svg
      id="mySvg"
      :width="windowWidth + 'px'"
      :height="windowHeight + 'px'"
      class="fixed left-0 top-0"
    >
      <g filter="url(#metaballFilter)">
        <circle
          ref="el"
          id="circle"
          :cx="(windowWidth / 9) * 3 - windowWidth / 18"
          :cy="mouseY"
          :r="300"
          fill="red"
          class="transition-all duration-0"
        />
        <circle
          :cx="(windowWidth / 9) * 3 - windowWidth / 18"
          :cy="windowHeight / 2"
          :r="100"
          fill="blue"
        />
        <circle
          :cx="windowWidth / 2"
          :cy="windowHeight / 2"
          :r="500"
          fill="transparent"
          stroke="black"
        />
      </g>
    </svg>
    <input type="range" v-model="rotation" min="0" max="720" step="10" />
  </div>
</template>

<script setup>
import { SVG } from "@svgdotjs/svg.js";
const { x: mouseX, y: mouseY } = useMouse();
const { width: windowWidth, height: windowHeight } = useWindowSize();

const rotation = ref(0);
let text;
var x = windowWidth.value / 2,
  y = windowHeight.value / 2,
  r = 500;

on;

setInterval(() => {
  text.rotate(0.05, x, y);
}, 33);

onMounted(() => {
  var draw = SVG("#mySvg");

  let circlePath;
  circlePath = draw.path(
    `M ${x},${y} m -${r},0 a ${r},${r} 0 1,0 ${2 * r},0 a ${r},${r} 0 1,0 -${
      2 * r
    },0`
  );
  circlePath.fill("none").stroke({ color: "transparent", width: 0 });
  circlePath.attr("id", "circlePath");
  circlePath.plot(
    `M ${x},${y} m -${r},0 a ${r},${r} 0 1,1 ${2 * r},0 a ${r},${r} 0 1,1 -${
      2 * r
    },0`
  );

  text = draw.text(function (add) {
    add.tspan("sdfasddf");
  });

  let textPath = text.path(circlePath);
  textPath.tspan("5fsfs");
  text.rotate(rotation.value, x, y);
  textPath.attr("startOffset", "25%");
});
</script>
