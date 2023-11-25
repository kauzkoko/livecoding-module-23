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
    <div ref="pdfSection" class="flex flex-col bg-gray">
      <div v-for="n in 15" mb-6px>
        <img :src="qrCodes[n - 1].value" w-31px mr-10px />
        <img :src="qrCodes[30 - n].value" w-31px />
      </div>
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
