<template>
  <div text-white>{{ parsed }}</div>
  <div class="wrapper grid grid-cols-4 dashy">
    <div v-for="n in 32" class="smallCircle bg-white">
      <div class="smallerCircle bg-black transform-gpu scale-$scale">
        <div class="smallerCircle bg-blue ml-$mlleft"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
const mlleft = css("mlleft", "10px");
const scale = css("scale", 1);
const { data } = useWebSocket("ws://localhost:8081");
const parsed = computed(() => {
  if (data.value) {
    return JSON.parse(data.value);
  }
  return "~";
});

watch(parsed, (p) => {
  if (p.value.s === "bd") {
    mlleft.value = "0px";
  } else if (p.value.s === "sd") {
    scale.value = 1.1;
  } else {
    scale.value = 1;
    mlleft.value = "50px";
  }
});
</script>
