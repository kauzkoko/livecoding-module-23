<template>
  <div>
    <div class="fixed right-0 top-0 bg-red" v-show="false">
      <div>{{ status }}</div>
      <div>{{ parsedData }}</div>
    </div>
    <div w-screen bg-black h-screen grid grid-cols-3 overflow-hidden>
      <div
        v-for="n in 10"
        class="circle duration-300"
        :style="{ width: parsedData?.value.s === 'bd' ? '200px' : '50px' }"
      >
        <div
          class="circle bg-blue w-30px"
          :style="{ width: parsedData?.value.s === 'bd' ? '200px' : '50px' }"
          v-for="n in 9"
        ></div>
      </div>
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
