<template>
    <ClientOnly>
      <div :id="id"></div>
    </ClientOnly>
</template>

<script setup>
const props = defineProps({
  id: String,
});
</script>