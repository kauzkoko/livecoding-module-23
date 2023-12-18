<template>
  <div>
    <div grid grid-cols-84 w-500px aspect-1 v-for="n in 10">
      <div
        v-for="black in booleanArray"
        aspect-1
        :class="[black ? 'bg-black' : 'bg-white']"
        overflow-hidden
      ></div>
    </div>
  </div>
</template>

<script setup>
import QRCode from "qrcode";

const booleanArray = ref([]);
const compressedArray = ref([]);

function generateQRCodeAndConvertToArray(data) {
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
        console.log(canvas.width, canvas.height);

        const imageData = context.getImageData(
          0,
          0,
          canvas.width,
          canvas.height
        ).data;

        for (let i = 0; i < imageData.length; i += 4) {
          booleanArray.value.push(imageData[i] === 0);
        }

        console.log(booleanArray.value);
      };
    }
  );
}

generateQRCodeAndConvertToArray("1");
</script>

<style>
html,
body {
  overflow: auto;
}
</style>
