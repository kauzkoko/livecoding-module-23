<template>
  <div class="wrapper grid grid-cols-4 dashy">
    <div v-for="n in 32" class="smallCircle bg-white">
      <div class="smallerCircle bg-black">
        <div class="smallerCircle bg-blue ml-$mlleft"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
const mlleft = css("mlleft", "10px");
const { data } = useWebSocket("ws://localhost:8081");
watch(data, (newVal) => {
  if (newVal) {
    const parsedData = JSON.parse(newVal);
    if (parsedData.s === "bd") {
      mlleft.value = "0px";
    } else {
      mlleft.value = "10px";
    }
  }
});
</script>
