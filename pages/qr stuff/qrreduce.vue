<template>
  <div>
    <div grid grid-cols-21 w-500px aspect-1>
      <div
        v-for="black in reducedArray"
        aspect-1
        :class="[black ? 'bg-black' : 'bg-white']"
        overflow-hidden
      ></div>
    </div>
  </div>
</template>

<script setup>
import QRCode from "qrcode";

const reducedArray = ref([]);
function generateReducedQRCodeArray(data) {
  QRCode.toDataURL(
    data,
    { errorCorrectionLevel: "L", margin: 0 },
    function (err, url) {
      const img = new Image();
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
        const blockSize = 4; // Size of each block in pixels

        // Iterate over the QR code image in steps of blockSize
        for (let y = 0; y < canvas.height; y += blockSize) {
          for (let x = 0; x < canvas.width; x += blockSize) {
            // Calculate the index of the center pixel in the current block
            const centerPixelIndex = ((y + 2) * canvas.width + (x + 2)) * 4;
            // Check if the center pixel is black and add to the array
            reducedArray.value.push(imageData[centerPixelIndex] === 0);
          }
        }

        console.log(reducedArray.value); // This is the reduced one-dimensional boolean array
      };
    }
  );
}

generateReducedQRCodeArray("1");
</script>

<style>
html,
body {
  overflow: auto;
}
</style>
