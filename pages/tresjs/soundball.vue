<template>
  <div class="wrapper">
    <TresCanvas v-bind="gl">
      <TresPerspectiveCamera
        :args="[45, width / height, 0.1, 100]"
        :position="[0, 0, 0]"
        :rotation="[0, 0, Math.PI]"
      />
      <Soundball />
      <!-- <OrbitControls /> -->
      <Backdrop />
      <TresAmbientLight :intensity="1" />
    </TresCanvas>
  </div>
  <audio id="music" src="/Dirt-Samples/tacscan/011_flight5.wav" loop></audio>
  <button class="fixed left-0 top-0" @click="start()">start</button>
</template>

<script setup>
import { BasicShadowMap, NoToneMapping, SRGBColorSpace } from "three";
const { width, height } = useWindowSize();
const gl = reactive({
  clearColor: "#18181B",
  shadows: true,
  alpha: false,
  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
});

const start = () => {
  const audioElement = document.getElementById("music");
  audioElement.play();
};
</script>
