<template>
  <div>
    <button
      @click="
        exportToPDF('my-pdf-file.pdf', pdfSection, {
          orientation: 'portrait',
          format: [72, 82 * 5],
        })
      "
    >
      print card
    </button>
    <div ref="pdfSection" class="flex flex-col">
      <img v-for="n in 30" :src="qrCodes[n - 1].value" w-72px h-72px mb-10px />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { exportToPDF } from "#imports";
const qrCodes = ref([]);
for (let i = 0; i < 30; i++)
  qrCodes.value.push(
    useQR(i + 1 + "", {
      margin: 0,
      errorCorrectionLevel: "H",
    })
  );
console.log(qrCodes.value);

const pdfSection = (ref < HTMLElement) | (null > null);
</script>
