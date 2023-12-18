<template>
  <div>
    <button @click="send()">send message</button>
  </div>
</template>

<script setup>
import OSC from "osc-js";
let osc;
const test = ref(10);
onMounted(() => {
  osc = new OSC();
  osc.open();
  console.log("osc opened");
  osc.on("*", (message) => {
    console.log(message);
  });
});

function send() {
  let message = new OSC.Message("/vue", Math.random());
  osc.send(message);
}
</script>
§
