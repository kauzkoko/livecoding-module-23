<template>
  <div>
    <pre>{{ eventObject }}</pre>
  </div>
</template>

<script setup>
const { eventObject } = useQRSocket();
</script>
