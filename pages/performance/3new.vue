<template>
  <div>{{ test }}</div>
</template>

<script setup>
const test = ref(10)
const { data } = useWebSocket("ws://localhost:8081");
const parsed = computed(() => {
  if (data.value) {
    let parsed = JSON.parse(data.value);
    console.log(parsed);
    if (parsed.from === "strudel") return parsed;
    if (parsed.from === "qr") return parsed;
  }
  return "";
});

watch(parsed, (p) => {
  console.log(p)
});
</script>
