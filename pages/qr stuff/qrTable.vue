<template>
  <div class="w-screen h-screen flexCenter">
    <div class="fixed left-50px top-50px">
      <img :src="qrcode" w-100px h-100px />
    </div>
    <div class="w-800px h-600px bg-blue relative">
      <div
        v-for="(point, index) in points"
        class="absolute left-0 top-0 w-20px h-20px rounded-full transition-transform duration-150"
        :style="{
          backgroundColor: `rgba(${255 / index + 1},0,0,1)`,
          transform: `translate(${point.x - 10}px, ${point.y - 10}px)`,
        }"
      ></div>
    </div>
  </div>
</template>

<script setup>
const { cornerPoints } = useQRSocket();
const points = ref([
  { x: 0, y: 0 },
  { x: 0, y: 0 },
  { x: 0, y: 0 },
  { x: 0, y: 0 },
]);
const qrcode = useQR("1", {
  margin: 0,
  errorCorrectionLevel: "L",
});
watch(cornerPoints, (newVal) => {
  newVal.forEach((point, index) => {
    console.log(point);
    points.value[index].x = point.x;
    points.value[index].y = point.y;
  });
});
</script>
