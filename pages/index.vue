<template>
  <div>
    <div v-for="route in routes">
      <a class="text-20px" :href="route.path" v-if="route.name !== 'index'">{{
        route.name.split("-")[0] + "/" + route.name.split("-")[1]
      }}</a>
    </div>
  </div>
</template>

<script setup>
const routes = useRouter().getRoutes();
</script>
