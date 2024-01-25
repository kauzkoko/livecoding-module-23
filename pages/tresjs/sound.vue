<template>
  <div class="wrapper">
    <TresCanvas v-bind="gl">
      <TresPerspectiveCamera
        :args="[45, width / height, 0.1, 100]"
        :position="[3, 2, 3]"
      />
      <Stuff></Stuff>
      <OrbitControls
        :min-distance="0.5"
        :max-distance="10"
        :max-polar-angle="0.5 * Math.PI"
        :target="[0, 0.1, 0]"
      />
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
