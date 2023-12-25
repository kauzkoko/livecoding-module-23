<template>
  <div text-white>{{ array }}</div>
</template>

<script setup>
const agen = (times = 10, cb = () => true, fill = true) => {
  console.log("fill", fill);
  return Array.from(new Array(times).fill(fill), (x, i) => cb(x, i));
};

const array = ref(agen(10, (x, i) => x * i, 16));
const test = (array.value[1] = 1000);
</script>
