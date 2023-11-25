<template>
  <div
    class="w-screen h-screen overflow-hidden flex flex-col justify-center items-center"
  >
    <div class="fixed top-10 left-10">
      <img class="w-40px h-40px" :src="randomTextSrc" />
    </div>
    <div class="flex flex-rows">
      <div
        class="w-40px h-40px mb-10px mr-10px"
        v-for="(qr, index) in qrArray.slice(0, 19)"
      >
        <img
          class="w-40px h-40px"
          @click="toggledQrs[index] = !toggledQrs[index]"
          :src="qr.value"
          v-show="toggledQrs[index]"
        />
        <div class="w-40px h-40px bg-black" v-show="!toggledQrs[index]"></div>
      </div>
    </div>
    <div class="flex flex-rows">
      <div
        class="w-40px h-40px mb-10px mr-10px"
        v-for="(qr, index) in qrArray.slice(20, 39)"
      >
        <img
          class="w-40px h-40px"
          @click="toggledQrs[index + 20] = !toggledQrs[index + 20]"
          :src="qr.value"
          v-show="toggledQrs[index + 20]"
        />
        <div
          class="w-40px h-40px bg-black"
          v-show="!toggledQrs[index + 20]"
        ></div>
      </div>
    </div>
    <div class="flex flex-row m-y-10px w-screen justify-between">
      <div class="flex flex-col justify-center">
        <div v-for="(qr, index) in qrArray.slice(40, 49)" class="flex">
          <img
            :src="qr.value"
            @click="toggledQrs[index + 40] = !toggledQrs[index + 40]"
            class="w-40px mb-10px"
            v-show="toggledQrs[index + 40]"
          />
          <div
            class="mb-10px w-40px h-40px bg-black"
            v-show="!toggledQrs[index + 40]"
          ></div>
        </div>
      </div>
      <div class="flex flex-col justify-center">
        <div v-for="(qr, index) in qrArray.slice(50, 59)" class="flex">
          <img
            :src="qr.value"
            @click="toggledQrs[index + 50] = !toggledQrs[index + 50]"
            class="w-40px mb-10px"
            v-show="toggledQrs[index + 50]"
          />
          <div
            class="mb-10px w-40px h-40px bg-black"
            v-show="!toggledQrs[index + 50]"
          ></div>
        </div>
      </div>
      <div class="w-60vw h-60vh bg-yellow m-x-10px">
        <div>x: {{ x }}, y: {{ y }}, rawValue: {{ rawValue }}</div>
      </div>
      <div class="flex flex-col justify-between">
        <div v-for="(qr, index) in qrArray.slice(60, 69)" class="flex">
          <img
            :src="qr.value"
            @click="toggledQrs[index + 60] = !toggledQrs[index + 60]"
            class="w-40px mb-10px"
            v-show="toggledQrs[index + 60]"
          />
          <div
            class="mb-10px w-40px h-40px bg-black"
            v-show="!toggledQrs[index + 60]"
          ></div>
        </div>
      </div>
      <div class="flex flex-col justify-center">
        <div v-for="(qr, index) in qrArray.slice(70, 79)" class="flex">
          <img
            :src="qr.value"
            @click="toggledQrs[index + 70] = !toggledQrs[index + 70]"
            class="w-40px h-40px mb-10px"
            v-show="toggledQrs[index + 70]"
          />
          <div
            class="mb-10px w-40px h-40px bg-black"
            v-show="!toggledQrs[index + 70]"
          ></div>
        </div>
      </div>
    </div>
    <div class="flex flex-rows">
      <div v-for="(qr, index) in qrArray.slice(80, 99)">
        <img
          class="mr-10px w-40px"
          @click="toggledQrs[index + 80] = !toggledQrs[index + 80]"
          :src="qr.value"
          v-show="toggledQrs[index + 80]"
        />
        <div
          class="mr-10px w-40px h-40px bg-black"
          v-show="!toggledQrs[index + 80]"
        ></div>
      </div>
    </div>
    <div class="flex flex-rows">
      <div v-for="(qr, index) in qrArray.slice(100, 119)">
        <img
          class="mr-10px w-40px"
          @click="toggledQrs[index + 100] = !toggledQrs[index + 100]"
          :src="qr.value"
          v-show="toggledQrs[index + 100]"
        />
        <div
          class="mr-10px w-40px h-40px bg-black"
          v-show="!toggledQrs[index + 100]"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup>
const toggledQrs = ref(new Array(120).fill(true));
const qrArray = ref([]);
const randomText = ref("some random text");
const { send, x, y, rawValue } = useQRSocket();

const randomTextSrc = useQR(randomText, {
  margin: 0,
  errorCorrectionLevel: "H",
});
setInterval(() => {
  randomText.value = Math.floor(Math.random() * 100000) + "sldjfsöda";
}, 100);

let color = Math.floor(Math.random() * 255);
for (var i = 0; i < 120; i++) {
  if (i % 20 === 0) color = Math.floor(Math.random() * 255);
  qrArray.value.push(
    useQR("text" + i, {
      margin: 0,
      color: {
        dark: `#${toHex(color)}${toHex(0)}${toHex(255)})`,
      },
      errorCorrectionLevel: "H",
    })
  );
}
console.log(qrArray.value[0]);
function toHex(n) {
  var hex = n.toString(16);
  while (hex.length < 2) {
    hex = "0" + hex;
  }
  return hex;
}

watch(rawValue, (val) => {
  //get the number right after "text"
  if (val.startsWith("text")) {
    const num = parseInt(val.slice(4));
    toggledQrs.value[num] = false;
  }
});
</script>
