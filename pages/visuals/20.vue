<template>
  <div class="wrapper grid grid-cols-4 dashy">
    <div circle class="bg-$9"></div>
    <div v-for="n in 32" class="smallCircle" :class="`bg-$${n - 1}`"></div>
  </div>
</template>

<script setup>
const cssVars = ref([]);
for (let i = 0; i < 10; i++) {
  cssVars.value.push(useCssVar(`--${i}`));
  cssVars.value[i].value = `rgba(${Math.random() * 255}, ${
    Math.random() * 255
  }, ${Math.random() * 255}, 1)`;
}
</script>
