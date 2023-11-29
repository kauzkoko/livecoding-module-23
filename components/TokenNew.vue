<template>
  <div class="w-full h-full flexCenter pointer-none select-none">
    <div
      class="absolute bg-transparent aspect-1 rounded-full flexCenter flexContainer"
    >
      <div
        @click="stepper()"
        class="absolute aspect-1 rounded-full z-1 transition-all duration-1000 w-220px flexCenter text-40px token"
      ></div>
    </div>
    <div
      @click="sideToggled = false"
      v-if="step > 0"
      class="absolute bg-yellow rounded-full flexCenter transition-all duration-1000 animate__animated animate__zoomIn border-5px border-yellow border-solid text-30px text-center"
      :style="{
        width: sideToggled ? '100px' : '500px',
        height: sideToggled ? '100px' : '500px',
        transform: sideToggled
          ? `translate(0, ${1080}px)`
          : `translate(0, ${700}px)`,
      }"
    >
      {{ sideToggled ? "switch side" : step === 4 ? "" : infoText }}
      <div
        class="relative rounded-full w-500px aspect-1"
        v-show="!sideToggled && step === 4"
        @click="changeImage()"
      >
        <img
          :src="`/info/${ecosystem.name.toLowerCase()}_${imageNumber}.jpg`"
          class="rounded-full w-500px aspect-1"
        />
        <div
          class="absolute bg-yellow w-full aspect-1 rounded-full mt--100px flexCenter flex-col border-black border-solid border-1px"
        >
          <h1 class="font-bold">Conservation</h1>
          <p class="p-5">
            What Pete does can Esther too.<br />
            What Pete does can Esther too.<br />
            What Pete does can Esther too
          </p>
        </div>
      </div>
    </div>
    <div
      @click="sideToggled = true"
      v-if="step > 0"
      class="absolute bg-yellow rounded-full flexCenter transition-all duration-1000 animate__animated animate__zoomIn text-center"
      :style="{
        width: sideToggled ? '500px' : '100px',
        height: sideToggled ? '500px' : '100px',
        transform: sideToggled
          ? `rotate(180deg) translate(0, ${700}px)`
          : `rotate(180deg) translate(0, ${1080}px)`,
      }"
    >
      {{ !sideToggled ? "switch side" : step === 4 ? "" : infoText }}
      <div
        class="relative rounded-full w-500px aspect-1"
        v-show="sideToggled && step === 4"
        @click="changeImage()"
      >
        <img
          :src="`/BlueCarbon_${imageNumber}.jpg`"
          class="rounded-full w-500px aspect-1"
        />
        <div
          class="absolute bg-yellow w-full aspect-1 rounded-full mt--100px flexCenter flex-col"
        >
          <h1 class="font-bold">Conservation</h1>
          <p class="p-5">
            What Pete does can Esther too.<br />
            What Pete does can Esther too.<br />
            What Pete does can Esther too
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  ecosystem: Object,
});
const emit = defineEmits([
  "showCurrent",
  "showPotential",
  "showAboveBelow",
  "exit",
]);

const sideToggled = ref(false);

const tokenImage = computed(() => {
  console.log(props.ecosystem.name.toLowerCase());
  let string = `url("/ecosystems/${props.ecosystem.name.toLowerCase()}.jpeg")`;
  return string;
});

const step = ref(0);
function stepper() {
  if (step.value === 0) {
    emit("showCurrent", props.ecosystem.index);
  } else if (step.value === 1) {
    emit("showPotential", props.ecosystem.index);
  } else if (step.value === 2) {
    console.log("show above below");
    emit("showAboveBelow", props.ecosystem.index);
  } else if (step.value === 3) {
    console.log("show info");
    emit("exit", props.ecosystem.index);
  }
  if (step.value < 4) step.value++;
  else step.value = 0;
}

const infoText = computed(() => {
  if (step.value === 0) {
    return "";
  } else if (step.value === 1) {
    return "Welcome you see current";
  } else if (step.value === 2) {
    return "You see now potential";
  } else if (step.value === 3) {
    return "You now see above and below stuff";
  } else if (step.value === 4) {
    return "I am information about the project";
  }
});

const imageNumber = ref(1);
function changeImage() {
  if (imageNumber.value < 4) imageNumber.value++;
  else imageNumber.value = 1;
}
</script>

<style lang="scss">
.flexContainer {
  .token {
    mix-blend-mode: normal;
    background-image: v-bind(tokenImage);
    background-size: cover;
  }
}
</style>
