<template>
  <div w-screen h-screen>
    <div class="w-100px h-100px bg-blue square transform-gpu translate--50%">
      animejsv4
    </div>
  </div>
</template>

<script setup>
import {
  animate,
  stagger,
  createAnimatable,
  utils,
} from "@juliangarnierorg/anime-beta";

const { x, y } = useMouse();
onMounted(() => {
  // utils.set(".square", {
  //   x: "-50%",
  //   y: "-50%",
  // });
  const square = createAnimatable(".square", {
    x: {
      duration: 300,
    },
    y: {
      duration: 300,
    },
    rotate: 0,
    ease: "out(3)",
  });

  watch([x, y], () => {
    square.x.to(x.value - utils.get(".square", "width", false) / 2);
    square.y.to(y.value - utils.get(".square", "height", false) / 2);
  });
});
</script>
