<template>
  <div w-screen h-screen flex>
    <MetaMouse
      v-for="n in 9"
      :width="width / 9"
      :height="height"
      :id="'p5' + n"
    />
  </div>
  <div fixed left-10 top-10 bg-blue w-100px h-100px z--1></div>
</template>

<script setup>
const { width, height } = useWindowSize();
</script>
