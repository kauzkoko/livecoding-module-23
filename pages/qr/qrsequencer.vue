<template>
  <div w-screen h-screen>
    <video ref="videoElem" w-100vw />
    <div fixed right-0 top-0>
      <div bg-blue-300>qr id: {{ code }}</div>
      <div bg-blue-500>read count: {{ codeCounter }}</div>
      <div bg-blue-700>toggle count: {{ toggleCounter }}</div>
    </div>
    <div
      v-if="show"
      @click="startReading()"
      class="fixed top-50vh left-50vw transform-gpu translate--50% bg-white rounded-full w-80vw aspect-1 flexCenter font-sans text-1.5em"
    >
      <div>press and allow to start</div>
    </div>
  </div>
</template>

<script setup>
import QrScanner from "qr-scanner";
const { sendQrData } = useQrSequencer();
setPageLayout("none");

const show = ref(true);
const videoElem = ref();
const qrScanner = ref();
const code = ref("");
const codeCounter = ref(0);
const toggleCounter = ref(0);
const sendQrThrottled = useThrottleFn((qrData) => {
  sendQrData.value(qrData);
  toggleCounter.value++;
}, 2000);

onMounted(() => {
  qrScanner.value = new QrScanner(
    videoElem.value,
    (data) => {
      code.value = data.data;
      codeCounter.value++;
      sendQrThrottled(code.value);
    },
    { returnDetailedScanResult: true, highlightScanRegion: true }
  );
});
const startReading = () => {
  qrScanner.value.start();
  show.value = false;
  console.log(show.value);
};
</script>
