<template>
  <div class="w-full h-full flexCenter">
    <div
      class="absolute bg-transparent aspect-1 rounded-full flexCenter transition-all duration-300 flexContainer"
      :style="{
        width: `${ecosystem.currentRadius}px`,
        height: `${ecosystem.currentRadius}px`,
      }"
    >
      <div
        class="absolute bg-green opacity-80 aspect-1 rounded-full z--1 ease-in"
        :style="{
          width: `${currentWidth}px`,
          transitionDelay: step < 2 ? '0' : '1500ms',
          transitionDuration: step < 2 ? '2000ms' : '300ms',
        }"
      />
      <div
        @click="stepper()"
        class="absolute aspect-1 rounded-full z-1 transition-all duration-1000 w-220px flexCenter text-40px token"
      >
        {{ step }}
      </div>
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
          : `translate(0, ${500}px)`,
      }"
    >
      {{ sideToggled ? "switch side" : infoText }}
    </div>
    <div
      @click="sideToggled = true"
      v-if="step > 0"
      class="absolute bg-yellow rounded-full flexCenter transition-all duration-1000 animate__animated animate__zoomIn text-center"
      :style="{
        width: sideToggled ? '300px' : '100px',
        height: sideToggled ? '300px' : '100px',
        transform: sideToggled
          ? `rotate(180deg) translate(0, ${700}px)`
          : `rotate(180deg) translate(0, ${1080}px)`,
      }"
    >
      {{ sideToggled ? infoText : "switch side" }}
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  ecosystem: Object,
});
const emit = defineEmits(["showCurrent", "showPotential"]);

const sideToggled = ref(false);

const tokenImage = computed(() => {
  let string = `url("/${props.ecosystem.index + 1}.jpg")`;
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
  } else if (step.value === 3) {
    console.log("show info");
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
