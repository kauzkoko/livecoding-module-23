<template>
  <div>
    <div>{{ x }}</div>
    <div
      ref="imthedivref"
      class="fixed transform-gpu text-50px bg-yellow w-20px h-20px rounded-full okay"
      :style="{
        transform: `translate(${x}px, 50px) scale(1) rotate(0deg))`,
      }"
    >
      jfkölsafasf
    </div>
  </div>
</template>

<script setup>
let imthedivref = ref();
let { play } = useAnimate(imthedivref, { transform: "rotate(360deg)" }, 1000);
let hans = ref("hans");
let test = ref(10);
const { x, y } = useMouse();
let computedTest = computed(() => test.value / 2 + "px");
setInterval(() => {
  test.value = "color: blue;";
}, 1000);

function chshs() {
  play();
  return "color: blue;";
}
</script>

<style>
.okay {
  font-size: v-bind(computedValue);
  font-size: 100;
}
</style>
