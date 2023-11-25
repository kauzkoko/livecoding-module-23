<template>
  <div>
    <div v-for="route in routes">
      <NuxtLink
        class="text-20px"
        :to="route.path"
        v-if="route.name !== 'index'"
        >{{ route.name }}</NuxtLink
      >
    </div>
  </div>
</template>

<script setup>
const routes = useRouter().getRoutes();
</script>
