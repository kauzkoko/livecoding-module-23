<template>
  <ClientOnly>
    <div id="p5"></div>
  </ClientOnly>
</template>

<script setup>
let myp5;
const props = defineProps({
  sketch: Function,
});

onMounted(() => {
  myp5 = new p5(props.sketch, "p5");
});
</script>
