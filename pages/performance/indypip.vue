<template>
  <div class="wrapper" id="pip" @click="startPip">
    <div v-html="strudelHtml"></div>
  </div>
</template>

<script setup>
import initUnocssRuntime from "@unocss/runtime";
initUnocssRuntime({});
let strudelHtml = ref("<div class='text-red'>here by default</div>");
const ml = css("ml", "0px");

onWs((data) => {
  switch (data.s) {
    case "bd":
      console.log(data);
      strudelHtml.value = data.html ?? "<div class='text-red'>default</div>";
      ml.value = "10px";
      break;
    case "sd":
      break;
    case "hh":
      break;
    default:
      ml.value = "0px";
  }
  if (data.html) {
    strudelHtml.value = data.html;
  }
});

const startPip = async () => {
  const pipWindow = await documentPictureInPicture.requestWindow();
  let pip = document.querySelector("#pip");
  pipWindow.document.body.append(pip);
};
</script>
