<template>
  <div>
    <button @click="send()">send {{ x }}</button>
  </div>
</template>

<script setup>
const { osc, on, send: sendOSC } = useOSC();
const { x, y } = useMouse();
const send = () => {
  sendOSC.value("fromvue", 10);
};

const init = () => {
  on.value("fromserver", () => console.log("fromserver"));
  on.value("fromdirtplay", ({ args }) => console.log(args[0]));
};

onMounted(() => {
  init();
});
</script>
