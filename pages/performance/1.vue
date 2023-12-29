<template>
  <div class="overflow-hidden w-screen h-screen">
    <!-- <input type="text" class="bg-dark-900f" v-model="input" /> -->
    <div class="w-$width h-screen flexCenter overflow-hidden">
      <div
        v-for="black in showArray"
        class="h-$height aspect-1 overflow-hidden bg-red transition-all linear duration-50"
        :style="{
          opacity: black ? 1 : 0,
        }"
      ></div>
    </div>
    <div
      class="fixed left-0 top-0 w-screen h-screen flexCenter pointer-events-none"
    >
      <div>
        <img :src="hakanyakim" class="w-300px aspect-1" sine="blur-10px" />
      </div>
    </div>
  </div>
</template>

<script setup>
const height = css("height", "10px");
const width = css("width", "100vw");
const { data } = useWebSocket("ws://localhost:8081");
const parsed = computed(() => {
  if (data.value) {
    let parsed = JSON.parse(data.value);
    console.log(parsed);
    if (parsed.from === "strudel") return parsed;
  }
  return "";
});

watch(parsed, (p) => {
  if (p.s === "bd") {
    height.value = Math.floor(Math.random() * 500) + "px";
  } else if (p.s === "hh") {
    // width.value = Math.floor(Math.random() * 500) + "px";
  } else if (p.s === "gm_synth_bass_1") {
  } else if (p.s === "gm_") {
  } else if (p.s === "gm_synth_drum") {
  } else if (p.s === "gm_fretless_bass") {
  } else if (p.s === "cp") {
    input.value = "" + Math.floor(Math.random() * 10000);
  } else {
  }
});

const input = ref("1");
const showArray = ref(new Array(21 * 21).fill(false));
const reducedArray = ref(new Array(21 * 21).fill(false));
const qrcode = useQR(input, {
  margin: 0,
  errorCorrectionLevel: "Q",
});
const hakanyakim = useQR("https://hakanya.kim/qr/qrsequencer", {
  margin: 5,
  errorCorrectionLevel: "Q",
  color: {
    dark: "#ffffff",
    light: "#000000",
  },
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
