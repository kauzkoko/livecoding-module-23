<template>
  <div class="wrapper grid grid-cols-4 dashy">
    <div v-for="n in 32" class="smallCircle bg-white">
      <div class="smallerCircle bg-black">
        <div class="smallerCircle bg-blue ml-$mlleft"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
const mlleft = useCssVar("--mlleft");
mlleft.value = "10px";
</script>
