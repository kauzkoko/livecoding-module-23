<template>
  <div class="wrapper">
    <div v-html="strudelHtml"></div>
  </div>
</template>

<script setup>
import initUnocssRuntime from "@unocss/runtime";
initUnocssRuntime({});
let strudelHtml = ref("<div class='text-red'>default</div>");
const ml = css("ml", "0px");
const cssArray = ref([]);
onWs((data) => {
  if (data.css) {
    for (const property in data.css) {
      console.log(data.css[property]);
      let newLength = cssArray.value.push(css(property, data.css[property]));
      cssArray.value[newLength - 1].value = "50px";
    }
  }
  switch (data.s) {
    case "bd":
      console.log(data);
      strudelHtml.value = data.html ?? "<div class='text-red'>default</div>";
      ml.value = "10px";
      break;
    case "sd":
      break;
    default:
      ml.value = "0px";
  }
});
</script>
