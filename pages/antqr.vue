<template>
  <div>
    <button @click="onStart()">make interactive</button>
    <div class="fixed left-0 top-0 text-50px">{{ x }}</div>
    <video playsinline muted autoplay id="video"></video>
  </div>
</template>

<script setup>
import { ready, scan } from "qr-scanner-wechat";
const x = ref(0);
await ready();

const onStart = async () => {
  const stream = await navigator.mediaDevices.getUserMedia({
    audio: false,
    video: {
      width: 512,
      height: 512,
    },
  });

  const video = document.getElementById("video");
  video.srcObject = stream;
  video.play();

  async function scanFrame() {
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const result = await scan(canvas);
    if (result?.rect?.x) {
      console.log(result.rect.x);
      x.value = result.rect.x;
    }

    // if (result?.text) alert(result?.text);
  }

  setInterval(scanFrame, 50); // scan one frame every 100ms
};
</script>
