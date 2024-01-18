<template>
  <div>
    <div>
      <button @click="init()">init</button>
    </div>
    <div>
      <button @click="superdough({ s: 'cp' }, 0)">
        superdough({ s: 'cp' }, 0, 1);
      </button>
    </div>
  </div>
</template>

<script setup>
import {
  superdough,
  samples,
  initAudioOnFirstClick,
  registerSynthSounds,
} from "superdough";

const init = Promise.all([
  initAudioOnFirstClick(),
  samples("github:tidalcycles/Dirt-Samples/master"),
  registerSynthSounds(),
]);
</script>
