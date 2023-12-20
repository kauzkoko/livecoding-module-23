<template>
  <div text-white>{{ parsed }}</div>
  <div class="flex">
    <input type="range" step="1" min="0" max="255" v-model="slider" />
    <input type="range" step="1" min="0" max="255" v-model="slider2" />
    <input type="range" step="1" min="0" max="255" v-model="slider3" />
    <input type="range" step="1" min="0" max="255" v-model="slider4" />
  </div>
  <div
    class="wrapper grid grid-cols-32 dashy"
    :style="{ background: `rgba(${slider}, 0, 255, 1)` }"
  >
    <div v-for="n in 256" class="smallCircle bg-white">
      <div
        class="smallerCircle bg-black transform-gpu scale-$scale duration-50 ease-in-out"
      >
        <div class="smallerCircle bg-blue ml-$mlleft">
          <div class="smallerCircle bg-$color">
            <div
              class="smallerCircle bg-green ml-$mlleft transform-gpu scale-$scale"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const slider = ref(0);
const slider2 = ref(0);
const slider3 = ref(0);
const slider4 = ref(0);
const mlleft = css("mlleft", "10px");
const cols = css("cols", "4");
const color = css("color", "red");
const scale = css("scale", 1);
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
    mlleft.value = "0px";
    color.value = "blue";
  } else if (p.s === "sd") {
    scale.value = 1.1;
  } else {
    scale.value = 1;
    mlleft.value = "50px";
    color.value = "yellow";
  }
});
</script>
