<template>
  <div>
    <div fixed right-0 top-0 bg-red>
      <div>{{ status }}</div>
      <div>{{ parsedData }}</div>
    </div>
    <div w-screen bg-black h-screen>
      <div text-white>yoyoyo</div>
      <div
        circle
        :style="{ width: parsedData?.value.s === 'bd' ? '200px' : '50px' }"
      ></div>
    </div>
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
    if (data.value) return data.value;
    else return { s: "~" };
  }
});
</script>
