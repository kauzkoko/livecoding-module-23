<template>
  <ClientOnly>
    <div
      class="bg-black w-screen h-screen overflow-hidden grid grid-rows-[auto,4fr]"
    >
      <iframe
        ref="iframe"
        class="w-screen"
        src="http://localhost:5173/"
        frameborder="0"
      ></iframe>
      <div class="bg-black w-screen grid grid-cols-4">
        <div
          v-for="n in 16"
          class="bg-white w-100px aspect-1 rounded-full self-center justify-self-center"
        ></div>
      </div>
    </div>
  </ClientOnly>
</template>

<script setup>
const iframe = ref(null);
onMounted(() => {
  window.addEventListener("message", (event) => {});
  setInterval(() => {
    iframe.value.contentWindow.postMessage(
      [0, 1, 0, 1, 0, 1, 1, 0],
      "http://localhost:5173"
    );
  }, 1000);
});
</script>

<style>
html,
body {
  background-color: black;
}
</style>
