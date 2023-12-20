<template>
  <div>
    <slot />
    <div flex fixed left-10px bottom-10px w-200px justify-around>
      <NuxtLink class="w-20px h-20px bg-yellow rounded-full" to="/"></NuxtLink>
      <NuxtLink
        class="w-20px h-20px bg-red rounded-full"
        to="/performance/1"
      ></NuxtLink>
      <NuxtLink
        class="w-20px h-20px bg-blue rounded-full"
        to="/performance/2"
      ></NuxtLink>
      <NuxtLink
        class="w-20px h-20px bg-orange rounded-full"
        to="/performance/3"
      ></NuxtLink>
    </div>
  </div>
</template>

<script setup>
import "@unocss/reset/eric-meyer.css";
</script>
