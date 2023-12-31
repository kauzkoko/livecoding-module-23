<template>
  <div class="wrapper">
    <div class="circle ml-$ml"></div>
  </div>
</template>

<script setup>
let ml = tcss("ml", "0px");
console.log(ml);
onWs(({ s }) => {
  switch (s) {
    case "bd":
      ml = "10px";
      console.log(ml);
      break;
    case "sd":
      break;
    default:
      ml = "0px";
  }
});
</script>
