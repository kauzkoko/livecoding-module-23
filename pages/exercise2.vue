<template>
  <div>
    <div v-for="elem in data">
      <h1>Habitat name{{ elem.Habitat_name }}</h1>
      <div>Above ground storage {{ elem.Above_ground_potential_storage }}</div>
    </div>
  </div>
</template>

<script setup>
import data from "~/assets/data.json";
</script>
