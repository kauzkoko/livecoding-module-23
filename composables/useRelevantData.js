import data from "~/assets/habitats.json";

export default function () {
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

  let maxValue = relevantData[0].Total_difference_Gt;
  let minValue = maxValue;

  for (let i = 1; i < relevantData.length; i++) {
    let diff = relevantData[i].Total_difference_Gt;
    if (diff > maxValue) {
      maxValue = diff; // Update maxValue if a larger element is found
    }
    if (diff < minValue) {
      minValue = diff; // Update minValue if a smaller element is found
    }
  }
  return { relevantData, maxValue, minValue };
}

const convertToGt = (value) => {
  return parseFloat(value) / 1000000000;
};
