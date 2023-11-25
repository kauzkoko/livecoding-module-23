<template>
  <div id="container" w-screen h-screen overflow-hidden flexCenter></div>
</template>

<script setup>
import { SVG } from "@svgdotjs/svg.js";
onMounted(() => {
  var draw = SVG().addTo("#container").size(300, 300);
  var x = 150,
    y = 150,
    r = 75;

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

  // Adjust the startOffset if needed
  textpath.attr("startOffset", "25%");
});
</script>
