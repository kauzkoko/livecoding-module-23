<template>
  <div>
    <RotaryToken @update="sendUpdatedPosition" :id="1" />
  </div>
</template>

<script setup>
const sendUpdatedPosition = (update) => {
  console.log("update", update);
};
</script>
