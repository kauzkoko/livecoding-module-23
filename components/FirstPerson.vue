<template>
  <Sphere ref="sphereRef" :args="[0.1, 32, 16]">
    <TresMeshToonMaterial color="orange" />
  </Sphere>
</template>

<script setup>
import { AudioListener, PositionalAudio } from "three";
import { PositionalAudioHelper } from "three/addons/helpers/PositionalAudioHelper";
import { useTresContext } from "@tresjs/core";
const { onLoop } = useRenderLoop();
const { x, y } = useMouse();
const { width, height } = useWindowSize();
const { camera } = useTresContext();
const sphereRef = shallowRef(null);
const listener = new AudioListener();
// camera.value.add(listener);
const audioElement = document.getElementById("music");
const positionalAudio = new PositionalAudio(listener);
positionalAudio.setMediaElementSource(audioElement);
positionalAudio.setRefDistance(1);
// positionalAudio.setDirectionalCone(180, 360, 0.1);
// const helper = new PositionalAudioHelper(positionalAudio, 0.5);
// positionalAudio.add(helper);
const factor = 2;
let counter = 0;
onLoop(({ delta, elapsed }) => {
  if (sphereRef.value) {
    if (counter === 0) sphereRef.value.value.add(listener);
    // console.log(sphereRef.value.value.position.x);
    // sphereRef.value.value.position.x = map(
    //   x.value,
    //   0,
    //   width.value,
    //   factor,
    //   -factor
    // );
    // sphereRef.value.value.position.z = map(
    //   y.value,
    //   0,
    //   width.value,
    //   factor,
    //   -factor
    // );
  }
  counter++;
});
</script>
