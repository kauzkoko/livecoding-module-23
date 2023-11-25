<template>
  <div>
    <div
      ref="drag1"
      class="bg-yellow rounded-full w-100px h-100px fixed select-none"
      :style="style"
    >
      1
    </div>
    <div
      ref="drag2"
      class="bg-red rounded-full w-100px h-100px fixed select-none"
      :style="style2"
    >
      2
    </div>
  </div>
</template>

<script setup>
const drag1 = ref(null);
const drag2 = ref(null);

const { x, y, style } = useDraggable(drag1, {
  initialValue: { x: 40, y: 40 },
  preventDefault: true,
  pointerTypes: ["touch"],
  stopPropagation: true,
});

const {
  x: x2,
  y: y2,
  style: style2,
} = useDraggable(drag2, {
  initialValue: { x: 200, y: 200 },
  preventDefault: true,
  pointerTypes: ["touch"],
  stopPropagation: true,
});
</script>

<style>
html,
body {
  touch-action: none;
}
</style>
