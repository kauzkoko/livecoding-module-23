<template>
  <div class="flex">
    <div>
      <table>
        <tr>
          <td>Habitat_name</td>
          <td bg-red>Total_current_storage_Gt</td>
          <td bg-orange>Total_potential_storage_Gt</td>
          <td bg-yellow>Total_difference_Gt</td>
        </tr>
        <tr v-for="habitat in relevant" border-solid border-y border-black>
          <td>{{ habitat.Habitat_name }}</td>
          <td bg-red>{{ habitat.Total_current_storage_Gt.toFixed(2) }}</td>
          <td bg-orange>{{ habitat.Total_potential_storage_Gt.toFixed(2) }}</td>
          <td bg-yellow>{{ habitat.Total_difference_Gt.toFixed(2) }}</td>
        </tr>
      </table>
      <div>
        <div class="flexCenter">
          <div
            v-for="(habitat, index) in relevant"
            v-show="index < relevant.length - 3"
            class="aspect-1 rounded-full bg-black"
            :style="{
              width: `${base * Math.sqrt(habitat.Total_current_storage_Gt)}px`,
            }"
          ></div>
        </div>
        <div class="flexCenter">
          <div
            v-for="(habitat, index) in relevant"
            v-show="index < relevant.length - 3"
            class="aspect-1 rounded-full bg-black"
            :style="{
              width: `${base * Math.sqrt(habitat.Total_difference_Gt)}px`,
            }"
          ></div>
        </div>
        <div class="flexCenter">
          <div
            class="aspect-1 rounded-full bg-blue"
            :style="{
              width: `${base * Math.sqrt(1.55)}px`,
            }"
          ></div>
        </div>
        <div style="display: flex; flex-direction: column">
          <div v-for="(habitat, index) in relevant" class="flex">
            <div
              v-if="index < relevant.length - 3"
              v-for="n in Math.floor(habitat.Total_difference_Gt / min)"
              class="aspect-1 rounded-full bg-blue"
              :style="{
                width: `${base * Math.sqrt(1.55)}px`,
              }"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import data from "~/assets/habitats.json";
let base = 6;
let min = 1.55;
let max = 229.19;
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
