<template>
  <ClientOnly>
    <div>
      <iframe
        class="w-screen"
        src="http://localhost:5173/"
        frameborder="0"
      ></iframe>
    </div>
  </ClientOnly>
</template>

<script setup>
onMounted(() => {
  window.addEventListener("message", function (event) {
    console.log("Message from iframe A: ", event.data);
  });
});
</script>
