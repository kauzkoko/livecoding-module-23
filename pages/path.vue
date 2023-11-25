<template>
  <div id="container" w-screen h-screen overflow-hidden flexCenter>
    <input type="range" v-model="rotation" min="0" max="720" step="10" />
  </div>
</template>

<script setup>
import { SVG } from "@svgdotjs/svg.js";
const rotation = ref(0);
let text;
var x = 150,
  y = 150,
  r = 75;
onMounted(() => {
  var draw = SVG().addTo("#container").size(300, 300);

  let circlePath;
  circlePath = draw.path(
    `M ${x},${y} m -${r},0 a ${r},${r} 0 1,0 ${2 * r},0 a ${r},${r} 0 1,0 -${
      2 * r
    },0`
  );
  circlePath.fill("none").stroke({ color: "#f06", width: 1 });
  circlePath.attr("id", "circlePath");

  var textpath = draw.textPath("Some Text along a path", circlePath, {
    startOffset: "50%",
  });

  var textpath2 = draw.textPath("Some Text along a path", circlePath, {
    startOffset: "50%",
  });
  console.log(textpath2);

  circlePath.plot(
    `M ${x},${y} m -${r},0 a ${r},${r} 0 1,1 ${2 * r},0 a ${r},${r} 0 1,1 -${
      2 * r
    },0`
  );

  text = draw.text(function (add) {
    add.tspan("sdfasddf");
  });

  let textPath = text.path(circlePath);
  textPath.tspan(textPath);

  text.rotate(rotation.value, x, y);

  // Adjust the startOffset if needed
  textpath.attr("startOffset", "25%");
});

watch(rotation, (newVal) => {
  text.rotate(rotation.value, x, y);
});
</script>
