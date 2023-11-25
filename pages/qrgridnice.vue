<template>
  <div class="flex flex-row flex-wrap w-screen h-screen bg-white">
    <canvas id="myCanvas" class="w-screen h-screen fixed left-0 top-0"></canvas>
    <div v-for="qr in qrArray" class="p-10px">
      <img :src="qr.value" class="block" />
    </div>
  </div>
</template>

<script setup>
const text = ref("aölksjdflköajsdf");
const qrArray = ref([]);
const qrAmount = 300;
let color = Math.floor(Math.random() * 255);
for (var i = 0; i < qrAmount; i++) {
  qrArray.value.push(
    useQR(text, {
      margin: 0,
      errorCorrectionLevel: "L",
    })
  );
}

function toHex(n) {
  var hex = n.toString(16);
  while (hex.length < 2) {
    hex = "0" + hex;
  }
  return hex;
}

const { x, y } = useMouse();

onMounted(() => {
  var canvas = document.getElementById("myCanvas");
  var ctx = canvas.getContext("2d");
  var dpr = window.devicePixelRatio || 1;

  // Resize the canvas to fill the browser window dynamically
  function resizeCanvas() {
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = window.innerWidth + "px";
    canvas.style.height = window.innerHeight + "px";
    ctx.scale(dpr, dpr); // Scale the context to account for the device pixel ratio
  }
  window.addEventListener("resize", resizeCanvas, false);
  resizeCanvas();

  function drawRectangle(x, y) {
    ctx.fillStyle = "black"; // Set the color of the rectangle
    ctx.shadowColor = "rgba(0, 0, 0, 0)"; // Ensure no shadow is applied
    ctx.shadowBlur = 0; // Ensure no shadow is applied
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.shadowBlur = 0;
    ctx.fillRect(x, y, 4, 4); // Draw a rectangle (x, y, width, height)
  }

  const { pause, resume } = useRafFn(() => {
    console.log(x.value, y.value);
    drawRectangle(x.value, y.value);
  });

  // Example: Draw a rectangle at position (100, 100)
});

setInterval(() => {
  // text.value = Math.floor(Math.random() * 100) + "";
}, 1000);
</script>
