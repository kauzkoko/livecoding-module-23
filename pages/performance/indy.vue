<template>
  <div class="wrapper">
    <div class="grid grid-cols-4 full">
      <div
        v-for="n in 8"
        class="bg-$color circle centerme ml-$ml transform-gpu transition-all duration-50 scale-$scale"
      ></div>
    </div>
    <div v-html="strudelHtml"></div>
  </div>
</template>

<script setup>
import initUnocssRuntime from "@unocss/runtime";
initUnocssRuntime({});
let strudelHtml = ref("<div class='text-red'>here by default</div>");
const ml = css("ml", "0px");
const scale = css("scale", "1");
const color = css("color", "green");

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
  doThis("bd", color, "blue", "green");

  switch (data.s) {
    case "hh":
      strudelHtml.value = data.html ?? "<div class='text-red'>default</div>";
      ml.value = "100px";
      break;
    case "bd":
      scale.value = "0.1";
      break;
    case "hh":
      break;
    default:
      ml.value = "0px";
      scale.value = "1";
      break;
  }
  if (data.html) {
    strudelHtml.value = data.html;
  }
});
</script>
