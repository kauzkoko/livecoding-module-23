<template>
  <div wrapper grid grid-cols-4>
    <div v-for="n in 32" class="bg-red w-100px aspect-1">
      <div v-for="n in 2" v-animate:[time].100="[1, 2, 3]">laskd;fasdf</div>
    </div>
  </div>
</template>

<script setup>
const a = (...args) => [...args];
const time = ref(1000);
const vAnimate = {
  mounted: (el, bindings) => {
    const value =
      bindings.value !== undefined ? bindings.value : "do-nothing-class";
    const stringValue = String(value);
    console.log(bindings.arg);
    let key = Object.keys(bindings.modifiers)[0];
    // console.log(typeof key);
    // console.log(key);
    let delay = typeof key === "string" ? key : 500;
    let intervalTime = bindings.arg;
    el.classList.add("transition-all", "transition-delay-" + delay);
    setInterval(() => {
      el.classList.toggle(stringValue);
    }, intervalTime);
  },
};
</script>
