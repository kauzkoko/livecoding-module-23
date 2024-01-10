<template>
  <div class="wrapper flexCenter">
    <div class="grid grid-cols-8">
      <div v-for="n in 64" circle class="bg-$color"></div>
    </div>
  </div>
</template>

<script setup>
import initUnocssRuntime from "@unocss/runtime";
initUnocssRuntime({});

const color = css("color", "yellow");
const scale = css("scale", "1");
const rotation = css("rotation", "0deg");
const margin = css("margin", "50px");
const text = css("text", "blue");
const text1 = css("text", "blue");
const text2 = css("text", "blue");
const text3 = css("text", "blue");

onWs((data) => {
  const doThis = (sound, variable, change, base, exception = "hh") => {
    if (data.s === sound) {
      variable.value = change;
    } else if (data.s === exception) {
      return;
    } else {
      variable.value = base;
    }
  };

  doThis("bd", color, "blue", "yellow");
  doThis("sd", scale, "2", "1");
  doThis("wind", rotation, "180deg", "0deg");
  doThis("cp", margin, "0px", "50px");
  doThis("weiss", text, "red", "blue");
  doThis("halt", text1, "orange", "red");
  doThis("au", text2, "green", "yellow");
  doThis("nid", text3, "red", "blue");
});
</script>

<style></style>
