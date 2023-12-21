<template>
  <!-- <div class="flex justify-between w-full h-screen mr-1000">
      <div class="w-10 transform-gpu scale-$scale bg-blue-500 h-full heightMarg"></div>
      <div class="w-4 bg-green-500 h-full"></div>
      <div class="w-4 bg-red-500 h-full"></div>
      <div class="w-4 bg-orange-500 h-full"></div>
      <div class="w-4 bg-teal-500 h-full"></div>
      <div class="w-4 bg-purple-500 h-full"></div>
      <div class="w-4 bg-pink-500 h-full"></div>
      <div class="w-4 bg-yellow-500 h-full"></div>
  </div> -->
  <div>{{ test }}</div>
  <!-- <div class="w-screen h-screen overflow-hidden bg-white">
    <div v-for="n in masterArray">{{ n }}</div>
  </div> -->
</template>

<script>
const scale = css("scale", 1);
const color = css("color", "yellow");
const width = css("width", "yellow");
const test = ref([false,false,false,false,false,false,false,false])

const { data } = useWebSocket("ws://localhost:8081");
const parsed = computed(() => {
if (data.value) {
  let parsed = JSON.parse(data.value);
  if (parsed.from === "strudel") return parsed;
  if (parsed.from === "qr") return parsed;
}
return "";
});

watch(parsed, (p) => {
// console.log(p.qrData)
if (p.s === "bd") {
  color.value = "red";
  scale.value = 0.8;
} else if (p.s === "sd") {
  scale.value = 1.5;
  color.value = "pink";
} else if (p.qrData) {
  console.log(p.qrData)
  // masterArray.value = p.qrData
  // console.log(masterArray.value)
} else {
  scale.value = 1;
  color.value = "orange";
}
});
</script>