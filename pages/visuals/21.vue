<template>
  <div class="wrapper grid grid-cols-4 dashy">
    <div v-for="n in 32" class="smallCircle bg-$1"></div>
  </div>
</template>

<script setup>
const cssVars = ref(new Array(10).fill());
cssVars.value.forEach((el, i) => {
  console.log(i);
  cssVars.value[i] = useCssVar(`--${i}`);
  cssVars.value[i].value = "blue";
});
</script>
