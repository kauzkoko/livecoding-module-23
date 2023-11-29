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
    <!-- <input type="range" v-model="rotation" min="0" max="720" step="10" /> -->
  </div>
</template>

<script setup>
const { x: mouseX, y: mouseY } = useMouse();
const { width: windowWidth, height: windowHeight } = useWindowSize();
useTextEllipse({
  text: "hello",
  x: windowWidth.value / 2,
  y: windowHeight.value / 2,
  r: 500,
});
</script>
