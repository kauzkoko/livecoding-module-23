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
              v-for="n in Math.floor(habitat.Total_difference_Gt / minValue)"
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
let base = 6;
const { relevantData, maxValue, minValue } = useRelevantData();
const relevant = ref(relevantData);
console.log(minValue);
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
