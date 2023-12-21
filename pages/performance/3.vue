<template>
  <div class="flex justify-between w-full h-screen mr-1000">
      <div class="w-10 transform-gpu scale-$scale bg-blue-500 h-full heightMarg"></div>
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