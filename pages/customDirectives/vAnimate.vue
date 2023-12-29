<template>
  <div wrapper grid grid-cols-4>
    <div
      v-for="n in 32"
      class="bg-red w-100px aspect-1"
      v-animate:1000.1000="'blur-2px'"
    >
      <div
        v-for="n in 8"
        class="ml-0px transition-all duration-50"
        smallCircle
        v-animate:500.2000="'ml-100px'"
      >
        <div
          class="mt-0px transition-all duration-50 bg-black"
          smallerCircle
          v-animate:200.500="'mt-100px'"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup>
const vAnimate = {
  mounted: (el, bindings) => {
    const value =
      bindings.value !== undefined ? bindings.value : "do-nothing-class";
    const stringValue = String(value);

    let key = Object.keys(bindings.modifiers)[0];
    // console.log(typeof key);
    let delay = typeof key === "string" ? key : 500;
    let intervalTime = bindings.arg;
    el.classList.add("transition-all", "transition-delay-" + delay);
    setInterval(() => {
      el.classList.toggle(stringValue);
    }, intervalTime);
  },
};
</script>
