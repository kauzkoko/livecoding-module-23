<template>
  <div>
    <div text-white>socket status {{ status }}</div>
    <div class="grid grid-cols-3">
      <div @click="sendSound('bd')" circle flexCenter>
        <div>send basedrum</div>
      </div>
      <div @click="sendSound('sd')" circle flexCenter>
        <div>send snaredrum</div>
      </div>
      <div @click="sendSound('hh')" circle flexCenter>
        <div>send hihat</div>
      </div>
      <div @click="sendData(masterArray)" circle flexCenter>
        <div>send masterArray</div>
      </div>
    </div>
  </div>
</template>

<script setup>
const masterArray = ref([1, 1, 1, 1, 1, 1, 1, 1]);
const { status, send } = useWebSocket("ws://localhost:8081");
const sendSound = (sound) => {
  send(JSON.stringify({ from: "visuals", s: sound }));
};

const sendData = (data) => {
  console.log(data);
  send(JSON.stringify({ from: "visuals", s: "hh", data }));
};
</script>
