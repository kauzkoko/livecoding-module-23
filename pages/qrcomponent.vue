<template>
  <div>
    <p style="color: red">{{ error }}</p>

    <p>
      Last result: <b>{{ result }}</b>
    </p>

    <div style="border: 2px solid black">
      <qrcode-stream
        :paused="paused"
        :track="paintOutline"
        @error="onError"
      ></qrcode-stream>
    </div>
  </div>
</template>

<script setup>
import { QrcodeStream } from "vue-qrcode-reader";
const result = ref("");
const error = ref("");
const paused = ref(false);
const { sendQrData, x, y } = useQRSocket();

function paintBoundingBox(detectedCodes, ctx) {
  for (const detectedCode of detectedCodes) {
    const {
      boundingBox: { x, y, width, height },
    } = detectedCode;

    ctx.lineWidth = 2;
    ctx.strokeStyle = "#007bff";
    ctx.strokeRect(x, y, width, height);
  }
}

function paintOutline(detectedCodes, ctx) {
  for (const detectedCode of detectedCodes) {
    console.log(detectedCode);
    sendQrData.value(
      "client1",
      detectedCode.boundingBox.x,
      detectedCode.boundingBox.y,
      detectedCode.rawValue
    );
    const [firstPoint, ...otherPoints] = detectedCode.cornerPoints;

    ctx.strokeStyle = "red";

    ctx.beginPath();
    ctx.moveTo(firstPoint.x, firstPoint.y);
    for (const { x, y } of otherPoints) {
      ctx.lineTo(x, y);
    }
    ctx.lineTo(firstPoint.x, firstPoint.y);
    ctx.closePath();
    ctx.stroke();
  }
}

function onError(err) {
  error.value = `[${err.name}]: `;

  if (err.name === "NotAllowedError") {
    error.value += "you need to grant camera access permission";
  } else if (err.name === "NotFoundError") {
    error.value += "no camera on this device";
  } else if (err.name === "NotSupportedError") {
    error.value += "secure context required (HTTPS, localhost)";
  } else if (err.name === "NotReadableError") {
    error.value += "is the camera already in use?";
  } else if (err.name === "OverconstrainedError") {
    error.value += "installed cameras are not suitable";
  } else if (err.name === "StreamApiNotSupportedError") {
    error.value += "Stream API is not supported in this browser";
  } else if (err.name === "InsecureContextError") {
    error.value +=
      "Camera access is only permitted in secure context. Use HTTPS or localhost rather than HTTP.";
  } else {
    error.value += err.message;
  }
}

// async function onDetect(detectedCodes) {
//   result.value = JSON.stringify(detectedCodes.map((code) => code.rawValue));
//   paused.value = true;
//   await timeout(10);
//   paused.value = false;
//   function timeout(ms) {
//     return new Promise((resolve) => {
//       window.setTimeout(resolve, ms);
//     });
//   }
// }
</script>
