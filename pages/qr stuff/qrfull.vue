<template>
  <div w-screen h-screen flexCenter>
    <img :src="qrcode" class="yes" />
  </div>
</template>

<script setup>
const qrcode = useQR("1", {
  margin: 0,
  errorCorrectionLevel: "L",
});
</script>

<style scoped>
.yes {
  width: min(100vw, 100vh);
  height: min(100vw, 100vh);
}
</style>
