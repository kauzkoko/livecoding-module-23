<template>
  <div class="flex justify-between w-full h-screen mr-1000">
    <div
      class="w-10 transform-gpu scale-$scale bg-blue-500 h-full heightMarg"
    ></div>
    <div class="w-4 bg-green-500 h-full"></div>
    <div class="w-4 bg-red-500 h-full"></div>
    <div class="w-4 bg-orange-500 h-full"></div>
    <div class="w-4 bg-teal-500 h-full"></div>
    <div class="w-4 bg-purple-500 h-full"></div>
    <div class="w-4 bg-pink-500 h-full"></div>
    <div class="w-4 bg-yellow-500 h-full"></div>
  </div>
</template>

<script>
const scale = css("scale", 1);
const color = css("color", "yellow");
const width = css("width", "yellow");

const { data } = useWebSocket("ws://localhost:8081");
const parsed = computed(() => {
  if (data.value) {
    let parsed = JSON.parse(data.value);
    console.log(parsed);
    if (parsed.from === "strudel") return parsed;
  }
  return "";
});

watch(parsed, (p) => {
  if (p.s === "bd") {
    color.value = "red";
    scale.value = 0.8;
  } else if (p.s === "sd") {
    scale.value = 1.5;
    color.value = "pink";
  } else {
    scale.value = 1;
    color.value = "orange";
  }
});
</script>

<style>
div {
  /* animation: shake 0s linear infinite; */
}
@keyframes shake {
  0% {
    transform: translate(1px, 1px) rotate(0deg);
  }
  10% {
    transform: translate(-1px, -2px) rotate(-1deg);
  }
  20% {
    transform: translate(-3px, 0px) rotate(1deg);
  }
  30% {
    transform: translate(3px, 2px) rotate(0deg);
  }
  40% {
    transform: translate(1px, -1px) rotate(1deg);
  }
  50% {
    transform: translate(-1px, 2px) rotate(-1deg);
  }
  60% {
    transform: translate(-3px, 1px) rotate(0deg);
  }
  70% {
    transform: translate(3px, 1px) rotate(-1deg);
  }
  80% {
    transform: translate(-1px, -1px) rotate(1deg);
  }
  90% {
    transform: translate(1px, 2px) rotate(0deg);
  }
  100% {
    transform: translate(1px, -2px) rotate(-1deg);
  }
}
</style>
