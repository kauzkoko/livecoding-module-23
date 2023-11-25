<template>
  <div>
    <img :src="qr.value" v-for="qr in qrArray" class="mr-3" />
  </div>
</template>

<script setup>
const qrArray = ref([]);
for (var i = 0; i < 100; i++) {
  qrArray.value.push(
    useQR("text" + i, {
      margin: 0,
      errorCorrectionLevel: "H",
    })
  );
}
console.log(qrArray.value[0]);
</script>
