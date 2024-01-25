<template>
  <Box :args="[2, 1, 0.1]" :position="[0, 0.5, -0.5]">
    <TresMeshToonMaterial color="orange" />
  </Box>
</template>

<script setup>
import { AudioListener, PositionalAudio } from "three";
import { PositionalAudioHelper } from "three/addons/helpers/PositionalAudioHelper";
import { useTresContext } from "@tresjs/core";
const { camera, controls } = useTresContext();
const context = useTresContext();
const listener = new AudioListener();
camera.value.add(listener);
const audioElement = document.getElementById("music");
const positionalAudio = new PositionalAudio(listener);
positionalAudio.setMediaElementSource(audioElement);
positionalAudio.setRefDistance(1);
// positionalAudio.setDirectionalCone(180, 230, 0.1);
const helper = new PositionalAudioHelper(positionalAudio, 0.1);
positionalAudio.add(helper);
onMounted(() => {
  console.log(context);
});
</script>
