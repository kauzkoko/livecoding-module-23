<template>
  <ClientOnly>
    <!-- <Script src="https://unpkg.com/@strudel/repl@0.9.4"></Script> -->
    <Script src="/strudelrepltest.js"></Script>
    <!-- <strudel-editor></strudel-editor> -->
    <strudel-editor class="bg-yellow!">
      <!-- 
          pure(1)
    .withValue(() => reify(getter()))
    .innerJoin();

window.test = "sd"
let test = ref(() => window.test)
console.log(test)

stack(
  s(test).ply(16).gain(1).cpm(120)
  )
       -->
    </strudel-editor>
  </ClientOnly>
</template>

<script setup>
const { data, post } = useBroadcastChannel({ name: "strudelpong" });
window.stuff = ref(10);
watch(data, () => {
  console.log(data.value);
  window.test = data.value;
});
</script>
