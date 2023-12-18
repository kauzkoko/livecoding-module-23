<template>
  <input type="text" v-model="input" />
  <div flex>
    <div
      v-for="n in 2"
      class="m-5 grid grid-cols-21 w-500px aspect-1"
      :style="{ transform: `rotate(${(n - 1) * 90}deg)` }"
    >
      <div
        v-for="black in showArray"
        aspect-1
        overflow-hidden
        bg-black
        transition-all
        linear
        duration-0
        class="animate__animated animate__zoomIn"
        :style="{
          opacity: black ? 1 : 0,
        }"
      ></div>
    </div>
  </div>
</template>

<script setup>
const input = ref(0);
const showArray = ref(new Array(21 * 21).fill(false));
const reducedArray = ref(new Array(21 * 21).fill(false));
const qrcode = useQR(input, {
  margin: 0,
  errorCorrectionLevel: "Q",
});

let count = 86300;
setInterval(() => {
  count++;
  input.value = count + "";
}, 1000);

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
        // Sample pixels around the center of the block
        let blackCount = 0;
        let totalSampled = 0;
        for (let dy = -1; dy <= 1; dy++) {
          for (let dx = -1; dx <= 1; dx++) {
            const pixelIndex = ((y + 2 + dy) * canvas.width + (x + 2 + dx)) * 4;
            if (imageData[pixelIndex] === 0) {
              blackCount++;
            }
            totalSampled++;
          }
        }

        // Majority rule to determine block color
        reducedArray.value.push(blackCount > totalSampled / 2);
      }
    }
    showArray.value = reducedArray.value;
  };
});
</script>

<style>
html,
body {
  overflow: auto;
}
</style>
