<template>
  <div class="wrapper" @click="tzozo()">
    <TresCanvas v-bind="gl">
      <TresPerspectiveCamera :args="[45, 1, 0.1, 1000]" />
      <OrbitControls />
      <Box ref="boxRef" :args="[1, 1, 1]" :position="[0, 0, 0]">
        <TresMeshToonMaterial color="orange" />
      </Box>
      <Line2
        :points="[test, [0.5, 0, 0], [0, 0.866, 0], [-0.5, 0, 0]]"
        :line-width="10"
        color="#82dbc5"
      />
    </TresCanvas>
  </div>
</template>

<script setup>
import { BasicShadowMap, NoToneMapping, SRGBColorSpace } from "three";
import { useEnvironment, Line2 } from "@tresjs/cientos";
const test = ref([-0.5, 0, 0]);

const tzozo = () => {
  console.log(test.value);
  test.value = [Math.floor(Math.random() * 10), 0, 0];
};

const gl = reactive({
  clearColor: "#18181B",
  shadows: true,
  alpha: false,
  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
});
</script>
