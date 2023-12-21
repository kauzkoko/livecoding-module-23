<template>
  <div>
    <button @click="startReading">start reading</button>
    <video ref="videoElem" w-100vw />
    <div fixed right-0 top-0 bg-white>{{ code }}</div>
    <div fixed right-0 top-30px bg-yellow>{{ codeCounter }}</div>
  </div>
</template>

<script setup>
import QrScanner from "qr-scanner";
const { sendQrData, x, y } = useQRSocket();

const videoElem = ref();
const qrScanner = ref();
const code = ref("");
const codeCounter = ref(0);

onMounted(() => {
  qrScanner.value = new QrScanner(
    videoElem.value,
    (data) => {
      console.log(data);
      code.value = data.data;
      codeCounter.value++;
      sendQrData.value("client1", code.value);
    },
    { returnDetailedScanResult: true, highlightScanRegion: true }
  );
});
const startReading = () => {
  qrScanner.value.start();
};
</script>
