<template>
  <div>
    <div v-kack="'jo'"></div>
  </div>
</template>

<script setup>
const vKack = {
  mounted: (param1, param2) => console.log(param2.value),
};
</script>
