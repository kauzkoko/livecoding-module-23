<template>
  <div>
    <Scroller @update="onEmit" :width="100" :height="100" />
  </div>
</template>

<script setup>
const onEmit = (data) => {
  console.log("updateFromScroll", data);
};
</script>
