<template>
    <div text-gray>{{ test }}</div>
    <div
      class="wrapper grid grid-cols-8 dashy flexCenter"
      :style="{ background: `rgba(${slider}, 1)` }"
    >
        <div v-for="n in test" :style="{
            opacity: n ? '100%' : 0
        }" class="bg-white w-100px h-$height">
        <!-- <div class="smallerCircle bg-$color flex flex-col">
            <div class="smallerLine bg-black"></div>
        </div> -->
    </div>
    </div>
  </template>
  
  <script setup>
  const slider = ref(122);
  const test = ref(new Array(8).fill(false))
  const mlleft = css("mlleft", "10px");
  const cols = css("cols", "4");
  const color = css("color", "red");
  const scale = css("scale", 1);
  const height = css("height", '50vh');
  const { data } = useWebSocket("ws://localhost:8081");
  const parsed = computed(() => {
    if (data.value) {
      let parsed = JSON.parse(data.value);
      console.log(parsed);
      if (parsed.from === "strudel") return parsed;
      if (parsed.from === "qr") return parsed;
    }
    return "";
  });
  
  watch(parsed, (p) => {
    if (p.s === "bd") {
      mlleft.value = "0px";
      color.value = "blue";
    } else if (p.s === "sd") {
      scale.value = 1.05;
    } else if (p.s === "gm_fx_atmosphere") {
      scale.value = 1.05;
    } else if (p.qrData) {
        test.value = p.qrData
      console.log(p.qrData)
    } else if (p.s === "gm_fx_echoes") {
      scale.value = 1.1;
    } else if (p.s === "hh") {
      scale.value = 1.2;
    } else {
      scale.value = 1;
      mlleft.value = "50px";
      color.value = "yellow";
    }
  });
  </script>
  