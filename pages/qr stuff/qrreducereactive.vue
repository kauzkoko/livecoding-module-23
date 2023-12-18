<template>
  <div>
    <input type="text" v-model="input" />
    <div grid grid-cols-21 w-500px aspect-1>
      <div
        v-for="black in reducedArray"
        aspect-1
        overflow-hidden
        transition-all
        duration-200
        bg-black
        :style="{
          opacity: black ? 1 : 0,
        }"
      ></div>
    </div>
  </div>
</template>

<script setup>
const input = ref("nothing yet");
const reducedArray = ref([]);
const qrcode = useQR(input, {
  margin: 0,
  errorCorrectionLevel: "Q",
});

const img = new Image();
watch(qrcode, (url) => {
  //delete reducedArray.value;
  reducedArray.value = [];
  img.src = url;
  img.onload = function () {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    canvas.width = img.width;
    canvas.height = img.height;
    context.drawImage(img, 0, 0);
    const imageData = context.getImageData(
      0,
      0,
      canvas.width,
      canvas.height
    ).data;
    const blockSize = 4;
    for (let y = 0; y < canvas.height; y += blockSize) {
      for (let x = 0; x < canvas.width; x += blockSize) {
        const centerPixelIndex = ((y + 2) * canvas.width + (x + 2)) * 4;
        reducedArray.value.push(imageData[centerPixelIndex] === 0);
      }
    }
  };
});
</script>

<style>
html,
body {
  overflow: auto;
}
</style>
