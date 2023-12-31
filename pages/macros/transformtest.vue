<template>
  <div>{{ test }}</div>
</template>

<script setup>
const test = $ref(new Array(8).fill(true));
</script>
