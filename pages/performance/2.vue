<template>
  <!-- <div text-white>{{ parsed }}</div> -->
  <div
    class="wrapper grid grid-cols-16 dashy"
    :style="{ background: `rgba(${slider}, 1)` }"
  >
    <div v-for="n in 128" class="smallCircle bg-white scale-$scale">
      <!-- <div
        class="smallerCircle bg-black transform-gpu scale-$scale duration-50 ease-in-out"
      >
        <div class="smallerCircle bg-bwhite ml-$mlleft">
          <div class="smallerCircle bg-$color">
            <div
              class="smallerCircle bg-yellow ml-$mlleft transform-gpu scale-$scale"
            ></div>
          </div>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script setup>
const slider = ref(122);
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
    scale.value = 1.05;
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
