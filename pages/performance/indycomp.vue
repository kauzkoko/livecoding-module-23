<template>
  <div class="wrapper">
    <div class="circle ml-$ml"></div>
  </div>
</template>

<script setup>
const ml = css("ml", "0px");
onWs(({ s }) => {
  switch (s) {
    case "bd":
      ml.value = "10px";
      break;
    case "sd":
      break;
    default:
      ml.value = "0px";
  }
});
</script>
