<template>
  <button @click="fetch()">fetch gpt</button>
  <input type="text" v-model="prompt" />
  <div>result: {{ result }}</div>
</template>

<script setup>
const result = ref("nothing yet");
const prompt = ref("Hello my dear friend.");
const fetch = async () => {
  const { data } = await useFetch("/api/completion", {
    method: "POST",
    body: {
      // messages: [
      //   { role: "system", content: "You are a helpful assistant." },
      //   { role: "user", content: prompt.value },
      // ],
      // model: "gpt-4-1106-preview",
    },
  });
  result.value = data;
};
</script>
