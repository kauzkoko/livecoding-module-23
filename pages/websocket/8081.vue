<template>
  <div>
    <div>{{ status }}</div>
    <!-- <div>{{ data }}</div> -->
    <div>{{ parsedData.value.s }}</div>
    <div><button @click="test()">bd</button></div>
  </div>
</template>

<script setup>
const { status, data, send, open, close } = useWebSocket("ws://localhost:8081");
const test = () => {
  send(JSON.stringify({ s: "bd" }));
};
const parsedData = computed(() => {
  try {
    return JSON.parse(data.value);
  } catch (e) {
    return data.value;
  }
});
</script>
