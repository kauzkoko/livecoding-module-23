<template>
  <ClientOnly>
    <!-- <Script src="https://unpkg.com/@strudel/repl@0.9.4"></Script> -->
    <Script src="/strudelrepltest.js"></Script>
    <!-- <strudel-editor></strudel-editor> -->
    <strudel-editor class="bg-yellow" />
  </ClientOnly>
</template>

<script setup>
const { data, post } = useBroadcastChannel({ name: "strudelpong" });
watch(data, () => {
  console.log(data.value);
  window.test = data.value;
});
</script>
