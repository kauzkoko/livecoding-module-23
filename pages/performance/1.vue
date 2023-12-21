<template>
  <Console :values="parsed"></Console>
  <div
    class="wrapper grid grid-cols-8 dashy"
    :style="{ gridTemplateColumns: false ? `2fr ${fr}fr 1fr 1fr` : 'initial' }"
  >
    <div v-for="n in amount" class="line">
      <div circle bg-red>
        <div class="ml-$mlleft" smallerCircle bg-yellow>
          <div class="smallerRect">
            <div class="smallerRect bg-red"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const amount = ref(128);
const mlleft = css("mlleft", "10px");
const fr = ref(5);
// const color = css("color", "red");
// const scale = css("scale", 1);
const { data } = useWebSocket("ws://localhost:8081");
const parsed = computed(() => {
  if (data.value) {
    let parsed = JSON.parse(data.value);
    console.log(parsed);
    if (parsed.from === "strudel") return parsed;
  }
  return { message: "no data" };
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
