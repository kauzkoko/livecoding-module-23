<template>
  <div v-for="habitat in relevant" class="flex">
    <pre>
        <span>habitat name</span>
        {{ habitat.Habitat_name }}
    </pre>
    <!-- <pre>
        <span>current above ground: </span>
    {{ format(habitat.Above_ground_current_storage) }}
    </pre>
    <pre>
        <span>potential above ground minus humans: </span>
        {{ format(parseFloat(habitat.Above_ground_potential_storage_minus_areas_occupied_by_humans)) }}
    </pre>
    <pre>
        <span>difference above ground: </span>
        {{ format(parseFloat(habitat.Above_ground_potential_storage_minus_areas_occupied_by_humans) - parseFloat(habitat.Above_ground_current_storage)) }}
    </pre>
    <pre>
        <span>current below ground:</span> 
        {{ format(habitat.Below_ground_current_storage) }}</pre>
    <pre>
        <span>potential below ground: </span>
        {{ format(habitat.Below_ground_potential_storage) }}
    </pre>
    <pre>
        <span>difference below ground: </span> 
        {{ format(parseFloat(habitat.Below_ground_potential_storage) - parseFloat(habitat.Below_ground_current_storage))}}
    </pre> -->
    <!-- <pre>
      <span>total current: </span>
      {{ format(parseFloat(habitat.Below_ground_current_storage) + parseFloat(habitat.Above_ground_current_storage)) }}
    </pre>
    <pre>
      <span>total difference: </span>
      {{ format(parseFloat(habitat.Below_ground_potential_storage) - parseFloat(habitat.Below_ground_current_storage) + parseFloat(habitat.Above_ground_potential_storage_minus_areas_occupied_by_humans) - parseFloat(habitat.Above_ground_current_storage)) }}
    </pre> -->
  </div>
</template>

<script setup>
import data from "~/assets/habitats.json";
console.log(data);
const format = (value) => {
  return (value / 1000000000).toFixed(2) + " Gt";
};
const convertToGt = (value) => {
  return parseFloat(value) / 1000000000;
};
let relevantData = [];
data.forEach((habitat, index) => {
  relevantData.push({
    Habitat_name: habitat.Habitat_name,
    Above_ground_current_storage: habitat.Above_ground_current_storage,
    Above_ground_potential_storage_minus_areas_occupied_by_humans:
      habitat.Above_ground_potential_storage_minus_areas_occupied_by_humans,
    Below_ground_current_storage: habitat.Below_ground_current_storage,
    Below_ground_potential_storage: habitat.Below_ground_potential_storage,
    Total_current_storage:
      parseFloat(habitat.Below_ground_current_storage) +
      parseFloat(habitat.Above_ground_current_storage),
    Total_potential_storage:
      parseFloat(habitat.Below_ground_potential_storage) +
      parseFloat(
        habitat.Above_ground_potential_storage_minus_areas_occupied_by_humans
      ),
    Total_difference:
      parseFloat(habitat.Below_ground_potential_storage) -
      parseFloat(habitat.Below_ground_current_storage) +
      parseFloat(
        habitat.Above_ground_potential_storage_minus_areas_occupied_by_humans
      ) -
      parseFloat(habitat.Above_ground_current_storage),
    Total_current_storage_Gt:
      convertToGt(habitat.Below_ground_current_storage) +
      convertToGt(habitat.Above_ground_current_storage),
    Total_potential_storage_Gt:
      convertToGt(habitat.Below_ground_potential_storage) +
      convertToGt(
        habitat.Above_ground_potential_storage_minus_areas_occupied_by_humans
      ),
    Total_difference_Gt:
      convertToGt(habitat.Below_ground_potential_storage) -
      convertToGt(habitat.Below_ground_current_storage) +
      convertToGt(
        habitat.Above_ground_potential_storage_minus_areas_occupied_by_humans
      ) -
      convertToGt(habitat.Above_ground_current_storage),
    Total_current_storage_Gt_rounded: parseFloat(
      (
        convertToGt(habitat.Below_ground_current_storage) +
        convertToGt(habitat.Above_ground_current_storage)
      ).toFixed(2)
    ),
  });
});
console.log(relevantData);
const relevant = ref(relevantData);
</script>

<style>
html,
body {
  overflow: auto;
}

pre {
  width: 200px;
}

span {
  font-weight: bold;
}
</style>
