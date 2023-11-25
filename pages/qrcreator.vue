<template>
  <div>
    <input type="text" v-model="input" />
    <img :src="qrcode" alt="" />
  </div>
</template>

<script setup>
const input = ref("nothing yet");
const qrcode = useQR(input, {
  margin: 0,
  errorCorrectionLevel: "H",
});
</script>
