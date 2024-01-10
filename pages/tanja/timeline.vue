<template>
  <Html class="overflow-auto!" />
  <div text-white>
    <div v-for="track in tracks" bg-blue border-black border-solid border-1px>
      <div>name: {{ track.clipitem.name }}</div>
      <div>
        computed duration {{ track.clipitem.end - track.clipitem.start }}
      </div>
      <div>start: {{ track.clipitem.start }}</div>
      <div>end: {{ track.clipitem.end }}</div>
    </div>
    <div bg-red>{{ nurnames }}</div>
    <div bg-yellow>{{ finalString }}</div>
  </div>
</template>

<script setup>
import data from "@/assets/newtimeline.json";
const tracks = ref(data.xmeml.sequence.media.audio.track);
console.log(tracks);
let nurnames = ref([]);
let finalString = ref("shabda/speech/fr-FR/m:");
tracks.value.forEach((element, index) => {
  console.log(element.clipitem.name);
  // remove .m4a in the string if it exists and whitespaces
  if (element.clipitem.name.includes(".m4a")) {
    element.clipitem.name = element.clipitem.name.replace(".m4a", "");
    element.clipitem.name = element.clipitem.name.replace(" ", "");
  }
  nurnames.value.push(element.clipitem.name);
  if (index < tracks.value.length - 1) {
    finalString.value += element.clipitem.name + ",";
  } else {
    finalString.value += element.clipitem.name;
  }
});
// console.log(data.xmeml.sequence.media.audio.track[0].clipitem.name);
</script>
