<template>
  <div w-screen h-screen grid grid-cols-3>
    <div fixed left-0 bottom-100px bg-red>{{ fromOsc }}</div>
    <div
      v-for="n in 10"
      bg-blue
      rounded-full
      aspect-1
      transition-all
      :style="{
        width: bass,
        transitionDuration: n * 20 + 'ms',
      }"
    ></div>

    <div>{{ data }}</div>
    <button @click="send()">send {{ x }}</button>
    <button @click="sendWebsocket()">send ws {{ x }}</button>
  </div>
</template>

<script setup>
const {
  status,
  data,
  send: sendws,
  open,
  close,
} = useWebSocket("ws://localhost:8080");
const { osc, on, send: sendOSC } = useOSC();
const { x, y } = useMouse();
const fromOsc = ref();
const send = () => {
  sendOSC.value("fromvue", 10);
};

const sendWebsocket = () => {
  sendws("fromvue", 10);
};

const bass = computed(() => {
  if (fromOsc.value) return fromOsc.value[0] === "bd" ? "100px" : "50px";
  else return "50px";
});
const init = () => {
  on.value("fromserver", () => console.log("fromserver"));
  on.value("fromdirtplay", ({ args }) => (fromOsc.value = args));
};

onMounted(() => {
  init();
});
</script>
